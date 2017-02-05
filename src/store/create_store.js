if (process.env.NODE_ENV === 'production') {
  // eslint-disable-next-line global-require
  module.exports = require('./create_store.prod.js');
} else {
  // eslint-disable-next-line global-require
  module.exports = require('./create_store.dev.js');
}
