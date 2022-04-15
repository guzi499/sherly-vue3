/*
 * @Author: lihaoyu
 * @Date: 2022-03-28 23:41:35
 * @LastEditTime: 2022-04-15 17:19:51
 * @LastEditors: lihaoyu
 * @Description:
 * @FilePath: /sherly-vue3/babel.config.js
 */
const plugins = [];
if (process.env.NODE_ENV === "production") {
  //exclude(忽略)
  plugins.push(["transform-remove-console", { exclude: ["error", "warn"] }]);
}
module.exports = {
  plugins,
  presets: ["@vue/cli-plugin-babel/preset"],
};
