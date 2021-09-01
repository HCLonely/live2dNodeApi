/*
 * @Author: HCLonely
 * @Date: 2021-09-01 12:42:09
 * @LastEditTime: 2021-09-01 15:24:01
 * @LastEditors: HCLonely
 * @FilePath: \live2dNodeApi\routes\index.js
 * @Description:
 */
const express = require('express')
const router = express.Router()
const path = require('path')

router.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, '../views/index.html'))
})

module.exports = router
