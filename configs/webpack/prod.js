// production config
process.env.NODE_ENV = "production"

const { merge } = require("webpack-merge");
const paths = require("../paths");

const commonConfig = require("./common");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin")
const TerserPlugin = require("terser-webpack-plugin")

module.exports = merge(commonConfig, {
  mode: "production",
  output: {
    filename: "js/bundle.[contenthash].min.js",
    path: paths.build,
    publicPath: "/",
  },
  devtool: "source-map",
  plugins: [],
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin(), new CssMinimizerPlugin()],
  },
});
