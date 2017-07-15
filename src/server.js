// 'use strict'

// let express = require('express')
// let app = express()
// let handlers = require('./handlers.js')
// let bodyParser = require('body-parser')
// let cors = require('cors')

// // logging middleware
// app.all('*', function(req, res, next){
//   //preflight needs to return exact request-header 
//   res.set('Access-Control-Allow-Headers',
//   req.headers['access-control-request-headers']);
//   if ('OPTIONS' == req.method)
//     return res.send(204);next();
// });

// // app.use(function(req, res, next) {
// //   res.header("Access-Control-Expose-Headers", "Origin,Access-Control-Allow-Origin, X-Requested-With, Content-Type, Accept, DNT, X-CustomHeader, Keep-Alive, User-Agent, X-Requested-With, If-Modified-Since, Cache-Control, Content-Range, Range")
// //   res.header("Access-Control-Allow-Origin", "*")
// //   res.header("Access-Control-Allow-Headers", "Origin,Access-Control-Allow-Origin, X-Requested-With, ontent-Type, Accept, DNT, X-CustomHeader, Keep-Alive, User-Agent, X-Requested-With, If-Modified-Since, Cache-Control, Content-Range, Range")
// //   res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
// //   res.setHeader('Access-Control-Allow-Origin', '*')
// //   res.addHeader('Access-Control-Allow-Origin', '*')
// //   next()
// // })

// app.options('*', cors())
// app.use(bodyParser.text({ type: 'text/plain'}))

// app.post('/image',cors(), function (req, res) {
//   console.log('request just came in')

//   console.log('request keys: ',  Object.keys(req))
//   console.log('request body keys: ',  Object.keys(req.body))

//   let url = JSON.parse(req.body).url
//   let filename = 'tmp.jpg'

//   console.log('url: ', url)

//   if (_.isEmpty(url) ||  !(_.endsWith(url, '.jpg'))) {
//     console.log('not valid')
//     res.send('Url must end with .jpg')
//   }
//   else {
//     console.log('valid, downloading')
//     return handlers.downloadImage(url,filename)
//     .then((result) => {
//       console.log('downloaded')
//       return handlers.classifyImage(filename)
//       .then((result1) => {
//         console.log('sending result')
//         console.log('result1: ', result1)
//         res.setHeader('Content-Type', 'text/plain')
//         res.send(JSON.stringify(result1))
//       })
//     })
//     .catch((err) => {
//       console.log('sending error: ', err)
//       res.send(JSON.stringify(err))
//     })
//   }
// })

// app.listen(80, function () {
//   console.log('App listening on port 80!')
// })



'use strict'

let restify = require('restify')
let restifyPlugins = require('restify-plugins')
let handlers = require('./handlers.js')
let corsMiddleware = require('restify-cors-middleware')
let _ = require('lodash')

let server = restify.createServer({
  name: 'cop-classifier',
})

// let cors = corsMiddleware({
//   origins: [
//     '*'
//     // 'http://coltons.tech',
//     // 'http://coltons.space',
//     // 'http://coltons.site',
//     // 'http://coltons.website',
//     // 'http://35.197.4.146'
//   ],
//   exposeHeaders: ['access-control-allow-origin', 'origin', 'accept', 'Origin', 'content-type', 'Content-Type', 'Accept', 'Access-Control-Allow-Headers', 'X-Requested-With', 'Access-Control-Allow-Origin' ],
//   allowHeaders: ['access-control-allow-origin', 'origin', 'accept', 'Origin', 'content-type', 'Content-Type', 'Accept', 'Access-Control-Allow-Headers', 'X-Requested-With', 'Access-Control-Allow-Origin' ],
// })

// server.use(restify.CORS({'origins': ['http://localhost', 'http://my-website', 'http://35.192.0.146']}))
// server.pre(
//   function crossOrigin(req,res,next){
//     res.header("Access-Control-Allow-Origin", "*")
//     res.header("Access-Control-Allow-Headers", "X-Requested-With")
//     return next()
//   }
// )
// server.use(
//   function crossOrigin(req,res,next){
//     res.header("Access-Control-Allow-Origin", "*")
//     res.header("Access-Control-Allow-Headers", "X-Requested-With")
//     return next()
//   }
// )


// server.pre((req, res, next) => {
//   console.log('***********************')
//   console.log('***********************')
//   console.log('***********************')
//   console.log('in pre! wow.')
//   console.log('req keys: ', Object.keys(req))
//   console.log('headers: ', req.headers)
//   console.log('method: ', req.method)

//   res.setHeader('Access-Control-Allow-Origin', '*')
//   res.header('Access-Control-Allow-Origin', '*')
//   res.set('Access-Control-Allow-Origin', '*')
//   res.addHeader('Access-Control-Allow-Origin', '*')

//   res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Content-Length, User-Agent')
//   res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Content-Length, User-Agent')
//   res.set('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Content-Length, User-Agent')
//   res.addHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Content-Length, User-Agent')
//   return next()
// })
// server.use((req, res, next) => {
//   console.log('***********************')
//   console.log('***********************')
//   console.log('***********************')
//   console.log('in use! wow.')
//   console.log('req keys: ', Object.keys(req))
//   console.log('headers: ', req.headers)
//   console.log('method: ', req.method)

//   res.setHeader('Access-Control-Allow-Origin', '*')
//   res.header('Access-Control-Allow-Origin', '*')
//   res.set('Access-Control-Allow-Origin', '*')
//   res.addHeader('Access-Control-Allow-Origin', '*')

//   res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Content-Length, User-Agent')
//   res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Content-Length, User-Agent')
//   res.set('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Content-Length, User-Agent')
//   res.addHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Content-Length, User-Agent')
//   return next()
// })

server.on('NotFound', function (request, response, cb) { console.log('NOT FOUND')})
server.on('MethodNotAllowed', function (request, response, cb) {console.log('METHOD NOT ALLOWED')})
server.on('VersionNotAllowed', function (request, response, cb) {console.log('VERSION NOT ALLOWED')})
server.on('UnsupportedMediaType', function (request, response, cb) {console.log('UNSUPPORTED MEDIA TYPE')})
server.on('after', function (request, response, route, error) {console.log('AFTER')})
server.on('uncaughtException', function (request, response, route, error) {console.log('UNCAUGHT EXCEPTION')})


server.pre(() => {
  console.log('***********************')
  console.log('***********************')
  console.log('***********************')
  console.log('in pre! wow.')
  return next()
})
// server.pre(cors.preflight)
// server.use(cors.actual)
server.use(restifyPlugins.acceptParser(server.acceptable))
// server.use(restifyPlugins.fullResponse())
server.use(restifyPlugins.bodyParser({mapParams: true}))
server.use(() => {
  console.log('***********************')
  console.log('***********************')
  console.log('***********************')
  console.log('in use! wow.')
  return next()
})



server.post('/image', (req, res, next) => {
  console.log('request just came in')

  console.log('params keys: ',  Object.keys(req.params))

  let url = req.params.url
  let filename = 'tmp.jpg'

  console.log('url: ', url)

  if (_.isEmpty(url) ||  !(_.endsWith(url, '.jpg'))) {
    console.log('not valid')
    res.send(201, new Error('Url must end with .jpg'))
    return next()
  }
  else {
    console.log('valid, downloading')
    return handlers.downloadImage(url,filename)
    .then((result) => {
      console.log('downloaded')
      return handlers.classifyImage(filename)
      .then((result1) => {
        console.log('sending result')
        console.log('result1: ', result1)
        res.setHeader('Content-Type', 'application/json')
        res.send(200, result1)
        return next()
      })
    })
    .catch((err) => {
      console.log('sending error: ', err)
      res.send(202, err)
      return next()
    })
  }
})


server.listen(80)
