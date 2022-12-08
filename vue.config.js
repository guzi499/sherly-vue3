/*
 * @author: 李浩宇
 * @date: 2022-03-28
 */

const path = require("path");
const { defineConfig } = require("@vue/cli-service");
const CompressionPlugin = require("compression-webpack-plugin");
const ScriptExtHtmlWebpackPlugin = require("script-ext-html-webpack-plugin");
function resolve(dir) {
  return path.join(__dirname, dir);
}
const addOptions = {
  preserveWhitespace: true,
};
module.exports = defineConfig({
  transpileDependencies: true,
  // lintOnSave:false,
  devServer: {
    proxy: "http://123.249.17.195",
    // proxy: "http://192.168.16.215:8888",
    // proxy: "http://127.0.0.1:8888",
  },
  configureWebpack: {
    resolve: {
      alias: {
        "@": resolve("src"),
        "@components": path.resolve(__dirname, "./src/components"),
      },
    },
    plugins: [
      // https://www.ydyno.com/archives/1260.html 使用gzip解压缩静态文件
      new CompressionPlugin({
        test: /\.(js|css|html)?$/i, // 压缩文件格式
        filename: "[path][base].gz", // 压缩后的文件名
        algorithm: "gzip", // 使用gzip压缩
        minRatio: 0.8, // 压缩率小于1才会压缩
      }),
      new ScriptExtHtmlWebpackPlugin({
        inline: /runtime~.+\.js$/, //正则匹配runtime文件名
      }),
    ],
  },
  chainWebpack(config) {
    config.module
      .rule("vue")
      .use("vue-loader")
      .loader("vue-loader")
      .tap((options) => {
        options.compilerOptions = addOptions;
        console.log(options);
      })
      .end();

    (config) => config.devtool("cheap-source-map");
    config
      .plugin("ScriptExtHtmlWebpackPlugin")
      .after("html")
      .use("script-ext-html-webpack-plugin", [
        {
          inline: /runtime\..*\.js$/,
        },
      ])
      .end();
    config.optimization.splitChunks({
      chunks: "all",
      cacheGroups: {
        elementUI: {
          name: "elementUI", // 将elementUI拆分为单个包
          priority: 20, // 权重值需要大于libs和app，否则它将被打包到libs或app中
          test: /[\\/]node_modules[\\/]_?element-ui(.*)/, // in order to adapt to cnpm
        },
      },
    });
    config.optimization.runtimeChunk("single");
  },
  publicPath: "/",
  productionSourceMap: false,
});
