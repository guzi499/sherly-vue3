/*
 * @Author: lihaoyu
 * @Date: 2022-03-28 22:16:15
 * @LastEditTime: 2022-04-15 16:06:24
 * @LastEditors: lihaoyu
 * @Description:
 * @FilePath: /sherly-vue3/vue.config.js
 */
const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave:false,
  devServer: {
    // proxy: "http://101.34.169.185",
    proxy: "http://192.168.16.215:8888",
  },
  publicPath: process.env.NODE_ENV === "production" ? "./" : "/",
});
