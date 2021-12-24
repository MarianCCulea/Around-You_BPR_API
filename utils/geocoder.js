const NodeGeocoder = require('node-geocoder');

const options = {
  provider: 'mapquest',
  apiKey: 'JS7J6ydOXEOdUCdR5nZA3sH0Gda6JlmO',
  formatter: null
};

const geocoder = NodeGeocoder(options);

module.exports = geocoder;