module.exports = {
  test: /\.js$/,
  exclude: /node_modules/,
  use: [
    {
      loader: "babel-loader",
      options: {
        cacheDirectory: true,
        presets: ["@babel/preset-env", "@babel/preset-react"],
        plugins: [
          "@babel/plugin-proposal-class-properties"
        ]
      }
    }
  ]
}