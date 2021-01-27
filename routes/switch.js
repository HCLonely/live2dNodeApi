/*
 * @Author: HCLonely
 * @Date: 2021-01-26 14:58:49
 * @LastEditTime: 2021-01-26 15:12:15
 * @LastEditors: Please set LastEditors
 * @Description: 按顺序返回模型id
 * @FilePath: \live2dNodeApi\routes\switch.js
 */

const express = require('express')
const router = express.Router()
const createError = require('http-errors')
const { getList } = require('../tools/modelList')

router.get('/', function (req, res, next) {
  if (!req.query.id) return next(createError(400, 'id不能为空'))
  const modelId = parseInt(req.query.id)
  const modelList = getList()
  let modelSwitchId = modelId + 1
  if (!modelList.models[modelSwitchId - 1]) {
    modelSwitchId = 1
  }
  res.json({
    model: {
      id: modelSwitchId,
      name: modelList.models[modelSwitchId - 1],
      message: modelList.messages ? modelList.messages[modelSwitchId - 1] : null
    }
  })
})

module.exports = router
