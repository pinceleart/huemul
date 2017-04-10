// Description:
//  Noticias desde 24horas
//
// Dependencies:
//  moment
//
// Commands:
//  hubot noticias internacional
//  hubot noticias nacional
//  hubot noticias de perros
//
// Author:
//  @jlobitu

const moment = require('moment');

module.exports = robot => robot.respond(/noticias (.*)/i, msg => {
  const q = msg.match[1];
  const fetch = msg.robot.http(`http://search.24horas.cl/search/?q=${q}`);

  fetch.get()((err, res, body) => {
    if (err) {
      robot.emit('error', err);
    } else {
      const {matches} = JSON.parse(body);
      // Truncate array
      (matches.length >= 9) && (matches.length = 9);

      const out = matches.map(({fields}) => {
        const {value: date} = fields.find(({field}) => field === 'publishtime');
        const {value: title} = fields.find(({field}) => field === 'og-title');
        const {value: url} = fields.find(({field}) => field === 'og-url');

        return `<${url}|${title}> (${moment(date).fromNow()})`;
      }).join('\n');

      msg.send(out || `No se han encontrado noticas sobre *${q}*.`);
    }
  });
});
