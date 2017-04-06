'use strict';

const profiles = [
		{	username : 'zy13', email : 'zy13@rice.edu', zipcode: 77001,
			avatar: 'https://scontent.cdninstagram.com/t51.2885-15/s640x640/sh0.08/e35/11899528_414318955431375_1890496310_n.jpg',
			dob: "11/15/1996", headline: "I am Emily"
		},
		{	username : 'emh6', email : 'emh6@rice.edu', zipcode: 77002,
			avatar: 'https://s-media-cache-ak0.pinimg.com/736x/41/e6/27/41e6272ad60e32a1a3760c796aa56aa8.jpg',
			dob: "02/27/1996", headline: "I am Eric"
		},
		{	username: 'default', email : 'default@rice.edu', zipcode: 77003,
			avatar: 'http://pm1.narvii.com/5700/3bad24da421a62044be22b7f3d8a53726aebc390_hq.jpg',
			dob: Date.parse('01/01/1996'), headline: "I am Deault"
		}
]

const getHeadlines = (req, res) => {
	if (!req.user) req.user = "default"
	//get the list of user(s) that need to return headlins of
	const users = req.params.users ? req.params.users.split(',') : [req.user]
	const headlines = users.map(user => {
		let userInfo = profiles.filter((uSer)=>{return uSer.username == user})
		return {username: user, headline: userInfo[0].headline}
	})
	res.status(200).send({headlines: headlines})
}

const putHeadline = (req, res) => {
	const user = 'default'
	const headline = req.body.headline
	if (!headline) {
		res.status(400).send('you did not supply headline')
	}
	else{
		profiles.filter((uSer)=>{ 
			//change the headline of the requested user
			if (uSer.username == user){uSer.headline = headline}
		})
		res.status(200).send({username: user, headline: headline})
	}
}

const getEmail = (req, res) => {
	if (!req.user) req.user = "default"
	const user = req.params.user ? req.params.user : req.user
	let userInfo = profiles.filter((uSer)=>{return uSer.username == user})
	res.status(200).send({username: user, email: userInfo[0].email})
}

const putEmail = (req,res) => {
	const user = 'default'
	const email = req.body.email
	if (!email) {
		res.status(400).send('you did not supply email')
	}
	else{
		profiles.filter((uSer)=>{
			if (uSer.username == user){uSer.email = email}
		})
		res.status(200).send({username: user, email: email})
	}
}

const getDob = (req, res) => {
	if (!req.user) req.user = "default"
	const user = req.params.user ? req.params.user : req.user
	let userInfo = profiles.filter((uSer)=>{return uSer.username == user})
	res.status(200).send({username: user, dob: userInfo[0].dob})
}

const getZipcode = (req, res) => {
	if (!req.user) req.user = "default"
	const user = req.params.user ? req.params.user : req.user
	let userInfo = profiles.filter((uSer)=>{return uSer.username == user})
	res.status(200).send({username: user, zipcode: userInfo[0].zipcode})
}

const putZipcode = (req,res) => {
	const user = 'default'
	const zipcode = req.body.zipcode
	if (!zipcode) {
		res.status(400).send('you did not supply zipcode')
	}
	else{
		profiles.filter((uSer)=>{
			if (uSer.username == user){uSer.zipcode = zipcode}
		})
		res.status(200).send({username: user, zipcode: zipcode})
	}
}

const getAvatars = (req, res) => {
	if (!req.user) req.user = "default"
	const users = req.params.users ? req.params.users.split(',') : [req.user]
	const avatars = users.map(user => {
		let userInfo = profiles.filter((uSer)=>{return uSer.username == user})
		return {username: user, avatar: userInfo[0].avatar}
	})
	res.status(200).send({avatars: avatars})
}

const putAvatar = (req,res) => {
	const user = 'default'
	const avatar = req.body.avatar
	if (!avatar) {
		res.status(400).send('you did not supply avatar')
	}
	else{
		profiles.filter((uSer)=>{
			if (uSer.username == user){uSer.avatar = avatar}
		})
		res.status(200).send({username: user, avatar: avatar})
	}
}

// /headline has get and put the same time?? API doesn't have but assginment has
module.exports = app => {
     app.get('/headlines/:users?', getHeadlines)
     app.put('/headline', putHeadline)
	 app.get('/email/:user?', getEmail)
     app.put('/email', putEmail)
	 app.get('/dob', getDob)
     app.get('/zipcode/:user?', getZipcode)
     app.put('/zipcode', putZipcode)
	 app.get('/avatars/:users?', getAvatars)
     app.put('/avatar', putAvatar)

}