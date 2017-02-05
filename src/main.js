if (process.env.NODE_ENV === 'production') {
  // eslint-disable-next-line global-require
  module.exports = require('./main.prod');
} else {
  // eslint-disable-next-line global-require
  module.exports = require('./main.dev');
}
