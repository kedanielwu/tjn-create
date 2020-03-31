const path = require('path')
const baseConfig = require('./webpack.base.js')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const merge = require('webpack-merge');

module.exports = merge(baseConfig, {
  mode: 'development',
  devtool: 'eval-cheap-source-map',
  module: {
    rules: [{
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
    }]
  },
  devServer: {
    port: 3000,
    hot: true,
    host: 'localhost',
    publicPath: '/',
    inline: true,
    overlay: {
      warnings: false,
      errors: true
    },
    open: true,
    compress: true,
    clientLogLevel: 'warning',
    historyApiFallback: true,
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      title: 'React App',
      inject: true
    })
  ]
})
