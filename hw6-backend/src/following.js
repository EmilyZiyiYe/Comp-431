'use strict';

let following_data = [
        {username:"default", following:["zy13", "emh6"]},
        {username:"zy13", following:["default", "emh6"]},
        {username:"emh6", following:["default", "zy13"]}
]

const getFollowing = (req, res) => {
	if (!req.user) req.user = "default"
	const username = req.params.user ? req.params.user : req.user
	const data = following_data.filter((uSer)=>{return uSer.username == username})

	res.status(200).send(data[0])
}

const putFollowing = (req, res) => {
	const username = req.params.user
	if(!username){
		res.status(400).send({result: "follower is missing"});
	}
	else{
		let data = following.filter((uSer) => {
				if((uSer.username == 'default') && (uSer.following.indexOf(username) === -1)) {
					uSer.following.push(username)
					return uSer.username == 'default'
				}
		})
		res.status(200).send(data[0])
	}
}

const deleteFollowing = (req, res) => {
	const username = req.params.user
	if(!username){
		res.status(400).send({result: "username is missing"});
	}
	else{
		let data = following.filter((uSer)=>{
				if((uSer.username == 'default') && (uSer.following.indexOf(username)!== -1)) {
					uSer.following.splice(uSer.following.indexOf(username), 1)
					return uSer.username == 'default'
				}
		})
		res.status(200).send(data[0])
	}
}

module.exports = app => {
    app.get('/following/:user?', getFollowing)
    app.put('/following/:user', putFollowing)
    app.delete('/following/:user', deleteFollowing)
}