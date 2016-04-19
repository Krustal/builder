var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    main: [
      __dirname + "/src/main.js"
    ]
  },
  devtool: 'cheap-module-source-map',
  devServer: {
    contentBase: './public'
  },
  debug: true,
  output: {
    path: __dirname + "/public/assets",
    filename: "[name].[hash].bundle.js",
    sourceMapFilename: "debugging/[file].[hash].map",
    chunkFilename: "[id].[hash].bundle.js",
    publicPath: '/assets/',
    pathinfo: true
  },
  resolveLoader: {
    moduleDirectories: ['node_modules']
  },
  resolve: {
    root: [__dirname + "/src/" ],
    extensions: ['', '.js', '.coffee', '.jsx', '.css']
  },
  module: {
    preloaders: [
      { test: /\.js$/, loader: 'source-map' }
    ],
    loaders: [
      { test: /\.jsx?$/, exclude: /(node_modules|bower_components)/, loader: 'babel' },
      { test: /\.css$/, loader: ExtractTextPlugin.extract("style-loader", "css-loader?modules&importLoaders=1*localIdentName=[name]__[local]___[hash:base64:5]")},
      { test: /\.scss$/, loader: ExtractTextPlugin.extract("style-loader", "css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]", "sass-loader") }
    ]
  },
  plugins: [
    // Run build in node's production environment to strip out test helpers from
    // build
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      test: /\.jsx?($|\?)/,
      compress: {
        warnings: false
      }
    }),
    new webpack.optimize.DedupePlugin(),
    new ExtractTextPlugin("[name].[contenthash].css"),
    new HtmlWebpackPlugin({
      filename: '../index.html',
      template: 'src/index.html',
      inject: 'body'
    })
  ]
};
