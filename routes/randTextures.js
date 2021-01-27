/*
 * @Author: HCLonely
 * @Date: 2021-01-26 14:37:55
 * @LastEditTime: 2021-01-26 15:12:08
 * @LastEditors: Please set LastEditors
 * @Description: 返回随机材质id
 * @FilePath: \live2dNodeApi\routes\randTextures.js
 */

const express = require('express')
const router = express.Router()
const createError = require('http-errors')
const { id2name } = require('../tools/modelList')
const { getList } = require('../tools/modelTextures')

router.get('/', function (req, res, next) {
  if (!req.query.id) return next(createError(400, 'id不能为空'))
  const id = req.query.id.split('-')
  const modelId = parseInt(id[0])
  let modelTexturesId = id[1] ? parseInt(id[1]) : 0
  const modelName = id2name(modelId)
  const modelTexturesList = Array.isArray(modelName) ? { textures: modelName } : getList(modelName)

  let modelTexturesNewId = 1
  if (modelTexturesList.textures.length > 1) {
    if (modelTexturesId === 0) {
      modelTexturesId = 1
    }
    while (modelTexturesNewId === modelTexturesId) {
      modelTexturesNewId = Math.floor(Math.random() * modelTexturesList.textures.length) + 1
    }
  }
  res.json({
    textures: {
      id: modelTexturesNewId,
      name: modelTexturesList.textures[modelTexturesNewId - 1],
      model: Array.isArray(modelName) ? modelName[modelTexturesNewId - 1] : modelName
    }
  })
})

module.exports = router
