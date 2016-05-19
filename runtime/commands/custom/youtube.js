var util = require('util');
var winston = require('winston');
var YouTube = require('youtube-node');
var ConfigFile = require("../../../config.json");
var voice = require("../../internal/voice.js");

var youtube = new YouTube();

youtube.setKey(ConfigFile.api_keys.google);

var Cmds = [];

Cmds.youtube = {
    name: 'youtube',
    help: 'Search for a youtube video',
    timeout: 2,
    level: 0,
    fn: function(msg, suffix) {
        if(suffix.trim().length == 0) {
            msg.reply("Give me something to search nerd! (╯°□°）╯︵ ┻━┻");
            return;
        }
        youtube.addParam('type', 'video');
        youtube.search(suffix, 1, function(error, result) {
            if (error) {
                //winston.error("Error querying youtube: " + error);
                msg.reply(channel, "Error querying YouTube! (╯°□°）╯︵ ┻━┻");
            } else {
                if (!result || !result.items || result.items.length < 1) {
                    //winston.error("No results from youtube");
                    msg.reply("No results! (╯°□°）╯︵ ┻━┻");
                } else {
                    msg.reply("http://www.youtube.com/watch?v=" + result.items[0].id.videoId);
                }
            }
        });
    }   
}

Cmds.youtubereq = {
    name: 'youtubereq',
    help: 'Search for a youtube video and request it',
    timeout: 5,
    level: 0,
    fn: function(msg, suffix, bot) {
        if(suffix.trim().length == 0) {
            msg.reply("Give me something to search nerd! (╯°□°）╯︵ ┻━┻");
            return;
        }
        youtube.addParam('type', 'video');
        youtube.search(suffix, 1, function(error, result) {
            if (error) {
                //winston.error("Error querying youtube: " + error);
                msg.reply(channel, "Error querying YouTube! (╯°□°）╯︵ ┻━┻");
            } else {
                if (!result || !result.items || result.items.length < 1) {
                    //winston.error("No results from youtube");
                    msg.reply("No results! (╯°□°）╯︵ ┻━┻");
                } else {
                    var videoUrl = "http://www.youtube.com/watch?v=" + result.items[0].id.videoId;
                    voice.request(msg, videoUrl, bot);
                }
            }
        });
    }
}

exports.Commands = Cmds;