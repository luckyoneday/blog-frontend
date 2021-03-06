const path = require("path")
const process = require("process")
const webpack = require("webpack")
const merge = require("webpack-merge")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const { CleanWebpackPlugin } = require("clean-webpack-plugin")

const baseConfig = require("./webpack.config.base")

// 判断是不是生产环境
const isProd = process.env.NODE_ENV === "production"

const config = merge(baseConfig, {
  entry: "./src/index.tsx",
  mode: process.env.NODE_ENV,
  target: "web",
  output: {
    publicPath: '/',
    path: path.resolve(__dirname, "../dist"),
    filename: "static/js/[name]_[hash].js"
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [{
          loader: MiniCssExtractPlugin.loader
        }, {
          loader: 'css-loader', 
        }]
      },
      {
        test: /\.less$/,
        use: [{
          loader: MiniCssExtractPlugin.loader
        }, {
          loader: 'css-loader', 
        }, {
          loader: "postcss-loader",
          options: {
            ident: "postcss",
            plugins: [require("autoprefixer")]
          }
        }, {
          loader: 'less-loader', 
          options: {
            lessOptions: {
              modifyVars: {
                'primary-color': '#ff9c6e',
              },
              javascriptEnabled: true,
            },
          },
        }]
      },
    ]
  },

  plugins: [
    new MiniCssExtractPlugin({
      filename: "static/css/[name].css"
    }),
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: "./public/index.html",
      favicon: "./public/favicon.ico"
    }),
    new webpack.DefinePlugin({
      'process.env.REACT_ENV': '"client"',
    })
  ]
})

if (isProd) {
  config.module.rules.push({
    test: /\.module.scss$/,
    exclude: /node_modules/,
    loader: "ignore-loader"
  })
} else {
  config.entry = {
    app: ["react-hot-loader/patch", "./src/index.tsx"]
  }
  config.devtool = "cheap-inline-source-map"
  config.devServer = {
    hot: true,
    historyApiFallback:true,
    contentBase: "./dist",
    proxy: {
      "/upload": {
        target: "https://img.rruu.net",
        pathRewrite: {"^/upload/image": "/api/upload"},
        changeOrigin: true,
        secure: false
      },
      "/api": {
        target: "http://localhost:2333",
        pathRewrite: { "^/api": "" },
        changeOrigin: true,
      }
    },
    overlay: {
      errors: true
    }
  }
  config.module.rules.push({
    test: /\.module.scss$/,
    exclude: /node_modules/,
    use: [
      "style-loader",
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
  })
  config.plugins.push(new webpack.HotModuleReplacementPlugin())
}

module.exports = config
