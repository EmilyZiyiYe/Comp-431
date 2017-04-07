'use strict';

const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const md5 = require('md5')

const request = require('request')
const session = require('express-session')
const passport = require('passport')
const FacebookStrategy = require('passport-facebook').Strategy

// const app = express()

// app.use(session({ secret: 'secretMessage!!' }))
// app.use(passport.initialize())
// app.use(passport.session())
// app.use(cookieParser())

const cookieKey='sid'
const userObj={}
const sessionUser={}

const config={   
        'clientID'      : '1072910489519662', 
        'clientSecret'  : '2b5bec4cfeb2007acbad537ab946b794', 
        'callbackURL'   : 'http://localhost:3000/auth/facebook/callback'
}

passport.serializeUser(function (user, done) {
  sessionUser[user.id] = user
  done(null, user.id)
})

passport.deserializeUser(function (id, done) {
  var user = sessionUser[id]
  done(null, user)
})

passport.use(new FacebookStrategy(config,
	function(token,refreshToken,profile,done){
		process.nextTick(function(){
		const new_user={username:profile.name, id:profile.id}
		sessionUser[new_user.id]=new_user
		return done(null,profile)
		})
	}))



const logout=(req,res)=>{
	
	req.logout();
	res.redirect('/')
}

const isLoggedIn=(req,res,next)=>{
	if(req.isAuthenticated()){
		next()
	}else{
		res.redirect('/login')
	}
}
function profile(req,res){
	res.send('ok now what?',req.user)
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
	if (userObj[username]){
		res.status(400).send("username already exits")
		return
	}
	else{
		//create unique salt by adding current time to username
		const salt=new Date()+username
		//this is the password after adding salt
		const salt_password = md5(salt+password)
		//store the registered user so that it can log in
		userObj[username]={salt: salt, password: salt_password, email: email,
							dob:dob, zipcode:zipcode}
		res.send({result: 'success', username: username})
	}
}

const login = (req, res) => {
	var username = req.body.username;
	var password = req.body.password;
	if (!username || !password) {
		res.status(400).send("username or password is missing")
		return
	}
	var user = userObj[username]

	if(!user){
		res.sendStatus(401)
		return
	}
	const req_password= md5(user.salt + password)
	if(req_password !== user.password){
		res.sendStatus(401).send("username or password is invalid")
		return
	}
	//use username to create session_id
	const session_id = md5(username)
	sessionUser[cookieKey]={username: username}
	res.cookie(cookieKey, session_id, {maxAge:3600*1000, httpOnly:true})
	res.send({username:username,result: 'success'})
}

const logout_2 = (req, res)=>{
	delete sessionUser[req.cookies[cookieKey]]
    res.clearCookie(cookieKey, {maxAge: 0, httpOnly: true})
    res.status(200).send("OK")
}


const putPassword = (req, res) => {
	if (!req.body.password) {
		res.status(400).send("you should supply password")
	}
	else{
		res.status(200).send({username: 'default', status: 'will not change'})
	}
}

const fail=(req,res)=>{
	res.send({status:'can not log in'})
}

module.exports = app => {
	app.use(bodyParser.json())
	app.use(cookieParser())
    app.post('/login', login)
    app.put('/logout', logout_2)
    app.post('/register', register)
    app.put('/password', putPassword)
    app.use('/auth/facebook',passport.authenticate('facebook',{scope:'email'}))
	app.use('/auth/facebook/callback',passport.authenticate('facebook', {successRedirect:'/profile',failureRedirect:'/fail'}))
	app.use('/profile',isLoggedIn,profile)
	app.use('/fail', fail)
	app.use('/logout',logout)

}