const marked = require('marked')
const fs = require('fs')

console.log('正在生成主页...')
fs.writeFileSync('./html/index.html', marked(fs.readFileSync('./README.md').toString()))
console.log('主页已生成')
