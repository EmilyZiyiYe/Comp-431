'use strict';

const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const md5 = require('md5')
const models = require('./model.js')
const request = require('request')
const session = require('express-session')
const passport = require('passport')
const FacebookStrategy = require('passport-facebook').Strategy
if (!process.env.REDIS_URL) {
    process.env.REDIS_URL = 'redis://h:p1de5eb5df56f5a9852ed265f66e8faa75491c26889c68ab22693e1558d44fbad@ec2-34-206-214-110.compute-1.amazonaws.com:10089'
}
const redis = require('redis').createClient(process.env.REDIS_URL)
const cookieKey='sid'
const secret_message = "This is my secret_message"

const config = {
	clientID:'1956672607888250', 
	clientSecret:'077dca16a274f7905a9d76faad85f66f', 
	callbackURL:  'https://quiet-eyrie-63276.herokuapp.com/auth/facebook/callback',
	passReqToCallback: true
}

const users = {}

const isLoggedIn = (req,res,next) => {
	if (req.isAuthenticated()) {
		const authInfo = {}
		authInfo[req.user.username.split('@')[1]] = req.user.username.split('@')[0]
		models.User.find({auth: authInfo }).exec(function(err, users) {
			//if the thrid party user is not linked to any regular account then we just use the username our app created for him
			if(!users || users.length === 0){
				req.username = req.user.username
			} 
			//if the thrid party user is linked to an regular account 
			//then we direct the account to the regular account it links to by using that regular account username
			else {
				req.username = users[0].username
			}
			next()
		})
	}
	else{
		//get the sission id of current user from  xcookie
		const sid = req.cookies[cookieKey]
		if(!sid){
			res.sendStatus(400)
			return 
		}
		redis.hgetall(sid, function (err, userObj) {
	        if (!userObj) {
	            res.status(400).send("Can not find the user")
	        } 
	        else{
	            req.username = userObj.username
				next()
	        }
	    })
	}
}


const register = (req, res) => {
	const username = req.body.username
	const email = req.body.email
	const dob = req.body.dob
	const zipcode = req.body.zipcode
	const password = req.body.password

	if (!username || !email || !dob || !zipcode || !password) {
		res.status(400).send("all fields should supply")
		return
	}
	//try to look for the username to be registered in the current database to see whet-her the username has already been used
	models.User.find({username: username}).exec(function(err, users) {
		if (err){
			res.status(400).send('there is an error')
			return
		}
		else{
			if(users.length !== 0) {
			res.status(400).send("username already exits")
			return
			} 
			else {
				//create unique salt by adding current time to username
				const salt=new Date().getTime()+username
				//this is the password after adding salt
				const salt_password = md5(salt+password)
				//store the registered user to User in the model
				var new_user = new models.User({username:username, salt:salt, password: salt_password})
				new models.User(new_user).save(function (err, user){if(err){return}})
				//store the registered user's info to Profile in the model
				var new_profile = new models.Profile({username:username, email:email, dob:dob, zipcode:zipcode,
				avatar:'http://images.iimg.in/c/569f4771c45d324bda8b4660-4-501-0-1453279096/google/user-icon-png-pnglogocom.img?crop=1', headline: "set up your status", following:[]})
				new models.Profile(new_profile).save(function (err, user){
				if(err){return}})

				res.send({result: 'success', username: username})
			}
		}
	})
}	


const login = (req, res) => {
	var username = req.body.username
	var password = req.body.password
	if (!username || !password) {
		res.status(400).send("username or password is missing")
		return
	}
	//try to find the username to be logged in in the current database
	models.User.find({ username: username}).exec(function(err, users) {
		if (!err){
			if(!users||users.length === 0) {
				res.status(400).send("Invalid User")
				return
			} 
			else {
				const user = users[0]
				//combine the supplied password with the corresponding salt to later check whether the supploed password is corrent 
				const req_password= md5(user.salt + password)
				if(req_password !== user.password){
					res.status(401).send("username or password is invalid")
					return
				}
				// create a session id
				const session_id = md5(secret_message + new Date().getTime() + user.username)
				redis.hmset(session_id, user)
				res.cookie(cookieKey, session_id, {maxAge:3600*1000, httpOnly:true})
				res.send({username:username,result: 'success'})
			}
		}
	})
}

const linkAccount = (req, res) => {
	const username = req.body.linkUsername
	const password = req.body.linkPassword
	if (!username || !password) {
		res.status(400).send("You should supply username and password")
		return
	}
	models.User.find({username: username}).exec(function(err, users){
        if (!users || users.length === 0 || !users[0]){
            res.status(400).send("Can not find the user")
            return
        }

		const user = users[0]
		//combine the supplied password with the corresponding salt to later check whether the supploed password is corrent 
		const req_password= md5(user.salt + password)
		if(req_password === user.password){
			//combine the follower lists of the two accounts that are about to link
			models.Profile.findOne({username: username}).exec(function(err, profile1){
				if(profile1){
					models.Profile.findOne({username: req.username}).exec(function(err, profile2) {
						if(profile2){
							const combined_following = profile1.following.concat(profile2.following)
							models.Profile.update({username: username}, {$set: {'following': combined_following}}, function(){})
						}
					})
					models.Profile.update({username: req.username}, {$set: {'following':[]}}, function(){})
				}
			})

			//merge the thrid party user's articles and comment to the linked regular user by changing the username
			models.Post.update({author:req.username}, { $set: {'author': username}}, {new: true}, function(){})
			models.Post.update({'comments.author' : req.username}, { $set: {'comments.$.author': username}}, {new: true}, function(){})
			models.Comment.update({author:req.username}, { $set: {'author': username}}, {new: true}, function(){})
			//add the third party user an Oanth account to the linked user's authorization info for record
			models.User.find({username: username}).exec(function(err, users){
				if(users[0]){
					const authInfo = {}
					authInfo[req.username.split('@')[1]] = req.username.split('@')[0]
					models.User.update({username: username}, {$addToSet: {'auth': authInfo}}, {new: true}, function(){})
				}
			})			
			res.status(200).send({ username: username, result: 'success'})
		} 
		else{res.status(401).send("Invalid account")}
	})
}

const unlink = (req, res) => {
	const username = req.username
	//remove the third party user's Oauth account in its previously linked user's authorization info
	models.User.findOne({username: username}).exec(function(err, user){
		if(user.auth.length !== 0){
			const authInfo = user.auth.filter(function (info) {return Object.keys(info)[0] !== "facebook"})
			models.User.update({username: username}, {$set: {'auth': authInfo}}, {new: true}, function(){})
			res.status(200).send({username: username, result: 'You have successfully unlinked your account'})
		} 
		else {
			res.status(400).send("Can not find your account")
		}
	})
}


const logout = (req, res)=>{
	if(req.isAuthenticated()){
        req.logout()
        res.status(200).send("OK")
        return
    }
	const sid = req.cookies[cookieKey]
	redis.del(sid)
    res.clearCookie(cookieKey, {maxAge: 0, httpOnly: true})
    res.status(200).send("OK")
}

const putPassword = (req, res) => {
	const password = req.body.password
	const username = req.username
	if (!password) {
		res.status(400).send("you should supply password")
		return
	}
	models.User.find({ username: username}).exec(function(err, users) {
		if (err){
			res.status(400).send('there is an error')
			return
		}
		else{
			//create new salt for the new password
			const new_salt = new Date().getTime()+username
			const new_salt_password = md5(new_salt+password)
			models.User.update({username: username}, {$set: { salt: new_salt, password : new_salt_password }}, { new: true }, 
								function(err, user){ res.status(200).send("Update the password successfully")
			})
		}
	})
}

passport.serializeUser(function(user, done){
    done(null, user.id)
})

passport.deserializeUser(function(id, done){
    models.User.findOne({authId: id}).exec(function(err, user) {
		done(null, user)
	})
})

let webappurl = ""

const toLogin = (req,res) => {
	//redirect to frontend page
	res.redirect(webappurl)
}

const fail = (err,req,res,next) => {
    if(err) {
        res.status(400)
        res.send({err: err.message})
    }
}

const toWebapp = (req, res, next) => {
	//get the frontend website's address so that we can redirect from the third party login page to frontend page
	if(webappurl === ""){
		webappurl = req.headers.referer
	}
	next()
}

passport.use(new FacebookStrategy(config,
    function(req, token, refreshToken, profile, done){
        process.nextTick(function(){
            const username = profile.displayName +'@facebook'
            models.User.findOne({username:username}).exec(function(err,user){
                if (err){
					return console.log(err)
				}
				if (!user || user.length === 0){
					//store the registered user to User in the model
					var new_user = new models.User({username:username, salt:null, password: null, authId: profile.id})
					new models.User(new_user).save(function (err, user){if(err){return}})
					//store the registered user's info to Profile in the model
					var new_profile = new models.Profile({username: username, email:null, dob:"01-01-1996", zipcode:"77005",
					avatar:'http://images.iimg.in/c/569f4771c45d324bda8b4660-4-501-0-1453279096/google/user-icon-png-pnglogocom.img?crop=1', headline: "set up your status", following:[]})
					new models.Profile(new_profile).save(function (err, user){
					if(err){return}})
                }
            	return done(null, profile)
        	})
    	})
    })
)

module.exports = app => {
	app.use(bodyParser.json())
	app.use(cookieParser())
	app.use(toWebapp)
	app.use(session({secret:"This is my secret_message", resave: false, saveUninitialized: false}))
	app.use(passport.initialize())
	app.use(passport.session())
	app.use('/login/facebook', passport.authenticate('facebook', {scope:'email'}))
	app.use('/auth/facebook/callback', passport.authenticate('facebook', {failureRedirect:'/login/facebook'}), toLogin, fail)
    app.post('/login', login)
    app.post('/register', register)
    app.use(isLoggedIn)
	app.use('/link/facebook', passport.authorize('facebook', {scope:'email'}))
	app.post('/link', linkAccount)
	app.post('/unlink', unlink)
    app.put('/password', putPassword)
    app.put('/logout', logout)

}