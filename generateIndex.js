const marked = require('marked')
const fs = require('fs')

fs.writeFileSync('./html/index.html', marked(fs.readFileSync('./README.md').toString()))
