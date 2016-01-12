'use strict';

const Command = require('../lib/command.js'),
  rp = require('request-promise');

class LookupCommand extends Command {
  constructor(bot) {
    super('', 'Lookup a symbol in OneLang dictionary', ['lookup']);
    this.bot = bot;
  }
  onCommand(channel, message, sender, args) {
    if(args.length === 0) {
      this.bot.sendMsg(channel, this.getHelp());
    }
    if(args.length > 0) {
      rp(this.bot.config.oneDb)
        .then(body => {
          body = JSON.parse(body);
          for(let i = 0; i < args.length; i++) {
            let arg = args[i].trim().toLowerCase();
            if(body.hasOwnProperty(arg)) {
              let translation = body[arg].join(', ');
              this.bot.sendMsg(channel, `*${arg}* translates to: ${translation}`);
            } else {
              for(let sym in body) {
                if(body[sym].indexOf(arg) > -1) {
                  let translation = sym;
                  this.bot.sendMsg(channel, `*${arg}* translates to: ${translation}`);
                  return;
                }
              }
              this.bot.sendMsg(channel, `Could not define: ${arg}`);
            }
          }
        })
        .catch(err => {
          console.log(err);
          this.bot.sendMsg(channel, 'An error occurred while attempting to retrieve OneLang data.');
        });
    }
  }
}

module.exports = LookupCommand;
