/*
 * @Author: lihaoyu
 * @Date: 2022-03-28 22:16:15
 * @LastEditTime: 2022-04-01 23:21:20
 * @LastEditors: lihaoyu
 * @Description:
 * @FilePath: /sherly-vue3/vue.config.js
 */
const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    proxy: "http://101.34.169.185:8888",
  },
});
