const md5 = require('md5')

const cookieKey='sid'
const userObj={}
const sessionUser={}

const registerAct=(req,res)=>{
	var username = req.body.username
	var password = req.body.password
	if(!username || !password){
		res.sendStatus(400)
		return
	}
	const salt=new Date()+username
	const salt_password = md5(salt+password)
	userObj[username]={salt: salt, password: salt_password}
	var msg = {username:username,result:'success'}
	res.send(msg)
}



const loginAct = (req,res)=>{
	var username = req.body.username
	var password = req.body.password
	if(!username || !password){
		res.sendStatus(400)
		return
	}
	var user = userObj[username]

	if(!user){
		res.sendStatus(401)
		return
	}
	const req_password=md5(user.salt+password)
	if(req_password !== user.password){
		res.sendStatus(401)
		return
	}
	const session_id = md5(username)
	res.cookie(cookieKey, session_id, {maxAge:3600*1000, httpOnly:true})
	var msg = {username:username,result:'login_success'}
	res.send(msg)
}


module.exports = app =>{
	app.post('/register',registerAct)
	app.post('/login',loginAct)
}
