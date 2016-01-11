'use strict';

const Command = require('../lib/command.js');

class TestCommand extends Command {
  constructor(bot) {
    super('[something] [something 1]', 'This does something', ['test']);
    this.bot = bot;
  }
  onCommand(channel, message, sender, args) {
    this.bot.sendMsg(channel, 'hi');
    if(args.length > 0) {
      if(args[0] === 'sean') {
        this.bot.sendMsg(channel, 'Args work too!');
      }
    }
  }
}

module.exports = TestCommand;
