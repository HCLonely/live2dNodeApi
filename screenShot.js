/*
 * @Author: HCLonely
 * @Date: 2021-01-26 19:34:37
 * @LastEditTime: 2021-01-26 21:23:02
 * @LastEditors: Please set LastEditors
 * @Description: 生成模型预览图
 * @FilePath: \live2dNodeApi\screenShot.js
 */

const puppeteer = require('puppeteer')
const fs = require('fs-extra')
const { exec, spawn } = require('child_process')

console.log('正在启动api服务器...')
const ls = exec('node index.js')
ls.stdout.on('data', function (data) {
  if (data.toString().includes('Listening on port')) {
    console.log('启动api服务器成功，即将开始截图')
    screenShot()
  }
})

ls.stderr.on('data', function (data) {
  console.log('stderr: ' + data.toString())
})

async function screenShot () {
  const { port } = fs.readJsonSync('config.json')
  const browser = await puppeteer.launch({
    defaultViewport: {
      width: 280,
      height: 250
    },
    args: [`--window-size=${280},${250}`]
  })
  const page = await browser.newPage()

  const num = fs.readJsonSync('modelList.json').models.length
  for (let i = 1; i <= num; i++) {
    console.log('正在截图', i + '/' + num)
    await page.goto('http://127.0.0.1:' + port + '/preview.html?id=' + i, { waitUntil: 'networkidle0' })
    await page.screenshot({ path: 'preview/' + i + '.png' })
  }

  await browser.close()
  spawn('taskkill', ['/PID', ls.pid, '/T', '/F'])
}
