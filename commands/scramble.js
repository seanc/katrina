'use strict';

const Command = require('../lib/command.js');

let running = false,
  fs = require('fs'),
  path = require('path');

let words = fs.readFileSync(path.join(__dirname, '../words.txt'), 'utf8').split('\n'),
    original = null;
class ScrambleCommand extends Command {
  constructor(bot) {
    super('', 'Word unscrambler game', ['scramble']);
    this.bot = bot;
  }
  onCommand(channel, message, sender, args) {
    if(args.length === 0) {
      let word = (function() {
        let word = words[Math.floor(Math.random() * words.length)].split('');
        original = word.join('');
        for(let i = 0; i < word.length; i++) {
          let char = Math.floor(Math.random() * (i + 1)),
              temp = word[i];
              word[i] = word[char];
              word[char] = temp;
        }
        return word.join('');
      }());
      this.bot.sendMsg(channel, `The word is: *${word}*`);
      setTimeout(function() {
        this.bot.sendMsg(channel, `No one guessed the word, the word was: *${original}*`);
        original = null;
      }.bind(this), 25000);
    }
    if(args.length > 0) {
      let word = args.join(' ').trim().toLowerCase();
      if(original === null) {
        this.bot.sendMsg(channel, 'A word has not been chosen yet! Type !scramble to get started.');
      }
      if(original === word) {
        this.bot.sendMsg(channel, '*'+ sender.name +'* Guessed the word: ' + original);
      }
    }
  }
}

module.exports = ScrambleCommand;
