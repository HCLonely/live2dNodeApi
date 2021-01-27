/*
 * @Author: HCLonely
 * @Date: 2021-01-26 11:55:50
 * @LastEditTime: 2021-01-26 13:31:25
 * @LastEditors: Please set LastEditors
 * @Description: 模型处理
 * @FilePath: \live2dNodeApi\tools\id2name.js
 */

const fs = require('fs-extra')

/* 获取模型列表 */
function getList () {
  return fs.readJsonSync('modelList.json')
}

/* 获取模组名称 */
function id2name (id) {
  const list = getList()
  return list.models[parseInt(id) - 1]
}

/* 转换模型名称 */
function name2id (name) {
  const list = getList()
  const id = list.models.indexOf(name) + 1
  return id || false
}

module.exports = { getList, id2name, name2id }
