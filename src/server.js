'use strict'

// TODO Figure out why dockerfile cmd isn't running

let grpc = require('grpc')
let protofile = __dirname + '/../proto/main.proto'
let mainProto = grpc.load(protofile).main
let _ = require('lodash')
let handlers = require('./handlers.js')


/**
 * Implements the Url RPC method.
 */
function classifyUrl(call, callback) {
  let url = call.request.url
  let filename = 'tmp.jpg'

  if (_.isEmpty(url) ||  !(_.endsWith(url, '.jpg'))) {
    callback(Error('Url must end with .jpg'), null)
  }
  else {
    handlers.downloadImage(url,filename)
    .then((res) => {
      callback(null, { msg: handlers.classifyImage(filename) })
    })
    .catch((err) => {
      callback(err, null)
    })
  }
}

/**
 * Starts an RPC server that receives requests for the Writer service at the
 * sample server port
 */
function main() {
  var server = new grpc.Server()
  server.addService(mainProto.Classify.service, {classifyUrl: classifyUrl})
  server.bind('localhost:8080', grpc.ServerCredentials.createInsecure())
  console.log('Listening for gRpc on localhost:50051')
  server.start()
}

main()
