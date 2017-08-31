// Description:
//   Get the current steam daily deal.
//

// Dependencies:
//   "cheerio": "latest"
//

// Commands:
//   huemul steam daily - Show the current steam daily deal.
//
// Author:
//   @chrisdelcaos

'use strict';

const cheerio = require('cheerio');

module.exports = (robot) => {

  robot.respond(/steam(.*)/i, (msg) => {
    const args = msg.match[1].split(' ')[1];

    if (args === 'daily') {

      robot.http('http://store.steampowered.com').get()(function(err, res, body) {
        if (err || res.statusCode !== 200) {
          msg.send('Actualmente _Steam_ no responde.');
          return robot.emit('error', err || new Error(`Status code ${res.statusCode}`), msg)
        }

        const $ = cheerio.load(body);
        const idAttr = $('.dailydeal_desc .dailydeal_countdown').attr('id');
        const id = idAttr.substr(idAttr.length - 6);
        const url = `http://store.steampowered.com/api/appdetails/?appids=${id}`;

        robot.http(url).get()(function(err, res, body) {
          if (err || res.statusCode !== 200) {
            msg.send('Actualmente Steam no responde!');
            return robot.emit('error', err || new Error(`Status code ${res.statusCode}`), msg)
          }

          const game = JSON.parse(body)[id].data;
          const name = game.name;
          const price = game.price_overview;
          const final = price.final / 100;
          const initial = price.initial / 100;
          const discount = price.discount_percent;

          msg.send(`Oferta del día: ${name}, a sólo $CLP ${final}. Valor original $CLP ${initial}, eso es un -${discount}%! https://store.steampowered.com/app/${id}`);

        });
      });

    } else {
      msg.send(`Para obtener la oferta del día en _Steam_ debes usar el comando: *huemul steam daily*`)
    }
  });
};
