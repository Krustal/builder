const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const historyApiFallback = require('connect-history-api-fallback');
const browserSync = require('browser-sync');
const webpackConfig = require('./webpack.config');

const bundler = webpack(webpackConfig);
const server = browserSync.create();

server.init({
  server: {
    baseDir: './public/',
    middleware: [
      webpackDevMiddleware(bundler, {
        publicPath: webpackConfig.output.publicPath,
        noInfo: false,
        quiet: false,
        stats: {
          colors: true,
        },
      }),
      webpackHotMiddleware(bundler),
      historyApiFallback(),
    ],
  },
});
