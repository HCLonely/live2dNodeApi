/*
 * @Author: HCLonely
 * @Date: 2021-01-26 12:19:50
 * @LastEditTime: 2021-09-01 13:38:34
 * @LastEditors: HCLonely
 * @Description: 材质相关
 * @FilePath: \live2dNodeApi\tools\modelTextures.js
 */

const fs = require('fs-extra')
const path = require('path')

/* 获取材质名称 */
function getName (modelName, id) {
  const list = getList(modelName)
  return (list && list.textures) ? list.textures[parseInt(id) - 1] : null
}

/* 获取列表缓存 */
function getList (modelName) {
  const texturesModelCachePath = path.join(__dirname, '../models/', modelName, '/texturesModel.cache')
  const texturesCachePath = path.join(__dirname, '../models/', modelName, '/textures.cache')
  const textures = fs.existsSync(texturesModelCachePath) ? fs.readJsonSync(texturesModelCachePath) : (fs.existsSync(texturesCachePath) ? fs.readJsonSync(texturesCachePath) : null)
  return Array.isArray(textures) ? { textures } : false
}

module.exports = { getList, getName }
