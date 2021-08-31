/*
 * @Date: 2021-08-30 20:41:14
 * @LastEditors: HCLonely
 * @LastEditTime: 2021-08-31 17:20:30
 * @FilePath: \live2dNodeApi\main.js
 */
const app = require('./app.js')

module.exports = (req, res) => {
  app.callback()(req, res)
}
