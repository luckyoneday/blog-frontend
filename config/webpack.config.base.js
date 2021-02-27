const path = require("path")

module.exports = {
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx", ".json"],
    alias: {
      "@pages": path.resolve(__dirname, "../src/pages"),
      "@utils": path.resolve(__dirname, "../src/utils"),
      "@interface": path.resolve(__dirname, "../src/interface"),
      "@assets": path.resolve(__dirname, "../src/assets"),
      "@api": path.resolve(__dirname, "../src/api"),
      "@components": path.resolve(__dirname, "../src/components")
    }
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        loader: "ts-loader"
      },
      {
        test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
        loader: "url-loader",
        options: {
          limit: 8000,
          name: "static/img/[name].[hash:8].[ext]"
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf|svg)(\?.*)?$/,
        loader: "url-loader",
        options: {
          limit: 100,
          name: "static/fonts/[name].[hash:8].[ext]"
        }
      }
    ]
  }
}
