/*
 * @author: 李浩宇
 * @date: 2022-03-28
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
