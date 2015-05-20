var xhr = require('xhr');

function search(endpoint, source, accessToken, proximity, query, callback) {
  var searchTime = new Date();
  var uri = endpoint + '/v4/geocode/' +
    source + '/' + encodeURIComponent(query) + '.json' +
    '?access_token=' + accessToken +
    (proximity ? '&proximity=' + proximity : '');
  xhr({
    uri: uri,
    json: true
  }, function(err, res, body) {
    callback(err, res, body, searchTime);
  });
}

module.exports = search;
