/*
 * @Author: HCLonely
 * @Date: 2021-01-26 13:30:38
 * @LastEditTime: 2021-01-26 16:35:52
 * @LastEditors: Please set LastEditors
 * @Description: 重新生成modelList.json和texturesModel.cache文件
 * @FilePath: \live2dNodeApi\resetModel.js
 */

const fs = require('fs-extra')

const models1 = fs.readdirSync('models')
for (const model1 of models1) {
  const models2 = fs.readdirSync('models/' + model1).map(dir => model1 + '/' + dir)
  let onlyDir = true
  for (const model2 of models2) {
    if (!model2.includes('.cache') && !fs.lstatSync('models/' + model2).isDirectory()) {
      onlyDir = false
      break
    }
  }
  if (onlyDir) {
    fs.writeFileSync('models/' + model1 + '/texturesModel.cache', JSON.stringify(models2))
  }
}
const modelList = {
  models: models1
}
fs.writeFileSync('modelList.json', JSON.stringify(modelList, null, 2))
