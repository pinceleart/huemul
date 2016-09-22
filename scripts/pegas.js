// Description:
//   Busca pegas recientes en GetOnBrd
//
//  Dependencies:
//    cheerio
//
// Commands:
//   hubot pega|trabajo <oficio>
//
// Author:
//   @jorgeepunan

var cheerio = require('cheerio');

module.exports = function(robot) {

  robot.respond(/(pega|trabajo) (.*)/i, function(msg) {

    msg.send('Buscando en GetOnBrd... :dev:');

    var busqueda = msg.match[2];
    var domain = 'https://www.getonbrd.cl/empleos-';
    var url = domain + busqueda.split(' ').join('%20');

    console.log('busqueda: ' + busqueda);
    console.log('url: ' + url);

    msg.robot.http(url).get()(function(err, res, body) {

      var $ = cheerio.load(body);
      var resultados = [];

      $('.job-list .job').each(function() {
        var title = $(this).find('a').attr('title');
        var link = $(this).find('a').attr('href');

        resultados.push( title + ' | ' + link );
      });

      if(resultados.length > 0) {
        msg.send('(es lento, culpa de ellos)');
        var limiteResultados = (resultados.length > 4) ? 3 : resultados.length;
        var plural = resultados.length > 1 ? ['n','s'] : ['',''];
        var text = 'Se ha'+plural[0]+' encontrado '+ resultados.length + ' resultado'+plural[1] + '\n';
        for (var i=0; i < limiteResultados; i++) {
          var conteo = i + 1;
          text += conteo + ': ' + resultados[i] + '\n';
        }
        if(resultados.length > limiteResultados) {
          text += 'Otros resultados en: <'+ url + '|getonbrd>\n';
        }
        msg.send(text);
      } else {
        console.log('no hay')
        msg.send('No se han encontrado resultados sobre '+ busqueda);
      }

    });

  });

};
