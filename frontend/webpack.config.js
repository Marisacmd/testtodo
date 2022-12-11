const webpack = require("webpack");
const path = require("path");
const dotenv = require("dotenv");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
dotenv.config();

module.exports = {
  devtool: "inline-source-map",
  mode: "development",
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".mjs", ".jsx", ".json"],
  },
  devServer: {
    static: "./",
    compress: true,
    port: 8080,
    historyApiFallback: true,
  },
  entry: [
    path.join(__dirname, "./src/index.tsx"),
    `webpack-dev-server/client?http://localhost:8080`,
  ],
  output: {
    path: path.join(__dirname, "./dist"),
    publicPath: "/",
    filename: "[name].bundle.js",
  },
  module: {
    strictExportPresence: true,
    rules: [
      {
        test: /\.(ts|jsx|tsx)$/,
        use: "babel-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.module.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              esModule: true,
              modules: {
                namedExport: true,
              },
            },
          },
        ],
      },
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "style-loader",
          },
          {
            loader: "css-loader",
            options: {
              sourceMap: true,
            },
          },
          {
            loader: "sass-loader",
            options: {
              sourceMap: true,
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin(),
    new webpack.DefinePlugin({}),
    new webpack.ProvidePlugin({
      process: "process/browser",
    }),
  ],
  resolve: {
    extensions: [".ts", ".tsx", ".js", "jsx"],
  },
};
