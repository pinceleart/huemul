// Description:
//   Get a torrent link from torrentproject.se
//
//  Dependencies:
//    cheerio
//
// Commands:
//   hubot torrent <query>
//
// Author:
//   @jorgeepunan

var cheerio = require('cheerio');

module.exports = function(robot) {
  var sendAttachment = function(attachments, res) {
    var data = {attachments: attachments, channel: res.message.room};
    robot.emit("slack.attachment", data);
  }

  robot.respond(/torrent (.*)/i, function(msg) {

    msg.send('Esperando respuesta de Torrent Project... :clock930:');

    var busqueda = msg.match[1];
    var url = 'https://torrentproject.se/?t=' + busqueda.split(' ').join('+');

    msg.robot.http(url).get()(function(err, res, body) {

      var $ = cheerio.load(body);
      var resultados = [];

      $('#similarfiles > div:not(.gac_bb)').each(function() {
        var title = $(this).find('a').text();
        var link = $(this).find('a').attr('href');

        resultados.push( '<' + link + '|' + title + '>' );
      });

      if(resultados.length > 0) {
        var limiteResultados = (resultados.length > 4) ? 3 : resultados.length;
        var plural = resultados.length > 1 ? ['n','s'] : ['',''];
        var text = 'Se ha'+plural[0]+' encontrado '+ resultados.length + ' resultado'+plural[1] + '\n';
        for (var i=0; i < limiteResultados; i++) {
          var conteo = i + 1;
          text += conteo + ': ' + resultados[i] + '\n';
        }
        if(resultados.length > limiteResultados) {
          text += 'Otros resultados en: <'+ url + '|torrentproject>\n';
        }
        var attachments = {fallback: text, text: text};
        sendAttachment(attachments, msg);
      } else {
        msg.send('No se han encontrado resultados sobre '+ busqueda);
      }

    });

  });
};
