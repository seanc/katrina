// var hmu = require('hmu');
// var minimist = require('minimist');
// var list = require('cli-list');
// var intercept = require('intercept-stdout');

// module.exports = function(bot, message) {
//   var args = message.text.split(' ').slice(1);
//   var opts = {boolean: false};
//   var cli = list(args).map(function(set) {
//     return minimist(set, opts);
//   });
//   var stdout = '';

//   var unhook = intercept(function(_stdout) {
//     stdout += _stdout;
//   });

//   console.log('hi');

//   var plugins = cli;

//   plugins = plugins.map(function(set) {
//     return {
//       name: set._[0],
//       args: set._.slice(1),
//       opts: set
//     };
//   });

//   hmu(plugins, ['/home/sean/.npm-global/lib/node_modules']).then(function() {
//     unhook();
//     console.log(stdout);
//   });
// };

