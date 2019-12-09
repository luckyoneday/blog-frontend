const path = require("path")

module.exports = {
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx", ".json"],
    alias: {
      "@pages": path.resolve(__dirname, "../src/pages"),
      "@utils": path.resolve(__dirname, "../src/utils"),
      "@interface": path.resolve(__dirname, "../src/interface"),
      "@api": path.resolve(__dirname, "../src/api")
    }
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        loader: "ts-loader"
      }
    ]
  }
}
