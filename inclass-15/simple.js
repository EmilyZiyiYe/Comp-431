const http = require('http')

const host = '127.0.0.1'
const port = 3333 || process.env.PORT

http.createServer(preprocess).listen(port, host)
console.log(`Server running at http://${host}:${port}`)

function preprocess(req, res) {
     let body = ''
     req.on('data', function(chunk) {
          body += chunk
     })
     req.on('end', function() {
          req.body = body
          server(req, res)
     })
}

function server(req, res) {
     console.log('Request method        :', req.method)
     console.log('Request URL           :', req.url)
     console.log('Request content-type  :', req.headers['content-type'])
     console.log('Request payload       :', req.body)

     res.statusCode = 200
     if (req.method=='PUT' && req.url=='/logout') {
          var payload='test'
          res.setHeader('Content-Type', 'text/plain')
          res.end(payload)
     }
     else{
          res.setHeader('Content-Type', 'application/json')
          var payload={}
          if (req.method=='GET' && req.url=='/') {
               payload = { 'hello': 'world' }

          }
          if (req.method=='GET' && req.url=='/articles') {
               payload={'articles': [{id:1, author:'author1', body:'body1'},
                              		{id:2, author:'author2', body:'body2'},
                              		{id:3, author:'author3', body:'body3'}]}
          }
          if (req.method=='POST' && req.url=='/login') {
               var body=JSON.parse(req.body)

               payload={"username": body.username, "result":'success'}
          }         
          else{
               res.statusCode = 400
          }
          res.end(JSON.stringify(payload))
     }
}