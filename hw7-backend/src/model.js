// this is model.js 
var mongoose = require('mongoose')
require('./db.js')

var userSchema = new mongoose.Schema({
	username: String, salt: String, password: String
})

var profileSchema = new mongoose.Schema({
	username: String, headline: String, dob: String, email: String, zipcode: String, avatar: String, following: [ String ]
})

var commentSchema = new mongoose.Schema({
	commentId: String, author: String, text: String, date: Date
})

var postSchema = new mongoose.Schema({
	author: String, text: String, date: Date, img: String, 
    comments: [commentSchema]
})


exports.Post = mongoose.model('articles', postSchema)
exports.User = mongoose.model('users', userSchema)
exports.Profile = mongoose.model('profiles', profileSchema)
exports.Comment = mongoose.model('comments', commentSchema)
