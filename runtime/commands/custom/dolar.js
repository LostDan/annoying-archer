var request = require('request');
var Cmds = [];

var url = "https://s3.amazonaws.com/dolartoday/data.json";
var timeOutInMil = 10 * 1000;

var opts = {
    url: url,
    timeout: timeOutInMil
};

Cmds.dolartoday = {
    name: 'dolartoday',
    help: 'Viva belzebu',
    timeout: 2,
    level: 0,
    fn: function(msg, suffix) {
        request(opts, function(err, res, body) {
            var response = JSON.parse(body);
            if (err) {
                return;
            }
            var msgBody = "Transferencia: **" + response.USD.transferencia + "**";
            msg.channel.sendMessage(msgBody);
        });
    }
}

exports.Commands = Cmds;