/*
 * @Date: 2021-08-30 20:41:14
 * @LastEditors: Steve Li
 * @LastEditTime: 2021-08-30 20:56:03
 * @FilePath: \live2dNodeApi\main.js
 */
const app = require('./app.js');

app.server = app.listen(3000,'',()=>{
    console.log(`running on 3000`);
})