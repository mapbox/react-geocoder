var xhr = require('xhr');

function search(endpoint, source, accessToken, proximity, query, callback) {
  var uri = endpoint + '/v4/geocode/' +
    source + '/' + encodeURIComponent(query) + '.json' +
    '?access_token=' + accessToken +
    (proximity ? '&proximity=' + proximity : '');
  xhr({
    uri: uri,
    json: true
  }, callback);
}

module.exports = search;
