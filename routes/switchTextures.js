/*
 * @Author: HCLonely
 * @Date: 2021-01-26 15:01:11
 * @LastEditTime: 2021-01-26 16:31:49
 * @LastEditors: Please set LastEditors
 * @Description: 按顺序返回材质id
 * @FilePath: \live2dNodeApi\routes\switchTextures.js
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
  const modelTexturesId = id[1] ? parseInt(id[1]) : 0
  const modelName = id2name(modelId)
  const modelTexturesList = Array.isArray(modelName) ? { textures: modelName } : getList(modelName)

  let modelTexturesNewId = modelTexturesId === 0 ? 2 : modelTexturesId + 1
  if (!modelTexturesList || !modelTexturesList.textures || !modelTexturesList.textures[modelTexturesNewId - 1]) {
    modelTexturesNewId = 1
  }
  const model = Array.isArray(modelName) ? modelName[modelTexturesNewId - 1] : modelName
  res.json({
    textures: {
      id: modelTexturesNewId,
      name: (!modelTexturesList || !modelTexturesList.textures) ? model : modelTexturesList.textures[modelTexturesNewId - 1],
      model
    }
  })
})

module.exports = router
