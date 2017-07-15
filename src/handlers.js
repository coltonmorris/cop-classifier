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
    return exec('python src/classifier/label_image.py tmp.jpg')
    .then((res) => {
      console.log('classifying')
      console.log('keys: ', Object.keys(res))
      console.log('output of stdout: ', res.stdout)
      console.log('output of stderr: ', res.stderr)
      if (_.isEmpty(res.stdout)) {
        throw Error('there was no response in stdout')
      }
      // res.stdout == 'unknown (score = 0.95659)\ncops (score = 0.04341)'
      let out = res.stdout.split('\n')[0].split(' ')
      return {
        person: out[0],
        result: parseFloat(out[3].slice(0,-1))
      }
    })
  }
}
