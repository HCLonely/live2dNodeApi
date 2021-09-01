/*
 * @Author: HCLonely
 * @Date: 2021-01-26 19:34:37
 * @LastEditTime: 2021-09-01 15:20:51
 * @LastEditors: HCLonely
 * @Description: 生成模型预览图
 * @FilePath: \live2dNodeApi\screenShot.js
 */
(async () => {
  let chrome = {}
  // let isAws = false
  let puppeteer
  const lanuchOptions = {
    defaultViewport: {
      width: 280,
      height: 250
    },
    args: ['--no-sandbox', `--window-size=${280},${250}`]
  }

  if (process.env.AWS_LAMBDA_FUNCTION_VERSION) {
  // running on the Vercel platform.
    // isAws = true
    chrome = require('chrome-aws-lambda')
    puppeteer = require('puppeteer-core')
    lanuchOptions.executablePath = await chrome.executablePath
  } else {
  // running locally.
    puppeteer = require('puppeteer')
  }
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
    const browser = await puppeteer.launch(lanuchOptions)
    const page = await browser.newPage()

    const num = fs.readJsonSync('modelList.json').models.length
    for (let i = 1; i <= num; i++) {
      console.log('正在截图', i + '/' + num)
      await page.goto('http://127.0.0.1:' + port + '/preview.html?id=' + i, { waitUntil: 'networkidle0' })
      await page.screenshot({ path: 'static/screenshot/' + i + '.png' })
    }

    await browser.close()
    if (/^win/.test(process.platform)) {
      spawn('taskkill', ['/PID', ls.pid, '/T', '/F'])
    } else {
      ls.kill('SIGTERM')
    }
    console.log('截图任务完成')
  }
})()
