/*
 * @Date: 2021-08-30 20:41:14
 * @LastEditors: HCLonely
 * @LastEditTime: 2021-08-31 17:33:45
 * @FilePath: \live2dNodeApi\main.js
 */
const app = require('./app.js')

app.server = app.listen(2333, '', () => {
  console.log('running on 2333')
})
