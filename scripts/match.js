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

const request = require('request');
const url     = 'https://randomuser.me/api/?inc=picture&noinfo&gender=';
const apikey  = '';

module.exports = function(robot) {

  robot.respond(/match\s?(.*)/i, function(res) {

    let sexo    = res.match[1];
    if( sexo.match(/male|female/) ) {

      const fullURL = url + sexo;

      request(fullURL, function (error, response, body) {

        if (!error && response.statusCode == 200) {

          let data = JSON.parse(body);
          res.send( `¿Match? :point_down: ${data.results[0].picture.large} `);

        } else {
          res.send(':facepalm: Error: ', error);
        }

      });
    } else {
      res.send('Debes elegir un género para hacer match: male | female');
    }
  });

};