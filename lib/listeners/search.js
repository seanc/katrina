'use strict';

const google = require('google');

module.exports = exports = {};

const questions = (function() {
  
  let methods = {};
  
  methods.search = function(response, convo) {
    google(response.text, (err, results) => {
      if(err) { 
        console.log(err);
        convo.say('Sorry, but an error occurred while attempting to execute your query.');
        return convo.next();
      }
      
      let links = '';
      
      for(let i = 0; i < results.links.length; i++) {
        let link = results.links[i];
        
        links += `${link.title} - ${link.href} \n\n`;
      }
      
      links = '```' + links + '```';
      
      let message = `Okay I found ${results.links.length} results on ${response.text}, here they are: \n ${links}`;

      convo.say(message);
      convo.next();
    });
  };
  
  methods.what = function(response, convo) {
    convo.ask('What would you like to know?', (response, convo) => {
      convo.say(`Okay searching for...${response.text}`);
      methods.search(response, convo);
      convo.next();  
    })
  };
  
  return methods;
  
}());

exports.command = (bot, message) => bot.startConversation(message, questions.what);;