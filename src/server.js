'use strict'

let express   = require('express')
let path      = require('path')
let app       = express()
let bodyParser = require('body-parser')
let handlers = require('./handlers.js')


app.use(bodyParser.json())


app.post('/', (req, res) => {
  console.log('request just came in')

  let url = req.body.url
  let filename = 'tmp.jpg'

  if (_.isEmpty(url) ||  !(_.endsWith(url, '.jpg'))) {
    res.send({error: 'Url must end with .jpg' })
  }
  else {
    handlers.downloadImage(url,filename)
    .then((res) => {
      console.log('downloaded')
      handlers.classifyImage(filename)
      .then((result) => {
        console.log('sending result')
        res.send({msg: result})
      })
    })
    .catch((err) => {
      console.log('sending error')
      res.send({error: error})
    })
  }
})


app.listen(8080, () => {
  console.log('Server is listening on port 8080')
})
