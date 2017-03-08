const express = require('express')
const bodyParser = require('body-parser')


var article_collection = {articles : [
	{
		id: 1, author: "Emily1", text: "test1"
	},
	{
		id: 2, author: "Emily2", text: "test2"
	},
	{
		id: 3, author: "Emily3", text: "test3"
	}

]}

const addArticle = (req, res) => {
	const new_article = { id: article_collection.articles.length + 1, author: "Emily new", text: req.body.text }
	article_collection={articles:[...article_collection.articles,new_article]}  
    console.log('Payload received', req.body)    
    res.send(new_article)
}


const getArticles = (req, res) => res.send(article_collection)

const hello = (req, res) => res.send({ hello: 'world' })

const app = express()
app.use(bodyParser.json())
app.post('/article', addArticle)
app.get('/articles', getArticles)
app.get('/', hello)


// Get the port from the environment, i.e., Heroku sets it
const port = process.env.PORT || 3000
const server = app.listen(port, () => {
     const addr = server.address()
     console.log(`Server listening at http://${addr.address}:${addr.port}`)
})