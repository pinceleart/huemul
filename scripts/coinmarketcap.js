// Description:
//   Displays value of crypto currency from Coinmarketcap
//
// Dependencies:
//   None
//
// Configuration:
//   None
//
// Commands:
//   hubot cmc [cryptcurrency name]
//   hubot coinmarketcap [cryptcurrency name]
//
// Author:
//   @hectorpalmatellez

module.exports = function(robot) {
  robot.respond(/(cmc|coinmarketcap) (.*)/i, function(msg) {
    const currency = msg.match[2];
    const url = `https://api.coinmarketcap.com/v1/ticker/${currency}/?convert=CLP`;

    robot.http(url).get()(function(err, res, body) {
      if (robot.golden.isGold(msg.message.user.name)) {
        if (err || res.statusCode !== 200) {
          msg.send('😢');
          return robot.emit('error', err || new Error(`Status code ${res.statusCode}`), msg)
        }
        if (body.indexOf('<') > -1) {
          msg.send('Intenta con otra criptomoneda');
        } else {
          res.setEncoding('utf-8');
          const data = JSON.parse(body);
          if (data) {
            return (() => {
              const priceCLP = Math.floor(data[0].price_clp * 100) / 100;
              msg.send(`El precio de ${currency} en CLP es ${priceCLP}.`);
            })();
          } else {
            msg.send('ERROR');
          }
        }
      } else {
        msg.send('Esta funcionalidad es exclusiva para socios golden :monea: de devsChile. Dona en www.devschile.cl para unirte y utilizarla.')
      }
    });
  });
};
