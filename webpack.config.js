const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = {
  mode: 'development',
  entry: { main: './src/index.tsx' },
  output: {
    publicPath: '/',
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx", ".json"]
  },

  devtool: 'inline-source-map',
  devServer: {
    hot: true,
    historyApiFallback: true,
    contentBase: './dist',
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        loader: 'ts-loader'
      },
      {
        test: /\.module.scss$/,
        exclude: /node_modules/,
        use: ['style-loader', {
          loader: 'css-loader',
          options: {
            importLoaders: 1,
            modules: {
              localIdentName: "[name]__[local]-[hash:base64:6]",
            }
          }
        }, {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              plugins: [
                require("autoprefixer")
              ]
            }
          }, 'sass-loader']
      },
      {
        test: /\.css$/,
        include: [/node_modules/, path.resolve(__dirname, 'src')],
        use: ['style-loader', 'css-loader', {
          loader: 'postcss-loader',
          options: {
            ident: 'postcss',
            plugins: [
              require("autoprefixer")
            ]
          }
        }]
      },
    ]
  },

  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: './public/index.html'
    }),
    new webpack.HotModuleReplacementPlugin()
  ]
}