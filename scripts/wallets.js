// Description:
//   Display :huemul: addresses to receive crypto currencies as donation
//
// Dependencies:
//   none
//
// Configuration:
//   WALLET_BTC
//   WALLET_ETH
//
// Commands:
//   hubot wallet [currency]
//
// Author:
//   @hectorpalmatellez

module.exports = function(robot) {

  const WALLET_BTC = process.env.WALLET_BTC;
  const WALLET_ETH = process.env.WALLET_ETH;

  robot.respond(/wallet (.*)/i, function(msg) {
    const currency = msg.match[1].toLowerCase();

    if (currency === 'btc' || currency === 'bitcoin') {
      msg.send(`La wallet de Bitcoin es ${WALLET_BTC}`);
    } else if (currency === 'eth' || currency === 'ethereum') {
      msg.send(`La wallet de Ethereum es ${WALLET_ETH}`);
    } else if (currency === 'help') {
      msg.send(`Por ahora solo tengo 👜 de ETH y BTC, se utiliza así: \`huemul wallet btc\``);
    }
  });
};
