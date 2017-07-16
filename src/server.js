'use strict'

let express = require('express')
let app = express()
let handlers = require('./handlers.js')
let bodyParser = require('body-parser')
let cors = require('cors')
let bunyan = require('bunyan')
let log = bunyan.createLogger({name: 'cop-classifier', level: 'info'});
log.info('We in express, lets get it started in hot')




function logger(req,res,next){
  console.log('********************************')
  console.log('logger middleware')
  console.log('********************************')
  console.log(req.headers, req.method, req.url);
  next();
}

app.all('*', function(req, res, next){
  console.log('********************************')
  console.log('deep in the middleware nigga')
  log.info('YO WHATS UP')
  console.log('********************************')
  //preflight needs to return exact request-header 
  res.set('Access-Control-Allow-Origin', '*')
  res.set('Access-Control-Allow-Headers',
  req.headers['access-control-request-headers'])
  if ('OPTIONS' == req.method) {
    res.send(204)
  }
  next()
})

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
})

app.options('*', cors())
app.use(logger)
// app.use(bodyParser())
app.use(bodyParser.urlencoded({ extended: false }))

app.post('/image', cors(), function (req, res) {
  console.log('request just came in')

  console.log('request keys: ',  Object.keys(req))
  console.log('request body keys: ',  Object.keys(req.body))

  let url = JSON.parse(req.body).url
  let filename = 'tmp.jpg'

  console.log('url: ', url)

  if (_.isEmpty(url) ||  !(_.endsWith(url, '.jpg'))) {
    console.log('not valid')
    res.send('Url must end with .jpg')
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
        res.setHeader('Content-Type', 'text/plain')
        res.send(JSON.stringify(result1))
      })
    })
    .catch((err) => {
      console.log('sending error: ', err)
      res.send(JSON.stringify(err))
    })
  }
})

app.get('/image', cors(), (req, res) => {
  console.log('request just came in for get')

  console.log('request keys: ',  Object.keys(req))
  console.log('body keys: ',  Object.keys(req.body))

  let url = req.body.url
  let filename = 'tmp.jpg'

  console.log('url: ', url)

  if (_.isEmpty(url) ||  !(_.endsWith(url, '.jpg'))) {
    console.log('not valid')
    res.send(JSON.stringify('Url must end with .jpg'))
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
      })
    })
    .catch((err) => {
      console.log('sending error: ', err)
      res.send(JSON.stringify(err))
    })
  }
})

app.listen(80, '0.0.0.0',function () {
  console.log('Express listening on 80!')
})
