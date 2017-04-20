'use strict';
const models = require('./model.js')

const getHeadlines = (req, res) => {
	const users = req.params.users ? req.params.users.split(',') : [req.username]
	//find the supplied users' info in the database
	models.Profile.find({ username:{ $in:users }}).exec(function(err,users){
		if (err){
			return console.log(err)
		}
		if (! users||users.length === 0){
			res.status(400).send("Can not find the user(s)")
            return
		}
		const headlines = users.map((user)=>{return {username: user.username, headline: user.headline}})
      	res.send({headlines: headlines})
    })
}


const putHeadline = (req, res) => {
	const username = req.username
	const headline = req.body.headline
	if (!headline) {
		res.status(400).send('you did not supply headline')
		return 
	}
	models.Profile.update({username:username},{$set:{headline:headline}},{new: true}, function(err){
		if (err) {
			return console.log(err)
		}
		else{
			res.status(200).send({username:username, headline:headline })
		}
    })
}


const getEmail = (req, res) => {
	const username = req.params.user ? req.params.user : req.username
	models.Profile.find({username:username}).exec(function(err,users){
		if (err) {
			return console.log(err)
		}
		if (! users||users.length === 0){
			res.status(400).send("Can not find the user")
            return
		}
		else{
			res.status(200).send({username: username, email: users[0].email})
		}
	})
}

const putEmail = (req,res) => {
	const username = req.username
	const email = req.body.email
	if (!email) {
		res.status(400).send('you did not supply email')
	}
	models.Profile.update({username:username},{$set:{email:email}},{new: true}, function(err){
		if (err) {
			return console.log(err)
		}
		else{
			res.status(200).send({username:username, email:email})
		}
    })
}

const getDob = (req, res) => {
	const username = req.params.user ? req.params.user : req.username
	models.Profile.find({username:username}).exec(function(err,users){
		if (err) {
			return console.log(err)
		}
		if (! users||users.length === 0){
			res.status(400).send("Can not find the user")
            return
		}
		else{
			console.log(users[0])
			res.status(200).send({username: username, dob: users[0].dob})
		}
	})
}

const getZipcode = (req, res) => {
	const username = req.params.user ? req.params.user : req.username
	models.Profile.find({username:username}).exec(function(err,users){
		if (err) {
			return console.log(err)
		}
		if (! users||users.length === 0){
			res.status(400).send("Can not find the user")
            return
		}
		else{
			res.status(200).send({username: username, zipcode: users[0].zipcode})
		}
	})
}

const putZipcode = (req,res) => {
	const username = req.username
	const zipcode = req.body.zipcode
	if (!zipcode) {
		res.status(400).send('you did not supply zipcode')
	}
	models.Profile.update({username:username},{$set:{zipcode: zipcode}},{new: true}, function(err){
		if (err) {
			return console.log(err)
		}
		else{
			res.status(200).send({username:username, zipcode: zipcode})
		}
    })
}

const getAvatars = (req, res) => {
	const users = req.params.users ? req.params.users.split(',') : [req.username]
	//find the supplied users' info in the database
	models.Profile.find({ username:{ $in:users }}).exec(function(err,users){
		if (err){
			return console.log(err)
		}
		if (! users||users.length === 0){
			res.status(400).send("Can not find the user(s)")
            return
		}
		const avatars = users.map((user)=>{return {username: user.username, avatar: user.avatar}})
      	res.send({avatars: avatars})
    })
}


module.exports = app => {
     app.get('/headlines/:users?', getHeadlines)
     app.put('/headline', putHeadline)
	 app.get('/email/:user?', getEmail)
     app.put('/email', putEmail)
	 app.get('/dob', getDob)
     app.get('/zipcode/:user?', getZipcode)
     app.put('/zipcode', putZipcode)
	 app.get('/avatars/:users?', getAvatars)
}