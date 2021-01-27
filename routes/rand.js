/*
 * @Author: HCLonely
 * @Date: 2021-01-26 14:21:37
 * @LastEditTime: 2021-01-26 15:11:59
 * @LastEditors: Please set LastEditors
 * @Description: 返回随机模型id
 * @FilePath: \live2dNodeApi\routes\rand.js
 */

const express = require('express')
const router = express.Router()
const createError = require('http-errors')
const { getList } = require('../tools/modelList')

router.get('/', function (req, res, next) {
  if (!req.query.id) return next(createError(400, 'id不能为空'))
  const modelId = parseInt(req.query.id)
  const modelList = getList()
  let modelRandId = modelId
  while (modelRandId === modelId) {
    modelRandId = Math.floor(Math.random() * modelList.models.length) + 1
  }
  res.json({
    model: {
      id: modelRandId,
      name: modelList.models[modelRandId - 1],
      message: modelList.messages ? modelList.messages[modelRandId - 1] : null
    }
  })
})

module.exports = router
