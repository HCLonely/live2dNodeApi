<!--
 * @Author: HCLonely
 * @Date: 2021-01-26 16:39:29
 * @LastEditTime: 2021-09-01 15:27:19
 * @LastAuthor: Please set LastEditors
 * @Description: README
 * @FilePath: \live2dNodeApi\README.md
-->

适用于[live2d.user.js](https://github.com/HCLonely/live2d.user.js),[live2d_demo](https://github.com/fghrsh/live2d_demo)的基于 Nodejs 的后端 Api.

## 使用方法

### 使用本地服务器搭建

1. 安装[NodeJs](https://nodejs.org/en/), [Git](https://git-scm.com/)
2. 克隆本项目`git clone https://github.com/HCLonely/live2dNodeApi.git`
3. 定位到项目目录`cd live2dNodeApi`
4. 安装依赖`npm install` / `cnpm install` / `pnpm install`
5. 启动服务器`npm start`

### 使用Vercel搭建

#### 一键搭建

[![Deploy to Vercel](https://vercel.com/button)](https://vercel.com/import/project?template=https://github.com/HCLonely/live2dNodeApi)

#### 自定义模型

1. 安装[NodeJs](https://nodejs.org/en/), [Git](https://git-scm.com/)
2. 安装Vercel CLI`npm install vercel -g`
3. 克隆本项目`git clone https://github.com/HCLonely/live2dNodeApi.git`
4. 添加你的模型
5. 运行命令`npm run build`
6. 部署到Vercel`vercel --prod`

## 命令

| 命令 | 功能 | 额外说明 |
|--- |--- |--- |
| `npm start` | 启动 api 服务器 | |
| `npm run update` | 重新生成`modelList.json`文件 | 用于增加或删除模型后更新模型列表 |
| `npm run check` | 检测模型的主配置文件格式及模型文件的完整性 | |
| `npm run screenshot` | 生成模型的预览图，放在`preview`文件夹 | |
| `npm run pre` | 在网页上查看模型的预览图，需要先生成 | |

## 配置

修改`config.json`文件进行配置：
```json
{
  "port": 2333, // 监听端口，默认2333
  "ssl":{
    "enable":false, // 是否启用ssl
    "privateCrt":"", // ssl证书文件路径
    "privateKey":"" // ssl私钥文件路径
  }
}
```

## 模型目录结构

```shell
models
├─模型文件夹 # 同一角色不同皮肤，不同皮肤共用一个index.json文件
│  ├─index.json # 必须，或model.json
│  └─...
├─模型文件夹 # 同一角色不同皮肤，每个皮肤都有各自的index.json文件
│  ├─模型文件夹 # 单个模型
│  │  ├─index.json # 必须，或model.json
│  │  └─...
│  └─模型文件夹 # 单个模型
│      ├─index.json # 必须，或model.json
│      └─...
└─模型文件夹 # 单个模型
    ├─index.json # 必须，或model.json
    └─...
```

> 详情请参考[models](https://github.com/HCLonely/live2dNodeApi/tree/master/models)目录

## 常见问题

### 依赖安装慢

[npm 安装慢](https://www.baidu.com/s?ie=utf-8&wd=npm%E5%AE%89%E8%A3%85%E6%85%A2)

[下载 Chromium 慢](https://www.baidu.com/s?ie=utf-8&wd=puppeteer%E5%AE%89%E8%A3%85%E6%85%A2)

### 更新模型后顺序乱了

请重命名模型文件夹进行排序，参考[models](https://github.com/HCLonely/live2dNodeApi/tree/master/models)目录。
