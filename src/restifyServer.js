'use strict'

let restify = require('restify')
let restifyPlugins = require('restify-plugins')
let handlers = require('./handlers.js')
// let corsMiddleware = require('restify-cors-middleware')
let _ = require('lodash')
let bunyan = require('bunyan')
let log = bunyan.createLogger({name: 'cop-classifier', level: 'info'});
log.info('We in restify, lets get it started in hot')

let server = restify.createServer({
  name: 'cop-classifier',
  log: log
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

// server.on('NotFound', function (request, response, cb) { console.log('NOT FOUND')})
// server.on('MethodNotAllowed', function (request, response, cb) {console.log('METHOD NOT ALLOWED')})
// server.on('VersionNotAllowed', function (request, response, cb) {console.log('VERSION NOT ALLOWED')})
// server.on('UnsupportedMediaType', function (request, response, cb) {console.log('UNSUPPORTED MEDIA TYPE')})
// server.on('after', function (request, response, route, error) {console.log('AFTER')})
// server.on('uncaughtException', function (request, response, route, error) {console.log('UNCAUGHT EXCEPTION')})


// server.pre(() => {
//   console.log('***********************')
//   console.log('***********************')
//   console.log('***********************')
//   console.log('in pre! wow.')
//   return next()
// })

// server.pre(cors.preflight)
// server.use(cors.actual)
// server.use(restifyPlugins.acceptParser(server.acceptable))
// server.use(restifyPlugins.fullResponse())

// server.use(restifyPlugins.bodyParser({mapParams: true}))

// server.use(() => {
//   console.log('***********************')
//   console.log('***********************')
//   console.log('***********************')
//   console.log('in use! wow.')
//   return next()
// })

server.pre(function (request, response, next) {
  console.log('********************************')
  console.log('we are in the prescript from consolelog')
  request.log.info('We are in the prescript')
  console.log('********************************')
  return next()
});

server.pre(function(req, res, next){
  console.log('********************************')
  console.log('deep in the middleware nigga')
  console.log('********************************')
  //preflight needs to return exact request-header 
  // res.set('Access-Control-Allow-Origin', '*')
  // res.set('Access-Control-Allow-Headers',
  // req.headers['access-control-request-headers'])
  // if ('OPTIONS' == req.method) {
    // res.send(204)
  // }
  next()
})

function logger(req,res,next){
  console.log('********************************')
  console.log('********************************')
  req.log.info('hey there')
  log.info('yo waddup')
  console.log('logger middleware')
  console.log('********************************')
  console.log('********************************')
  console.log(req.headers, req.method, req.url);
  next();
}

server.use(logger)
server.use(restify.plugins.bodyParser())

server.get('/image', (req, res, next) => {
  console.log('request just came in for get')

  console.log('request keys: ',  Object.keys(req))
  console.log('body keys: ',  Object.keys(req.body))

  let url = req.body.url
  let filename = 'tmp.jpg'

  console.log('url: ', url)

  if (_.isEmpty(url) ||  !(_.endsWith(url, '.jpg'))) {
    console.log('not valid')
    res.send(JSON.stringify('Url must end with .jpg'))
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
        console.log('result1: ', JSON.stringify(result1))
        res.send(result1)
        return next()
      })
    })
    .catch((err) => {
      console.log('sending error: ', err)
      res.send(JSON.stringify(err))
      return next()
    })
  }
})

server.post('/image', (req, res, next) => {
  console.log('request just came in')

  console.log('request keys: ',  Object.keys(req))
  console.log('body keys: ',  Object.keys(req.body))

  let url = req.body.url
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

server.listen(80, '0.0.0.0', () => {console.log('Restify listening on 80!')})
