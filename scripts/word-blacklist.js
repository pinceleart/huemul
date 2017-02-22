// Description:
//   Word blacklist for all hubot commands
//
// Configuration:
//   HUBOT_BANNED_WORDS = Words to be banned separated by commas (@here,@everywhere)
//
// Author:
//   @gmq

module.exports = function(robot) {
  return robot.listenerMiddleware((context, next, done) => {
    if (!isUserPunished(context.response.message.user)) {
      const command = context.response.message.text
      let forbiddenWords = process.env.HUBOT_BANNED_WORDS || '';
      forbiddenWords = forbiddenWords.split(',')

      for (let i = 0; i < forbiddenWords.length; i++) {
        if (command.indexOf(forbiddenWords[i]) !== -1) {
          punishUser(context.response.message.user)
          return robot.messageRoom('#random', `${context.response.message.user.name} me quiso maltratar. No lo voy a pescar por 5 minutos.`);
        }
      }
      next();
    }

    function isUserPunished(user) {
      robot.brain.hubotTimeouts = robot.brain.hubotTimeouts || {};
      if (robot.brain.hubotTimeouts[user.id]) {
        let oldDate = robot.brain.hubotTimeouts[user.id];
        let timePast = Math.round((new Date().getTime() - oldDate.getTime())) / 60000
        if (timePast > 5) {
          robot.brain.hubotTimeouts[user.id] = undefined;
          robot.brain.save();
        }
      }

      return robot.brain.hubotTimeouts[user.id];
    }

    function punishUser(user) {
      robot.brain.hubotTimeouts = robot.brain.hubotTimeouts || {};
      robot.brain.hubotTimeouts[user.id] = new Date();
      robot.brain.save();
    }
  });
}