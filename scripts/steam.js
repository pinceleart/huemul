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

      let $ = cheerio.load(body);
      let idAttr = $('.dailydeal_desc .dailydeal_countdown').attr('id');
      let id = idAttr.substr(idAttr.length - 6);
      let url = `http://store.steampowered.com/api/appdetails/?appids=${id}`;
      let cookie = 'steamCountry=CL%7Cb8a8a3da46a6c324d177af2855ca3d9b;timezoneOffset=-10800,0;';

      robot.http(url).header("cookie", cookie).get()(function(err, res, body) {

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