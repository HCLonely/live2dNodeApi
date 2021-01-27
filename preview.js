/*
 * @Author: HCLonely
 * @Date: 2021-01-26 20:55:16
 * @LastEditTime: 2021-01-26 21:25:05
 * @LastEditors: Please set LastEditors
 * @Description: 预览
 * @FilePath: \live2dNodeApi\preview.js
 */

const fs = require('fs-extra')
const { execSync } = require('child_process')
const os = require('os')

const { port } = fs.readJsonSync('config.json')
const link = `http://127.0.0.1:${port}/preview`
const platform = os.platform()
switch (platform) {
  case 'win32':
    execSync(`start ${link}`)
    break
  case 'linux':
    execSync(`x-www-browser ${link}`)
    break
  case 'darwin':
    execSync(`open ${link}`)
    break
  default:
    console.log(`请在浏览器打开${link}查看`)
}
