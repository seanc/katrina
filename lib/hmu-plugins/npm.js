var Promise = require('bluebird');
var request = require('request');
var routine = require('promise-routine');

module.exports = function slack(out, input) {
  var getStatus = function(pkg) {
    return new Promise(function(resolve) {
      request('https://npmjs.com/package/' + pkg, function(err, res) {
        if (err) {
          out.push([pkg, false]);
        }
        out.push([pkg, (res.statusCode === 404)]);
        resolve(out);
      });
    });
  };

  return routine(getStatus, input);
};
