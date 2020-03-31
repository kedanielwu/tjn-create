const path = require('path');
const argv = require('yargs').argv;
module.exports = {
  // we are in config, need to set the context to root
  context: path.resolve(__dirname, '../'),
  resolve: {
    extensions: [".js", ".jsx"],
  },
  entry: ['./src/index.js'],
  output: {
    path: path.join(
      path.resolve(__dirname, '../'),
      argv.appName || 'dist'
    ),
    filename: 'js/[name].[contenthash:8].js'
  },
  plugins: [],
  module: {
    rules: [
      // linter
      {
        test: /\.(js|jsx|mjs)$/,
        enforce: 'pre',
        use: [{
          options: {
            cache: true,
            eslintPath: require.resolve('eslint'),
            formatter: require.resolve('react-dev-utils/eslintFormatter')
          },
          loader: 'eslint-loader',
        }],
        exclude: /node_modules/,
      },
      {
        test: /\.(js|jsx)$/,
        loader: "babel-loader",
        options: {
          cacheDirectory: true,
          presets: [
            [
              "@babel/preset-env", 
              {
                useBuiltIns: "usage",
                corejs: 3
              }
            ],
            "@babel/preset-react"
          ],
          plugins: [
            "@babel/plugin-proposal-class-properties",
          ]
        },
        exclude: /node_modules/
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg)$/,
        use: [
          {
            loader: "url-loader",
            options: {
              fallback: 'file-loader',
              limit: 1024000
            }
          }
        ]
      },
      {
        test: /\.(woff2|woff|ttf|eot)(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[name].[ext]"
            }
          }
        ]
      },
    ]
  }
};