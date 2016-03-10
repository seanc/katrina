'use strict';

const Command = require('../lib/command'),
      low = require('lowdb'),
      storage = require('lowdb/file-sync'),
      table = require('text-table');
     
class MStat extends Command {
 
  constructor(bot) {
    super('', 'View message stats', ['mstats']);
    this.bot = bot;
  }
  
  onCommand(channel, message, sender, args) {
    let db = low('./database/db.json', {storage});
    if(args.length == 0) {
      let users = db('users')
            .chain()
            .sortBy('user.count')
            .value()
            .reverse()
            .slice(0, 5),
        talkers = null,
        board = '',
        leaders = [];

      users.forEach((user) => {
        leaders.push([user.user.username, user.user.count + ' messages']);
      });
      
      talkers = table(leaders);
      
      board = "Top 5 Talkers: \n" + talkers;
      
      this.bot.sendMsg(channel, board);
    }
    
    if(args.length > 0) {
      let user = db('users').find({
        user: {
          username: args[0]
        }
      });
      
      if(typeof user === 'undefined') {
        return this.bot.sendMsg(channel, 'User not found');
      }
      
      let message = `User ${user.user.username} has ${user.user.count} messages`;
      this.bot.sendMsg(channel, message);
    }
  }
  
}

module.exports = MStat;