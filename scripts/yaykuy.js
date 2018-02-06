// Description:
//   Displays value of BTC in CLP from Yaykuy.cl
//
// Dependencies:
//   numberToCLPFormater
//   request
//
// Configuration:
//   None
//
// Commands:
//   hubot yaykuy
//
// Author:
//   @hectorpalmatellez

const CLP = require('numbertoclpformater').numberToCLPFormater
const request = require('request')

module.exports = function(robot) {
  robot.respond(/yaykuy\s?(.*)/i, function(msg) {
    const options = {
      url: 'https://www.yaykuy.cl/get-exchange-values',
      headers: {
        'X-Requested-With': 'XMLHttpRequest'
      }
    }

    request(options, (error, response, body) => {
      if (!error && response.statusCode == 200) {
        const values = JSON.parse(body)

        msg.send(
          `Valores de BTC en yaykuy.cl:\n Venta: ${CLP(values.sell, 'CLP ', false)}\n Compra: ${CLP(
            values.buy,
            'CLP ',
            false
          )}`
        )
      }
    })
  })
}
