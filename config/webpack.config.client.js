const path = require("path")
const webpack = require("webpack")
const merge = require("webpack-merge")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const { CleanWebpackPlugin } = require("clean-webpack-plugin")

const baseConfig = require("./webpack.config.base")

module.exports = merge(baseConfig, {
  entry: "./src/index.tsx",
  target: "web",
  output: {
    path: path.resolve(__dirname, "../dist"),
    filename: "[name]_[hash].js"
  },
  devtool: "cheap-inline-source-map",
  // devServer: {
  //   hot: true,
  //   historyApiFallback: true,
  //   contentBase: "./dist"
  // },
  module: {
    rules: [
      {
        test: /\.css$/,
        include: ["/node_modules/antd/*", path.resolve(__dirname, "../src")],
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: "/public/"
            }
          },
          "css-loader",
          {
            loader: "postcss-loader",
            options: {
              ident: "postcss",
              plugins: [require("autoprefixer")]
            }
          }
        ]
      },
      {
        test: /\.module.scss$/,
        exclude: /node_modules/,
        loader: "ignore-loader"
      }
    ]
  },

  plugins: [
    new MiniCssExtractPlugin({
      filename: "[name].css"
    }),
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: "./public/index.html",
      favicon: "./public/favicon.ico"
    }),
    new webpack.HotModuleReplacementPlugin()
  ]
})
