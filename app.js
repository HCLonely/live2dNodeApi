/*
 * @Author: HCLonely
 * @Date: 2021-01-26 11:23:19
 * @LastEditTime: 2021-09-01 12:45:04
 * @LastEditors: HCLonely
 * @Description: 主文件
 * @FilePath: \live2dNodeApi\app.js
 */

const createError = require('http-errors')
const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')

const app = express()

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'models')))
app.use(express.static(path.join(__dirname, 'html')))
app.use(express.static(path.join(__dirname, 'static')))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

const indexPath = '/'
const indexRouter = require('./routes/index')
const getRouter = require('./routes/get')
const randRouter = require('./routes/rand')
const randTexturesRouter = require('./routes/randTextures')
const switchRouter = require('./routes/switch')
const switchTexturesRouter = require('./routes/switchTextures')
const previewRouter = require('./routes/preview')

// app.use(indexPath, indexRouter)
app.use(indexPath, indexRouter)
app.use(indexPath + 'get', getRouter)
app.use(indexPath + 'rand', randRouter)
app.use(indexPath + 'rand_textures', randTexturesRouter)
app.use(indexPath + 'switch', switchRouter)
app.use(indexPath + 'switch_textures', switchTexturesRouter)
app.use(indexPath + 'preview', previewRouter)

app.use(function (req, res, next) {
  next(createError(404))
})

app.use(function (err, req, res, next) {
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  res.status(err.status || 500)
  res.render('error')
})

module.exports = app
