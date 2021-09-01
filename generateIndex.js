/*
 * @Author: HCLonely
 * @Date: 2021-08-31 16:13:39
 * @LastEditTime: 2021-09-01 15:19:59
 * @LastEditors: HCLonely
 * @FilePath: \live2dNodeApi\generateIndex.js
 * @Description:
 */
const marked = require('marked')
const fs = require('fs')
const path = require('path')

console.log('正在生成主页...')
fs.writeFileSync(path.join(__dirname, 'views/index.html'), marked(fs.readFileSync(path.join(__dirname, './README.md')).toString()))
console.log('主页已生成')
