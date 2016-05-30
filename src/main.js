if (process.env.NODE_ENV === 'production') {
  module.exports = require('./main.prod.js');
} else {
  module.exports = require('./main.dev.js');
}
