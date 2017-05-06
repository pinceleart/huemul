// Description:
//   A simple karma tracking script for hubot.
//
// Commands:
//   karma <name> - shows karma for the named user
//
// Notes
//   <name>++ - adds karma to a user
//   <name>-- - removes karma from a user
//   Adaptado por @clsource Camilo Castro
//   Basado en
//   https://www.npmjs.com/package/hubot-karma
//
// Author
//   @clsource

module.exports = robot => {
  const hubotHost = process.env.HEROKU_URL || process.env.HUBOT_URL || 'http://localhost:8080'
  const hubotWebSite = `${hubotHost}/${robot.name}`

  const getCleanName = name => `${name[0]}.${name.substr(1)}`

  const userForMentionName = mentionName => {
    const users = robot.brain.users()
    return Object.keys(users).map(key => users[key]).find(user => mentionName === user.mention_name)
  }

  const userFromWeb = token => {
    return robot.adapter.client.web.users.list().then(users => {
      const localUsers = robot.brain.users()
      const user1 = users.members.find(x => x.name === token)
      if (!user1) return
      const user2 = localUsers[user1.id]
      if (typeof user2 === 'undefined' || user2 === null) {
        localUsers[user1.id] = {
          id: user1.id,
          name: user1.name,
          real_name: user1.real_name,
          email_address: user1.profile.email,
          slack: {
            id: user1.id,
            team_id: user1.team_id,
            name: user1.name,
            deleted: user1.deleted,
            status: user1.status,
            color: user1.color,
            real_name: user1.real_name,
            tz: user1.tz,
            tz_label: user1.tz_label,
            tz_offset: user1.tz_offset,
            profile: user1.profile,
            is_admin: user1.is_admin,
            is_owner: user1.is_owner,
            is_primary_owner: user1.is_primary_owner,
            is_restricted: user1.is_restricted,
            is_ultra_restricted: user1.is_ultra_restricted,
            is_bot: user1.is_bot,
            presence: 'active'
          },
          room: 'random',
          karma: 0
        }
        robot.brain.save()
      }
      return localUsers[user1.id]
    })
  }

  const usersForToken = token => {
    return new Promise((resolve, reject) => {
      let user
      if (user = robot.brain.userForName(token)) {
        resolve([user])
      } else if (user = userForMentionName(token)) {
        resolve([user])
      } else if (robot.adapter.constructor.name === 'SlackBot') {
        userFromWeb(token).then(webUser => {
          if (webUser) {
            resolve([webUser])
          } else {
            resolve(robot.brain.usersForFuzzyName(token))
          }
        }).catch(reject)
      } else {
        resolve([])
      }
    })
  }

  const userForToken = (token, response) => {
    return usersForToken(token)
      .then(users => {
        let user
        if (users.length === 1) {
          user = users[0]
          if (user.karma === null) {
            user.karma = 0
          }
        } else if (users.length > 1) {
          robot.messageRoom(`@${response.message.user.name}", "Se más específico, Hay ${users.length} personas que se parecen a: ${(users.map(u => getCleanName(u.name))).join(', ')}.`)
        } else {
          response.send(`Chaucha, no encuentro al usuario '${token}'.`)
        }
        return user
      })
  }

  const canUpvote = (user, victim) => {
    robot.brain.karmaLimits = robot.brain.karmaLimits || {}
    robot.brain.karmaLimits[user.id] = robot.brain.karmaLimits[user.id] || {}
    if (!robot.brain.karmaLimits[user.id][victim.id]) {
      robot.brain.karmaLimits[user.id][victim.id] = new Date()
      robot.brain.save()
      return true
    } else {
      const oldDate = robot.brain.karmaLimits[user.id][victim.id]
      const timePast = Math.round((new Date().getTime() - oldDate.getTime())) / 60000
      if (timePast > 59) {
        robot.brain.karmaLimits[user.id][victim.id] = new Date()
        robot.brain.save()
        return true
      } else {
        return Math.floor(60 - timePast)
      }
    }
  }

  const applyKarma = (userToken, op, response) => {
    const thisUser = response.message.user
    userForToken(userToken, response)
      .then(targetUser => {
        if (!targetUser) return
        if (thisUser.name === targetUser.name) return response.send('Oe no po, el karma es pa otros no pa ti!')
        if (targetUser.length === '') return response.send('Oe no seai pillo, escribe un nombre!')
        const limit = canUpvote(thisUser, targetUser)
        if (Number.isFinite(limit)) {
          return response.send(`¡No abuses! Intenta en ${limit} minutos`)
        }
        const modifyingKarma = op === '++' ? 1 : -1
        targetUser.karma += modifyingKarma
        const karmaLog = robot.brain.get('karmaLog') || []
        karmaLog.push({
          name: thisUser.name,
          id: thisUser.id,
          karma: modifyingKarma,
          targetName: targetUser.name,
          targetId: targetUser.id,
          date: Date.now(),
          msg: response.envelope.message.text
        })
        robot.brain.set('karmaLog', karmaLog)
        robot.brain.save()
        response.send(`${getCleanName(targetUser.name)} ahora tiene ${targetUser.karma} puntos de karma.`)
      }).catch(err => robot.emit('error', err))
  }

  robot.hear(/((?:^|\s)|[@a-zA-Z0-9_.]+?)(\b\+{2}|-{2})(?:[\s]|(?:[,.:;])(?=\s)|$)/g, response => {
    const tokens = response.match
    if (!tokens) return
    if (robot.adapter.constructor.name === 'SlackBot') {
      if (!robot.adapter.client.rtm.dataStore.getChannelGroupOrDMById(response.envelope.room).is_channel) return
    }

    tokens.slice(0, 5).forEach(token => {
      const opRegex = /(\+{2}|-{2})/g
      const specialChars = /[~!@#$`%^&*()|=?;:'",<>{}]/gi
      const userToken = token.trim().replace(specialChars, '').replace(opRegex, '')
      const op = token.match(opRegex)[0]
      applyKarma(userToken, op, response)
    })
  })

  robot.hear(/^karma(?:\s+@?(.*))?$/, response => {
    if (!response.match[1]) return
    const targetToken = response.match[1].trim()
    if (['todos', 'all'].includes(targetToken.toLowerCase())) {
      response.send(`Karma de todos: ${hubotWebSite}/karma/todos`)
    } else if (targetToken.toLowerCase().split(' ')[0] === 'reset') {
      const thisUser = response.message.user
      if (thisUser.name.toLowerCase() !== 'hector') {
        return response.send('Tienes que ser :hector: para realizar esta función')
      }
      const resetCommand = targetToken.toLowerCase().split(' ')[1]
      if (!resetCommand) return
      if (['todos', 'all'].includes(resetCommand)) {
        const users = robot.brain.users()
        Object.keys(users).forEach(k => {
          users[k].karma = 0
        })
        response.send('Todo el mundo ha quedado libre de toda bendición o pecado.')
        robot.brain.save()
      } else {
        userForToken(resetCommand, response).then(targetUser => {
          targetUser.karma = 0
          response.send(`${getCleanName(targetUser.name)} ha quedado libre de toda bendición o pecado.`)
          robot.brain.save()
        })
      }
    } else {
      userForToken(targetToken, response).then(targetUser => {
        if (!targetUser) return
        response.send(`${getCleanName(targetUser.name)} tiene ${targetUser.karma} puntos de karma.\nMás detalles en: ${hubotWebSite}/karma/log/${targetUser.name}`)
      })
    }
  })

  robot.router.get(`/${robot.name}/karma/todos`, (req, res) => {
    const users = robot.brain.users()
    const list = Object.keys(users)
      .sort()
      .filter(k => users[k].karma)
      .map(k => [users[k].karma || 0, `<strong>${users[k].name}</strong>`])
      .sort((line1, line2) => line1[0] < line2[0] ? 1 : line1[0] > line2[0] ? -1 : 0)
      .map(line => line.join(' '))
    res.setHeader('content-type', 'text/html')
    res.end(`Karma de todos:\n<ul><li>${list.join('</li><li>')}</li></ul>`)
  })

  robot.router.get(`/${robot.name}/karma/log`, (req, res) => {
    const karmaLog = robot.brain.get('karmaLog') || []
    const processedKarmaLog = karmaLog.map(line => {
      if (typeof line !== 'string') {
        line = `${line.name} le ha dado ${line.karma} karma a ${line.targetName} - ${new Date(line.date).toJSON()}`
      }
      return line
    })
    res.setHeader('content-type', 'text/html')
    res.end(`Karmalog:\n<ul><li>${processedKarmaLog.join('</li><li>')}</li></ul>`)
  })

  robot.router.get(`/${robot.name}/karma/log/:user`, (req, res) => {
    const karmaLog = robot.brain.get('karmaLog') || []
    const filteredKarmaLog = karmaLog.filter(log => {
      if (typeof log !== 'string' && log.msg) {
        return log.targetName === req.params.user
      }
    })
    const processedKarmaLog = filteredKarmaLog.map(log =>
      `${new Date(log.date).toJSON()} - ${log.name}: ${log.msg}`
    )
    let msg
    if (filteredKarmaLog.length > 0) {
      msg = `Karmalog:\n<ul><li>${processedKarmaLog.join('</li><li>')}</li></ul>`
    } else { msg = `No hay detalles sobre el karma de ${req.params.user}` }
    res.setHeader('content-type', 'text/html')
    res.end(msg)
  })
}
