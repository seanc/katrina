var Promise = require('bluebird');
var request = require('request');
var routine = require('promise-routine');

module.exports = function gh(out, input) {
  var getStatus = function(user) {
    return new Promise(function(resolve) {
      request({
        url: 'https://api.github.com/users/' + user,
        headers: {
          'User-Agent': 'katrina bot - hmu'
        }
      }, function(err, res) {
        if (err) {
          out.push([user, false]);
        }
        out.push([user, (res.statusCode === 404)]);
        resolve(out);
      });
    });
  };

  return routine(getStatus, input);
};
