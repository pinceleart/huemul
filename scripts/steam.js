// Description:
//   Get the current steam daily deal.
//

// Dependencies:
//   "cheerio": "latest"
//   "got": "latest"
//   "sanitize-html": "latest"
//

// Commands:
//   huemul steam daily - Show the current steam daily deal.
//
// Author:
//   @chrisdelcaos

'use strict';

const cheerio = require('cheerio');
const got = require('got');
const sanitize = require('sanitize-html');

module.exports = (robot) => {

  robot.respond(/steam (.*)/i, (msg) => {
    var args = msg.match[1];

    got('http://store.steampowered.com').then((res) => {
      var body = res.body;
      if (res.statusCode !== 200) return msg.send('Actualmente Steam no responde!');

      let $ = cheerio.load(body);
      let idAttr = $('.dailydeal_desc .dailydeal_countdown').attr('id');
      let id = idAttr.substr(idAttr.length - 6);
      let url = `http://store.steampowered.com/api/appdetails/?appids=${id}`;

      got(url, { json: true }).then((res) => {
        let game = res.body[id].data;
        let name = game.name;
        let price = game.price_overview;
        let final = price.final / 100;
        let initial = price.initial / 100;
        let discount = price.discount_percent;

         if (args === 'daily') {
            msg.send(`https://store.steampowered.com/app/${id}`);
            msg.send(`Oferta del dia: ${name}, a solo $CLP ${final}. Valor original $CLP ${initial}, eso es un -${discount}%!`);
        }

      });
    });
  });
};