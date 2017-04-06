'use strict';

// the hardcoded data has three articles whose largest id is 3, so the id for next user is 4
let nextId = 4
const articles = {articles:[
        {_id: 1,  author:"emily", text:"Emily text", date:new Date(), comments:[]}, 
        {_id: 2,  author:"eric", text:"Eric text", date:new Date(), comments:[]},
        {_id: 3,  author:"default", text:"Default text", date:new Date(), comments:[]}
]}


const getArticle = (req, res) => {
    if(req.params.id) {
        //get the articles whose id is the id that user requests
        let articleData = articles.articles.filter((article)=>{return article._id == req.params.id })
    	res.status(200).send({articles: articleData})
    }
    else{
        //if there is no request id, then the default id is the loggedin user, so we just need to return default user's articles info
        res.status(200).send(articles)
    }
}

const editArticle = (req, res) => {
    if (!req.params.id || req.params.id >= nextId) {
    	res.sendStatus(400).send('Can not find the article')
    } 
    else {
    	let articleData = articles.articles.filter((article)=>{
            if(article._id == req.params.id) {
                //change the requested article's text
                article.text = req.body.text
                return article._id == req.params.id
            }
        })
        res.status(200).send({articles: articleData})
    }
}

const addArticle = (req, res) => {
	if(!req.body.text){
    	res.status(400).send("you did not supply article")
    }
    else{
        const new_article = {_id: nextId, text:req.body.text, author:'default', date:new Date(), comments:[]}
        //add 1 to the nextId so that it can be used as next new article's id 
        nextId = nextId + 1
        //add the new article to the hardcoded data
        articles.articles.push(new_article)
        res.status(200).send({articles: [new_article]})
    }
}


module.exports = (app) => {
    app.get('/articles/:id?', getArticle)
    app.put('/articles/:id', editArticle)
    app.post('/article', addArticle)
}