/*
 * @Author: HCLonely
 * @Date: 2021-01-26 20:35:59
 * @LastEditTime: 2021-01-26 20:38:28
 * @LastEditors: Please set LastEditors
 * @Description: 模型预览
 * @FilePath: \live2dNodeApi\routes\preview.js
 */

const express = require('express')
const router = express.Router()
const fs = require('fs-extra')

router.get('/', function (req, res) {
  const models = fs.readJsonSync('modelList.json').models
  res.render('preview', { models })
})

module.exports = router
