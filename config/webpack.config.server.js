const merge = require("webpack-merge")
const nodeExternals = require("webpack-node-externals")
const path = require("path")

const baseConfig = require("./webpack.config.base")

module.exports = merge(baseConfig, {
  entry: "./server/index.tsx",
  target: "node",
  output: {
    path: path.resolve(__dirname, "../dist"),
    libraryTarget: "commonjs2",
    filename: "server.bundle.js"
  },
  externals: [nodeExternals()],
  module: {
    rules: [
      {
        test: /\.module.scss$/,
        exclude: /node_modules/,
        use: [
          "isomorphic-style-loader",
          {
            loader: "css-loader",
            options: {
              importLoaders: 1,
              modules: {
                localIdentName: "[name]__[local]-[hash:base64:6]"
              }
            }
          },
          {
            loader: "postcss-loader",
            options: {
              ident: "postcss",
              plugins: [require("autoprefixer")]
            }
          },
          "sass-loader"
        ]
      },
      {
        test: /\.css$/,
        loader: "ignore-loader"
      }
    ]
  }
})
