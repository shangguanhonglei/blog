const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const path = require('path')
module.exports = {
  devtool: 'eval-source-map',
  entry: path.resolve(__dirname,'../src/main.js'),//已多次提及的唯一入口文件
  output: {
    path: path.resolve(__dirname,'../dist'),//打包后的文件存放的地方
    filename: "bundle.js"//打包后输出文件的文件名
  },
  module: {
    rules: [
      /*babel插件处理es6代码*/
      {
        test: /(\.js|\.jsx)$/,//正则
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              'env', 'react'
            ]
          }
        },
        exclude: path.resolve(__dirname,'../node_modules')
      }
    ]
  },
  //loaders是在打包构建过程中用来处理源文件的（JSX，Scss，Less..），一次处理一个，插件并不直接操作单个文件，它直接对整个构建过程其作用
  plugins: [
    new CleanWebpackPlugin([path.resolve('../dist/*.*')], {
      verbose: true,
      dry: false
    })
  ]

}