var unirest = require('unirest');
var config = require("../../../config.json");
var Cmds = [];

Cmds.hscard = {
    name: 'hscard',
    help: 'Search for a hearthstone card',
    timeout: 2,
    level: 0,
    fn: function(msg, suffix) {
        var url = "https://omgvamp-hearthstone-v1.p.mashape.com/cards/search/";
        unirest.get(url + suffix.split(" ")[0])
            .header('X-Mashape-Key', config.api_keys.mashape)
            .end(function(result) {
                    if (result.body.error == 404) {
                        msg.reply("No results :sob:");
                        return;
                    }
                    result.body.forEach(function(card) {
                        var msgArray = [];
                        if (card.imgGold) {
                            msgArray.push(card.imgGold);
                        } else if (card.img) {
                            msgArray.push(card.img);
                        }
                        
                        msgArray.push("**" + card.name + "**");
                        msgArray.push("Type: **" + card.type + "**");
                        msgArray.push("Set: **" + card.cardSet + "**");
                        
                        if (card.rarity) {
                            msgArray.push("Rarity: **" + card.rarity + "**");
                        }
                        
                        if (card.flavor) {
                            msgArray.push(card.flavor);
                        }
                        
                        msgArray.push('\n');
                        
                        msg.channel.sendMessage(msgArray.join('\n'))
                    }, this);
                    
            });
    }
}

exports.Commands = Cmds;
