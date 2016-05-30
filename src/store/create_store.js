if (process.env.NODE_ENV === 'production') {
  module.exports = require('./create_store.prod.js');
} else {
  module.exports = require('./create_store.dev.js');
}
