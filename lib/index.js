'use strict';

module.exports = exports = {};

let bot = null,
    listeners = [],
    commands = [],
    config = require('../config.js');

exports.setBot = function(_bot) {
  bot = _bot;
  bot.config = config;
};


exports.registerListener = function(listener) {
  listeners.push(listener);
  require(`../listeners/${listener}`)(bot);
};

exports.registerCommand = function(command) {
  commands.push(require(`../commands/${command}`));
};

exports.getCommands = function() {
  return commands;
}
