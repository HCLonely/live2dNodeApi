/*
 * @Author: HCLonely
 * @Date: 2021-01-26 13:11:08
 * @LastEditTime: 2021-01-27 16:35:52
 * @LastEditors: HCLonely
 * @Description: 主程序
 * @FilePath: \live2dNodeApi\index.js
 */

const fs = require('fs-extra')
const app = require('./app')
const http = require('http')
const https = require('https')

const config = fs.readJsonSync('config.json')
const port = config.port || 2333

let httpsOption
if (config.ssl.enable) {
  const privateCrt = fs.readFileSync(config.privateCrt, 'utf8')
  const privateKey = fs.readFileSync(config.privateKey, 'utf8')
  httpsOption = {
    key: privateKey,
    cert: privateCrt
  }
}

app.set('port', port)

const server = config.ssl.enable ? https.createServer(httpsOption, app) : http.createServer(app)

server.listen(port)
server.on('error', onError)
server.on('listening', onListening)

function onError (error) {
  if (error.syscall !== 'listen') {
    throw error
  }

  const bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port

  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges')
      process.exit(1)
    case 'EADDRINUSE':
      console.error(bind + ' is already in use')
      process.exit(1)
    default:
      throw error
  }
}

function onListening () {
  const addr = server.address()
  const bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port
  console.log('Listening on ' + bind)
}
