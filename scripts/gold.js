// Description:
//   Obtener gold con una key válida ó una donación
//
// Dependencies:
//   None
//
// Configuration:
//   GOLD_USER_AGENT, GOLD_SECRET, GOLD_KEYS
//
// Commands:
//   hubot gold status <name>
//   hubot gold insert <key>
//   hubot gold add <user>
//   hubot gold remove <user>
//   hubot gold list

module.exports = robot => {
  class Golden {
    isGold (name) {
      const goldUsers = JSON.parse(robot.brain.get('gold_users') || '{}')
      const result = Object.keys(goldUsers)
        .map(key => ({key: key, data: goldUsers[key]}))
        .find(result => result.data.user === name)
      if (result) {
        const now = new Date()
        const expireDate = new Date(result.data.expire)
        if (now <= expireDate) {
          return true
        } else {
          delete goldUsers[name]
          robot.brain.set('gold_users', JSON.stringify(goldUsers))
        }
      }
      return false
    }
  }

  robot.golden = new Golden()

  robot.respond(/gold status (.*)/i, res => {
    const name = res.match[1]
    const goldUsers = JSON.parse(robot.brain.get('gold_users') || '{}')
    const result = Object.keys(goldUsers)
      .map(key => ({key: key, data: goldUsers[key]}))
      .find(result => result.data.user === name)
    if (result) {
      const now = new Date()
      const expireDate = new Date(result.data.expire)
      const expire = expireDate.toISOString().split('T').shift()
      if (now <= expireDate) {
        res.send(`${name} es golden :monea: hasta el ${expire}`)
        return
      } else {
        delete goldUsers[result.key]
        robot.brain.set('gold_users', JSON.stringify(goldUsers))
        res.send(`${name} ya no eres golden :monea:, expiró el ${expire}`)
      }
    }
    res.send(`${name} no es golden :monea:`)
  })

  robot.respond(/gold list/i, res => {
    const goldUsers = JSON.parse(robot.brain.get('gold_users') || '{}')
    const users = Object.keys(goldUsers)
      .map(key => goldUsers[key].user).join(', ')
    if (users === '') {
      res.send('No hay usuarios golden :monea:')
    } else {
      res.send(users)
    }
  })

  robot.respond(/gold insert (.*)/i, res => {
    const key = res.match[1]
    const keys = (process.env.GOLD_KEYS || '').split(',')
    const goldUsers = JSON.parse(robot.brain.get('gold_users') || '{}')
    if (key in goldUsers) {
      res.send('Lo siento, la key ya fue utilizada.')
    } else if (keys.includes(key)) {
      const now = new Date()
      const diff = 1000 * 60 * 60 * 24 * 30 // 30 días
      const expire = new Date(now.getTime() + diff)
      goldUsers[key] = {user: res.message.user.name, expire: expire}
      robot.brain.set('gold_users', JSON.stringify(goldUsers))
      res.send('*¡Felicitaciones!* ya eres golden :monea: :wink: :yeah:')
    } else {
      res.send('No es una clave válida')
    }
  })

  const addUser = user => {
    const goldUsers = JSON.parse(robot.brain.get('gold_users') || '{}')
    const now = new Date()
    const diff = 1000 * 60 * 60 * 24 * 60 // 60 días
    const expire = new Date(now.getTime() + diff)
    goldUsers[user] = {user: user, expire: expire}
    robot.brain.set('gold_users', JSON.stringify(goldUsers))
    const comunidad = robot.adapter.client.rtm.dataStore.getChannelByName('#comunidad')
    const message = `:clap2: *${user}* donó 1 mes de servidor a :huemul:, se lleva 3 stickers :huemul: y es miembro golden :monea: por 2 meses!`
    robot.send({room: comunidad.id}, message)
  }

  robot.respond(/gold add (.*)/i, res => {
    const isAdmin = robot.auth.isAdmin(res.message.user)
    const hasRole = robot.auth.hasRole(res.message.user, 'gold')
    if (isAdmin || hasRole) {
      const user = robot.adapter.client.rtm.dataStore.getUserByName(res.match[1])
      if (typeof user !== 'undefined') {
        addUser(user.name)
      } else {
        res.reply('el usuario no existe')
      }
    }
  })

  robot.respond(/gold remove (.*)/i, res => {
    const isAdmin = robot.auth.isAdmin(res.message.user)
    const hasRole = robot.auth.hasRole(res.message.user, 'gold')
    if (isAdmin || hasRole) {
      const user = res.match[1]
      const goldUsers = JSON.parse(robot.brain.get('gold_users') || '{}')
      if (Object.keys(goldUsers).includes(user)) {
        delete goldUsers[user]
        robot.brain.set('gold_users', JSON.stringify(goldUsers))
        res.send(`${user} ya no es miembro golden :monea:`)
      } else {
        res.reply('el usuario no existe')
      }
    }
  })

  robot.router.post('/gold/webhook', (req, res) => {
    if (req.get('User-Agent') === process.env.GOLD_USER_AGENT && req.body.secret === process.env.GOLD_SECRET) {
      const user = robot.adapter.client.rtm.dataStore.getUserByEmail(req.body.email)
      if (typeof user !== 'undefined') {
        addUser(user.name)
      } else {
        const admins = process.env.HUBOT_AUTH_ADMIN
        if (admins) {
          let message = `El email ${req.body.email} acaba de donar pero no `
          message += 'logré determinar qué usuario es para agregarlo a los '
          message += 'golden :monea:.\nEste mensaje fue enviado a todos los '
          message += 'administradores de DevsChile.'
          admins.split(',').forEach(admin => {
            robot.send({room: admin}, message)
          })
        }
      }
      res.send('Ok')
    } else {
      robot.emit('error', `Se envió un request inválido con el siguiente email: ${req.body.email}`)
      res.send('Error')
    }
  })
}
