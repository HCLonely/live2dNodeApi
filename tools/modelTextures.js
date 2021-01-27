/*
 * @Author: HCLonely
 * @Date: 2021-01-26 12:19:50
 * @LastEditTime: 2021-01-26 20:37:59
 * @LastEditors: Please set LastEditors
 * @Description: 材质相关
 * @FilePath: \live2dNodeApi\tools\modelTextures.js
 */

const fs = require('fs-extra')

/* 获取材质名称 */
function getName (modelName, id) {
  const list = getList(modelName)
  return (list && list.textures) ? list.textures[parseInt(id) - 1] : null
}

/* 获取列表缓存 */
function getList (modelName) {
  const textures = fs.existsSync('models/' + modelName + '/texturesModel.cache') ? fs.readJsonSync('models/' + modelName + '/texturesModel.cache') : (fs.existsSync('models/' + modelName + '/textures.cache') ? fs.readJsonSync('models/' + modelName + '/textures.cache') : null)
  return Array.isArray(textures) ? { textures } : false
}

module.exports = { getList, getName }
