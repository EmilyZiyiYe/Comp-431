
const index = (req, res) => {
     res.send({ hello: 'world' })
}

module.exports = app => {
     app.get('/', index)
     app.get('/headlines/:users?', getHeadlines)
     app.get('/email/:user?', getEmail)
     app.get('/zipcode/:user?', getZipcode)
     app.get('/avatars/:users?', getAvatars)
     app.put('/headline', addHeadline)
     app.put('/email', addEmail)
     app.put('/zipcode', addZipcode)
     app.put('/avatar', addAvatar)
}

const getHeadlines = (req, res) => {
	if (!req.user) {
        req.user = 'Emily'
    }
	headlines = {headlines : [
	{
		user: req.user, headline: "This is a headline"
	},
	{
		user: "Emily new", headline: "This is a headline"
	}
	]}
	res.send(headlines)

}


const addHeadline = (req, res) => { 
	headline = {headlines : [
	{
		user: "Emily new", headline: req.body.headline
	}
	]}
	res.send( headline)
}

const getEmail = (req, res) => {
	if (!req.user) {
        req.user = 'Emily'
    }
	email = {
		user: req.user, email: "zy13@rice.edu"
	}
	
	res.send(email)

}

const addEmail = (req, res) => {
	email = {
		user: "Emily new", email: req.body.email
	}
	res.send(email)
}

const getZipcode = (req, res) => {
	  if (!req.user) {
        req.user = 'Emily'
    }
    zipcode = {
		user: req.user, email: "77005"
	}
	
	res.send(zipcode)
}

const addZipcode = (req, res) => {
	zipcode = {
		user: "Emily new", zipcode: req.body.zipcode
	}
	res.send(zipcode)
}

const getAvatars = (req, res) => {
	avatars = {avatars : [
	{
		user: req.user, avatar: "http://www.endlessicons.com/wp-content/uploads/2012/12/male-avatar-icon-614x460.png"
	},
	{
		user: "Emily new", avatar: "http://www.endlessicons.com/wp-content/uploads/2012/12/male-avatar-icon-614x460.png"
	}
	]}
	res.send(avatars)
}

const addAvatar = (req, res) => { 
	avatar = {avatars : [
	{
		user: "Emily new", avatar: req.body.avatar
	}
	]}
	res.send(avatar)
}











