'use strict';
const models = require('./model.js')
const md5 = require('md5')
const ObjectId = require('mongoose').Types.ObjectId
const uploadImg = require('./uploadCloudinary.js')


const getArticle = (req, res) => {
    const username = req.username
    if (!username){
        res.status(400).send('Can not find the article')
        return
    }
    if(req.params.id) {
        //find the article with the supplied article id
        models.Post.find(ObjectId(req.params.id)).exec(function(err, articles){
            if (!err){
                if (articles || articles.length !== 0){
                    res.status(200).send({articles: articles})
                    return
                }
                else{
                    //find the article with the supplied author's name
                    models.Profile.find({username:username}).exec(function(err,users){
                        if(users || users.length !== 0){
                            models.Post.find({author: users[0].username}).exec(function(err, articles){
                            res.status(200).send({articles: articles})
                            return
                            })
                        }
                        else{
                            res.status(400).send('Can not find the article')
                            return 
                        }
                    })
                }
            }
            else{
                console.log(err)
            }
        })
    }
    else{
        //if there is no request id, then the default id is the loggedin user, so we just need to return default user and its followers' all articles
        models.Profile.find({username: username}).exec(function(err, profile){
            if (!err){
                const user_profile = profile[0]
                const usersToQuery = [username, ...user_profile.following]
                models.Post.find({author: {$in: usersToQuery}}).sort('-date').limit(10).exec(function(err, articles){
                    res.status(200).send({articles: articles})
                    return
                })
            }
            else{
                console.log(err)
            }
        })
    }
}

const editArticle = (req, res) => {
    if (!req.params.id) {
    	res.sendStatus(400).send('Can not find the article')
        return
    } 
    if(!req.body.text){
        res.status(400).send("you did not supply text")
        return
    }
    else {
        models.Post.find(ObjectId(req.params.id)).exec(function(err, articles){
            if(articles === undefined || articles.length === 0){
                res.status(400).send("Can not find the article")
                return
            }
            else{
                const article = articles[0]
                if(!req.body.commentId){
                    //if there is no supplied comment id, then find the corresponding article and edit it by changing the text to the supplied one
                    if (article.author != req.username){
                        res.status(400).send('You can not edit this article')
                        return 
                    }
                    else{
                        models.Post.update({_id: ObjectId(req.params.id)}, { $set: { text: req.body.text }}, { new: true }, function(err){
                            models.Post.find({_id: ObjectId(req.params.id)}).exec(function(err, articles){
                                const update_article = articles[0]
                                res.status(200).send({articles:[update_article]})
                            })
                        })
                    }
                }
                else{
                    //if the comment id is -1, then we add a new comment
                    if(req.body.commentId === -1){
                        const commentId = md5(req.username+req.body.text)
                        const new_comment = new models.Comment({commentId:commentId, author:req.username, text:req.body.text, date:new Date()})
                        new models.Comment(new_comment).save(function (err, comments){if(err) {return}})

                        const update_comments = article.comments
                        update_comments.push(new_comment)
                        models.Post.update({_id: ObjectId(req.params.id)},{$set: {comments: update_comments}}, { new: true }, function(err){
                            models.Post.find({_id: ObjectId(req.params.id)}).exec(function(err,articles){
                                var updatedArticle
                                updatedArticle = articles[0]
                                res.status(200).send({articles:[updatedArticle]})
                            })
                        })
                    }
                    else{
                        //if there is a supplied comment id, then find the corresponding comment through id and edit it by changing the text to the supplied one
                        const comment = article.comments.filter((comment) => {return comment.commentId == req.body.commentId})
                        if(!comment||comment.length === 0){
                            res.status(400).send('Can not find the comment')
                            return
                        }
                        if (comment[0].author !== req.username){
                            res.status(400).send('You can not edit this comment')
                            return 
                        }
                        const update_comments = article.comments
                        update_comments.map((comment) => {
                            if (comment.commentId === req.body.commentId){
                                comment.text = req.body.text
                            }
                            return comment
                        })
                        models.Post.update({_id: ObjectId(req.params.id)},{$set: {comments:update_comments}}, { new: true },function(err){
                                models.Post.find({_id: ObjectId(req.params.id)}).exec(function(err,articles){
                                var updatedArticle
                                updatedArticle = articles[0]
                                res.status(200).send({articles:[updatedArticle]})
                                })
                        })
                    }
                }
            }
        })
    }
}

const addArticle = (req, res) => {
	if(!req.body.text){
    	res.status(400).send("you did not supply article")
    }
    else{
        //add a new article and save it in the database
        const new_article = new models.Post({text:req.body.text, author:req.username, date: new Date(), img: req.fileurl, comments:[]}) 
        new_article.save(function(err){if(err) console.log(err)})
        res.status(200).send({articles: [new_article]})
    }
}


module.exports = (app) => {
    app.get('/articles/:id?', getArticle)
    app.put('/articles/:id', editArticle)
    app.post('/article', uploadImg("image"), addArticle)
}