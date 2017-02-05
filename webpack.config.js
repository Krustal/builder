const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const postCSSModValues = require('postcss-modules-values');

module.exports = {
  entry: {
    main: [
      'webpack/hot/dev-server',
      'webpack-hot-middleware/client',
      `${__dirname}/src/main.jsx`,
    ],
  },
  devtool: '#eval-source-map',
  devServer: {
    contentBase: './public',
  },
  debug: true,
  output: {
    path: `${__dirname}/public/`,
    filename: '[name].bundle.js',
    sourceMapFilename: 'debugging/[file].map',
    // TODO: I'd like to bring this back at some point to have better
    // consistency between prod and dev builds.
    // publicPath: '/assets/',
    pathinfo: true,
  },
  resolveLoader: {
    moduleDirectories: ['node_modules'],
  },
  resolve: {
    root: [`${__dirname}/src/`],
    extensions: ['', '.js', '.coffee', '.jsx', '.css'],
  },
  module: {
    preloaders: [
      { test: /\.js$/, loader: 'source-map' },
    ],
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loaders: ['react-hot', 'babel'],
      },
      {
        test: /\.css$/,
        loader: 'style!css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!postcss',
      },
      {
        test: /\.scss$/,
        loader: 'style!css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!postcss!sass-loader',
      },
    ],
  },
  postcss() {
    // eslint-disable-next-line global-require
    return [postCSSModValues];
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
