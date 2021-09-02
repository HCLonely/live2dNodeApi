/*
 * @Author: HCLonely
 * @Date: 2021-01-26 13:30:38
 * @LastEditTime: 2021-09-02 10:41:22
 * @LastEditors: HCLonely
 * @Description: 重新生成modelList.json和texturesModel.cache文件
 * @FilePath: \live2dNodeApi\resetModel.js
 */

const fs = require('fs-extra')

console.log('正在更新模型列表...')
const models1 = fs.readdirSync('models')
for (const model1 of models1) {
  const models2 = fs.readdirSync('models/' + model1).map(dir => model1 + '/' + dir).filter(e => !e.includes('.cache'))
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
console.log('模型列表更新完成')
