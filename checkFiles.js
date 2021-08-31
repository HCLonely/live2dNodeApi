/*
 * @Author: HCLonely
 * @Date: 2021-01-26 13:30:38
 * @LastEditTime: 2021-01-26 19:11:49
 * @LastEditors: Please set LastEditors
 * @Description: 检测模型文件完整性
 * @FilePath: \live2dNodeApi\checkFiles.js
 */

const fs = require('fs-extra')
const path = require('path')
const chalk = require('chalk')

const error = chalk.bold.red
const warning = chalk.keyword('orange')
const log = {
  error: e => console.log(error(e)),
  warning: e => console.log(warning(e))
}

console.log('正在检测检测模型格式及完整性...')

const modelsDirs1 = fs.readdirSync('models')
for (const modelsDir1 of modelsDirs1) {
  const modelsDir1Path = path.join('models', modelsDir1)
  const modelsDirs2 = fs.readdirSync(modelsDir1Path)
  if (modelsDirs2.includes('texturesModel.cache')) {
    const shouldHasDirs = fs.readJsonSync(path.join(modelsDir1Path, 'texturesModel.cache'))
    for (const shouldHasDir of shouldHasDirs) {
      if (!modelsDirs2.includes(shouldHasDir.replace(modelsDir1 + '/', ''))) {
        log.warning('缺少文件夹: ' + path.join('models', shouldHasDir))
      }
    }
    for (const modelsDir2 of modelsDirs2) {
      if (modelsDir2 === 'texturesModel.cache') continue
      check(path.join(modelsDir1Path, modelsDir2))
    }
  } else {
    check(modelsDir1Path)
  }
}

function check (modelsDir2Path) {
  const modelJsonPath1 = path.join(modelsDir2Path, 'index.json')
  const modelJsonPath2 = path.join(modelsDir2Path, 'model.json')
  const modelJsonPath = fs.existsSync(modelJsonPath1) ? modelJsonPath1 : (fs.existsSync(modelJsonPath2) ? modelJsonPath2 : null)
  if (!modelJsonPath) {
    return log.error('文件名错误或缺少文件: ' + modelJsonPath1 + ' | ' + modelJsonPath2)
  }
  const modelJson = fs.readFileSync(modelJsonPath).toString()
  let modelConfig
  try {
    modelConfig = JSON.parse(modelJson)
  } catch (e) {
    return log.error('文件内容格式错误: ' + modelJsonPath)
  }
  const { model, textures, motions, physics, pose, expressions } = modelConfig
  if (!model) {
    log.error('缺少关键参数"model": ' + modelJsonPath)
  } else if (!fs.existsSync(path.join(modelsDir2Path, model))) {
    log.error('缺少模型文件或路径错误: ' + path.join(modelsDir2Path, model))
  }
  if (!textures) {
    log.error('缺少关键参数"textures": ' + modelJsonPath)
  } else {
    if (!Array.isArray(textures)) {
      log.error('参数"textures"格式错误: ' + modelJsonPath)
    } else {
      for (const texture of textures) {
        if (!fs.existsSync(path.join(modelsDir2Path, texture))) {
          log.error('缺少材质文件或路径错误: ' + path.join(modelsDir2Path, texture))
        }
      }
    }
  }
  if (physics && !fs.existsSync(path.join(modelsDir2Path, physics))) {
    log.warning('文件路径错误或缺少文件: ' + path.join(modelsDir2Path, physics))
  }
  if (pose && !fs.existsSync(path.join(modelsDir2Path, pose))) {
    log.warning('文件路径错误或缺少文件: ' + path.join(modelsDir2Path, pose))
  }
  if (expressions) {
    for (const expression of expressions) {
      if (!fs.existsSync(path.join(modelsDir2Path, expression.file))) {
        log.warning('文件路径错误或缺少文件: ' + path.join(modelsDir2Path, expression.file))
      }
    }
  }
  if (motions) {
    for (const motion of Object.values(motions)) {
      for (const m of motion) {
        if (m.file) {
          if (!fs.existsSync(path.join(modelsDir2Path, m.file))) {
            log.warning('文件路径错误或缺少文件: ' + path.join(modelsDir2Path, m.file))
          }
        }
        if (m.sound) {
          if (!fs.existsSync(path.join(modelsDir2Path, m.sound))) {
            log.warning('文件路径错误或缺少文件: ' + path.join(modelsDir2Path, m.sound))
          }
        }
      }
    }
  }
}
console.log('检测完成')
