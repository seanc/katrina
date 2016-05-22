var Promise = require('bluebird');
var request = require('request');
var routine = require('promise-routine');

module.exports = function slack(out, input) {
  var getStatus = function(team) {
    return new Promise(function(resolve) {
      request('https://' + team + '.slack.com', function(err, res) {
        if (err) {
          out.push([team, false]);
        }
        out.push([team, (res.statusCode === 404)]);
        resolve(out);
      });
    });
  };

  return routine(getStatus, input);
};
