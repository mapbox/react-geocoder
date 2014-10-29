var xhr = require('xhr');

function search(endpoint, source, accessToken, query, callback) {
  var uri = endpoint + '/v4/geocode/' +
    source + '/' + encodeURIComponent(query) + '.json' +
    '?access_token=' + accessToken;
  xhr({
    uri: uri,
    json: true
  }, callback);
}

module.exports = search;
