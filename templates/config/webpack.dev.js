const path = require('path')
const baseConfig = require('./webpack.base.js')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin');
baseConfig.mode = 'development'
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
baseConfig.devServer = {
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
  contentBase: path.resolve(__dirname, '../src'),
  clientLogLevel: 'warning',
  historyApiFallback: true,
}
baseConfig.devtool = 'eval-cheap-source-map'
baseConfig.plugins.push(new webpack.HotModuleReplacementPlugin());
baseConfig.plugins.push(new webpack.NamedModulesPlugin());
baseConfig.plugins.push(new HtmlWebpackPlugin({
  filename: 'index.html',
  title: 'React Demo',
  template: path.resolve(__dirname, '../src/index.html'),
  inject: true
}),)

module.exports = baseConfig
