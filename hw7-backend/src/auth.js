'use strict';

const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const md5 = require('md5')
const models = require('./model.js')
const request = require('request')
const session = require('express-session')

const cookieKey='sid'
const sessionUser = {}
const secret_message = "This is my secret_message"


const isLoggedIn = (req,res,next) => {
	//get the sission id of current user from  xcookie
	const sid = req.cookies[cookieKey]
	if(!sid || !sessionUser[sid]){
		res.sendStatus(400)
		return 
	}

	const username = sessionUser[sid].username

	if(username){
		//set req.username as current user's username
		req.username = username
		next()
	}else{
		res.sendStatus(400)
	}


}


const register = (req, res) => {
	const username = req.body.username
	const email = req.body.email
	const dob = req.body.dob
	const zipcode = req.body.zipcode
	const password = req.body.password
	console.log(req.body)
	if (!username || !email || !dob || !zipcode || !password) {
		res.status(400).send("all fields should supply")
		return
	}
	//try to look for the username to be registered in the current database to see whether the username has already been used
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
				sessionUser[session_id] = user
				res.cookie(cookieKey, session_id, {maxAge:3600*1000, httpOnly:true})
				res.send({username:username,result: 'success'})
			}
		}
	})
}


const logout = (req, res)=>{
	delete sessionUser[req.cookies[cookieKey]]
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


module.exports = app => {
	app.use(bodyParser.json())
	app.use(cookieParser())
    app.post('/login', login)
    app.post('/register', register)
    app.use(isLoggedIn)
    app.put('/password', putPassword)
    app.put('/logout', logout)

}