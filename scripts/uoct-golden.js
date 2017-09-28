// Description:
//   Hubot script exclusivo para usuarios devsChile golden :monea: que muestra problemas de tránsito en Santiago (por ahora), Chile.
//
//  Dependencies:
//    cheerio
//
// Commands:
//   huemul uoct|taco|tr(aá)nsito
//
// Author:
//   @jorgeepunan

const cheerio = require('cheerio');

module.exports = function (robot) {

  robot.respond(/uoct|taco|tr(aá)nsito/i, function (msg) {

    if (robot.golden.isGold(msg.message.user.name)) {

      const url   = 'http://www.uoct.cl/';

      msg.send(`Buscando qué cagá está en esta ciudad :ql:   :walking: :boom: :car: :boom: :blue_car: :boom: :red_car: :boom:          :police_car:`);

      robot.http(url).get()(function (err, res, body) {

        const $           = cheerio.load(body);
        const title       = 'Estado del tránsito';
        const results     = $('.map-events-container .map-events .event');
        const resultQty   = results.length;
        let resultados    = [];

        if (resultQty > 0) {

          results.each(function () {
            const time = $(this).find('.time').text();
            const link = $(this).attr('href');
            const text = $(this).find('.caption').text();

            resultados.push(`<${link}|${time}: ${text}>`);
          });

          const limite  = (resultados.length > 10) ? 8 : resultados.length;
          const plural  = resultados.length > 1 ? ['s','s'] : ['',''];
          const resume  = 'Encontrado' + plural[0] + ' '+ resultQty + ' resultado' + plural[1] + ' :bomb::fire:';
          const links   = resultados.slice(0, limite).map((result, index) => `${index + 1}: ${result}`).join('\n');
          const more    = resultados.length > limite ? `\n<${url}|Ver más resultados>` : '';
          const text    = `${resume}\n${links}${more}`;

          msg.send(text);

        } else {
          msg.send('Qué raro, parece que está todo normal :thinking_bachelet: . Intenta más tarde.');
        }

      });

    } else {
      msg.send('Esta funcionalidad es exclusiva para socios golden :monea: de devsChile. Dona en www.devschile.cl para participar de este selecto grupo :huemul-patitas: .')
    }
  });

};
