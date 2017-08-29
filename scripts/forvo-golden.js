// Description:
//   Hubot script exclusivo para usuarios devsChile golden :monea: que busca cómo se pronuncia palabras en es_ES en Forvo.com
//
//  Dependencies:
//    cheerio
//
// Commands:
//   hubot pronuncia <palabra>
//
// Author:
//   @jorgeepunan

var cheerio = require('cheerio');

module.exports = function(robot) {

  robot.respond(/pronuncia(.*)/i, function(msg) {

    if (robot.golden.isGold(msg.message.user.name)) {

      const baseURL   = 'https://forvo.com/search/';
      const palabra   = msg.match[1].split(' ')[1];
      const url       = `${baseURL}${palabra}/es/`;

      msg.send('Buscando pronunciación a *' + palabra + '*... :loading:');

      robot.http(url).get()(function(err, res, body) {

        const $           = cheerio.load(body);
        const title       = $('.title_holder h1');
        const results     = $('.title_holder .more');
        const resultQty   = results.text().split(' ')[0];
        let resultados    = [];

        if (resultQty > 0) {

          $('.search_words ul li.list-words ul li').each(function() {
            const resultWrd = $(this).find('.word').text();
            const link      = $(this).find('.word').attr('href');

            resultados.push(`<${link}|${resultWrd}>`);
          });

          const limiteResultados = (resultados.length > 10) ? 5 : resultados.length;
          const plural = resultados.length > 1 ? ['s','s'] : ['',''];
          const resume = 'Encontrado' + plural[0] + ' '+ resultQty + ' resultado' + plural[1] + ':';
          const links = resultados.slice(0, limiteResultados).map((result, index) => `${index + 1}: ${result}`).join('\n');
          const more = resultados.length > limiteResultados ? `\n<${url}|Ver más resultados>` : '';
          const text = `${resume}\n${links}${more}`;

          msg.send(text);

        } else {
          msg.send('No se han encontrado resultados. Por favor intenta con una nueva palabra/concepto/término.');
        }

      });

    } else {
      msg.send('Esta funcionalidad es exclusiva para socios golden :monea: de devsChile. Dona en www.devschile.cl para unirte y utilizarla.')
    }
  });

};
