'use strict'

let fs = require('fs')
let _ = require('lodash')
let rp = require('request-promise')
let exec = require('child-process-promise').exec


let downloadImage = (uri, filename) => {
  return rp.get({uri: uri, encoding: null, resolveWithFullResponse: true})
  .then((res) => {
    if (res.headers['content-type'] != 'image/jpeg') {
      throw Error('File must be a jpg')
    }
    if (res.statusCode != 200) {
      throw Error(res.statusCode)
    }

    return new Promise((resolve, reject) => {
      let wstream = fs.createWriteStream(filename);
      wstream.write(res.body)
      wstream.end()
      wstream.on('finish', () => ( resolve(true) ))
      wstream.on('error', () => ( reject(error) ))
    })
  })
}

module.exports = {
  downloadImage: downloadImage,

  classifyImage: (filename) => {
    // TODO implement this by calling command line with exec
    // TODO just copy the protofile to the other service, no need to make a general repo if I only need 1 proto file
    return exec('make classify')
    .then((res) => {
      console.log('classifying')
      if (!(_.isEmpty(res.stderr))) {
        throw Error('there was an error in stderr')
      }
      return res.stdout
    })
  }
}
