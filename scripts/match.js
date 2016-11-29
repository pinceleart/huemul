// Description:
//   Haz match con fotos de Tinder
//
// Dependencies:
//   none
//
// Configuration:
//   None
//
// Commands:
//   hubot match male|female
//
// Author:
//   @jorgeepunan

var request = require('request');
var moment  = require('moment');
var url     = 'https://randomuser.me/api/?inc=picture,name,dob&noinfo&gender=';

function capitalize(string){
  return string[0].toUpperCase() + string.slice(1);
}

function age(dob) {
  return moment().diff(dob, 'years');
}

module.exports = function(robot) {

  robot.respond(/match\s?(.*)/i, function(res) {

    var sexo    = res.match[1];
    if( sexo.match(/male|female/) ) {

      var fullURL = url + sexo;

      request(fullURL, function (error, response, body) {

        if (!error && response.statusCode == 200) {

          var data = JSON.parse(body);

          res.send('¿Match con ' + capitalize(data.results[0].name.first) + ' (' + age(data.results[0].dob) + ') ? :point_down: ' + data.results[0].picture.large);

        } else {
          res.send(':facepalm: Error: ', error);
        }

      });
    } else {
      res.send('Debes elegir un género para hacer match: male | female');
    }
  });

};