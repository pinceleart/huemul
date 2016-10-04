// Description:
//   TODO
//
// Dependencies:
//   moment-business-days
//
// Configuration:
//   None
//
// Commands:
//   hubot gardel
//
// Author:
//   @hectorpalmatellez

var moment = require('moment-business-days');

module.exports = function gardel(robot) {
  'use strict';

  var today = moment().format('D');
  var lastBusinessDay = moment().endOf('month').isBusinessDay() ? moment().endOf('month').format('D') : moment().endOf('month').prevBusinessDay().format('D');
  var nameLastDay = moment().locale('es').endOf('month').isBusinessDay() ? moment().locale('es').endOf('month').format('dddd') : moment().locale('es').endOf('month').prevBusinessDay().format('dddd');
  var dayCount = lastBusinessDay - today;

  robot.respond(/gardel|cu[aá]ndo pagan/, function(msg) {
    var message = '';
    var plural = dayCount > 1 ? ['n','s'] : ['',''];
    if (dayCount === 0) {
      message = `:tada: Hoy pagan :tada:`;
    } else {
      message = `Falta${plural[0]} ${dayCount} día${plural[1]} para que paguen. Este mes pagan el ${lastBusinessDay}, que cae ${nameLastDay} :tired_face:`;
    }
    return msg.send(message);
  });
};
