'use strict';
const models = require('./model.js')
const md5 = require('md5')
const ObjectId = require('mongoose').Types.ObjectId

const getArticle = (req, res) => {
    const username = req.username
    if (!username){
        res.sendStatus(400).send('Can not find the article')
        return
    }
    if(req.params.id) {
        //get the articles whose id is the id that user requests
        models.Post.find(ObjectId(req.params.id)).exec(function(err, articles){
            if (!err){
                if(articles !== undefined){
                    res.status(200).send({articles:articles})
                }
                else{
                    res.status(400).send('invalid article id')
                }
            }
        })
    }
    else{
        //if there is no request id, then the default id is the loggedin user, so we just need to return default user's all articles
        models.Post.find({}).exec(function(err, articles){
            if (!err){
                res.status(200).send({articles: articles})
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
        const new_article = new models.Post({text:req.body.text, author:req.username, date: new Date(), img: '', comments:[]}) 
        new_article.save(function(err){if(err) console.log(err)})
        res.status(200).send({articles: [new_article]})
    }
}


module.exports = (app) => {
    app.get('/articles/:id?', getArticle)
    app.put('/articles/:id', editArticle)
    app.post('/article', addArticle)
}