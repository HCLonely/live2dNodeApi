/*
 * @Author: HCLonely
 * @Date: 2021-01-26 20:35:59
 * @LastEditTime: 2021-09-01 13:33:36
 * @LastEditors: HCLonely
 * @Description: 模型预览
 * @FilePath: \live2dNodeApi\routes\preview.js
 */

const express = require('express')
const router = express.Router()
const fs = require('fs-extra')
const path = require('path')

router.get('/', function (req, res) {
  const models = fs.readJsonSync(path.join(__dirname, '../modelList.json')).models
  res.render('preview', { models })
})

module.exports = router
