'use strict';

class Command {
  constructor(help, desc, names) {
    if(new.target === Command) {
      throw new TypeError('Cannot construct abstract instances directly!');
    }
    if(typeof this.onCommand === 'undefined') {
      throw new TypeError('You must override the on command method');
    }
    this.help = help;
    this.desc = desc;
    this.names = names;
  }

  getHelp() { return this.help; }
  getDesc() { return this.desc; }
  getNames() { return this.names; }

}

module.exports = Command;
