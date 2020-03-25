const path = require("path");
const autoprefixer = require('autoprefixer');
// webpack.config.js
module.exports = {
  mode: "development",
  entry: ["./src/index.js"],
  output: {
    path: path.join(__dirname, '../devServer'),
    filename: "./index.js",
    publicPath: "/"
  },

  // Enable live reload
  devServer: {
    port: 3000,
    contentBase: path.join(__dirname, "../devServer/"),
    stats: 'minimal'
  },
  devtool: 'inline-source-map',
  resolve: {
    extensions: [".js", ".jsx"],
  },

  // Map compiled code to source
  // devtool: 'source-maps',
  module: {
    rules: [
      {
        test: /\.(js|jsx|mjs)$/,
        enforce: 'pre',
        use: [
          {
            options: {
              eslintPath: require.resolve('eslint'),
              
            },
            loader: require.resolve('eslint-loader'),
          },
        ],
        include: path.resolve(__dirname, "../.."),
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "babel-loader",
            options: {
              cacheDirectory: true,
              presets: ["@babel/preset-env", "@babel/preset-react"]
            }
          }
        ]
      },
      {
        test: /\.css/,
        include: [path.join(__dirname, '../'), /(node_modules)/],
        use: [
          "style-loader", 
          "css-loader",
          {
            loader: 'postcss-loader',
            options: {
              plugins: [
                autoprefixer
              ]
            },
          },
        ]
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: "css-loader",
            options: {
              importLoaders: 1
            }
          },
          "sass-loader",
          {
            loader: 'postcss-loader',
            options: {
              plugins: [
                autoprefixer
              ]
            },
          },
          "style-loader"
        ]
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg)$/,
        use: [
          {
            loader: "url-loader",
            options: {
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