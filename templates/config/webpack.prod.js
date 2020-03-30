const path = require('path')
const baseConfig = require('./webpack.base.js')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin');
baseConfig.mode = 'production'
baseConfig.module.rules.push({
  test: /\.css/,
  use: [
    'style-loader',
    {
      loader: 'css-loader',
      options: {
        importLoaders: 1
      }
    },
    {
      loader: 'postcss-loader',
      options: {
        plugins: [
          require('autoprefixer')
        ]
      }
    },
  ]
})
baseConfig.plugins.push(new HtmlWebpackPlugin({
  filename: 'index.html',
  template: path.resolve(__dirname, '../src/index.html'),
  inject: true
}),)

module.exports = baseConfig
