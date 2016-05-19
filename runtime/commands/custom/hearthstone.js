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
                    if (result.body.length <= 0) {
                        msg.reply("No results :sob:");
                        return;
                    }
                    var card = result.body[0];
                    if (card.imgGold) {
                        msg.channel.sendMessage(card.imgGold);
                    } else {
                        msg.channel.sendMessage(card.img);
                    }
                    
                    msg.channel.sendMessage("Rarity: **" + card.rarity + "**");
                    msg.channel.sendMessage(card.flavor);
            });
    }
}

exports.Commands = Cmds;
