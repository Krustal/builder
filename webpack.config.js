var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    main: [
      "webpack/hot/dev-server",
      "webpack-hot-middleware/client",
      __dirname + "/src/main.js"
    ]
  },
  devtool: '#eval-source-map',
  devServer: {
    contentBase: './public'
  },
  debug: true,
  output: {
    path: __dirname + "/public/assets",
    filename: "[name].bundle.js",
    sourceMapFilename: "debugging/[file].map",
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
      { test: /\.jsx?$/, exclude: /(node_modules|bower_components)/, loaders: ['react-hot', 'babel'] },
      { test: /\.css$/, loader: "style!css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]" },
      { test: /\.scss$/, loader: 'style!css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!sass-loader' }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ]
};
