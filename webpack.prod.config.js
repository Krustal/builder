const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const postCSSModValues = require('postcss-modules-values');
const path = require('path');

module.exports = {
  entry: {
    main: [
      `${__dirname}/src/main.jsx`,
    ],
  },
  devtool: 'source-map',
  devServer: {
    contentBase: './public',
  },
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: '[name].[hash].bundle.js',
    sourceMapFilename: 'debugging/[file].[hash].map',
    chunkFilename: '[id].[hash].bundle.js',
    publicPath: '/assets/',
    pathinfo: true,
  },
  resolveLoader: {
    modules: ['node_modules'],
  },
  resolve: {
    modules: [
      'node_modules',
      path.resolve(__dirname, 'src'),
    ],
    extensions: ['.js', '.coffee', '.jsx', '.css'],
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'source-map-loader',
        enforce: 'pre',
      },
      {
        test: /\.jsx?$/,
        exclude: [path.resolve(__dirname, 'node_modules')],
        loader: 'babel-loader',
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                modules: true,
                importLoaders: 1,
                localIdentName: '[name]__[local]___[hash:base64:5]',
              },
            },
            {
              loader: 'postcss-loader',
              options: {
                plugins: () => [postCSSModValues],
              },
            },
          ],
        }),
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                modules: true,
                importLoaders: 1,
                localIdentName: '[name]__[local]___[hash:base64:5]',
              },
            },
            {
              loader: 'postcss-loader',
              options: {
                plugins: () => [postCSSModValues],
              },
            },
            'sass-loader',
          ],
        }),
      },
    ],
  },
  plugins: [
    // Run build in node's production environment to strip out test helpers from
    // build
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
      },
    }),
    new webpack.optimize.UglifyJsPlugin({
      test: /\.jsx?($|\?)/,
      compress: {
        warnings: false,
      },
    }),
    new ExtractTextPlugin({
      filename: '[name].[contenthash].css',
      allChunks: true,
    }),
    new HtmlWebpackPlugin({
      filename: '../index.html',
      template: 'src/index.html',
      inject: 'body',
    }),
  ],
};
