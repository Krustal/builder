const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const postCSSModValues = require('postcss-modules-values');
const path = require('path');

module.exports = {
  entry: {
    main: [
      'react-hot-loader/patch',
      // 'webpack/hot/dev-server',
      'webpack-hot-middleware/client',
      `${__dirname}/src/main.jsx`,
    ],
  },
  devtool: 'eval-source-map',
  devServer: {
    contentBase: path.join(__dirname, 'public'),
  },
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: '[name].bundle.js',
    sourceMapFilename: 'debugging/[file].map',
    // TODO: I'd like to bring this back at some point to have better
    // consistency between prod and dev builds.
    // publicPath: '/assets/',
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
        use: [
          'style-loader',
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
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader',
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
      },
    ],
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'src/index.html',
      inject: 'body',
    }),
  ],
};
