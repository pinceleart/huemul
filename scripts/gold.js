// Description:
//   Obtener gold con una key valida
//
// Dependencies:
//   None
//
// Configuration:
//   None
//
// Commands:
//   hubot gold status <name>
//   hubot gold insert <key>

module.exports = robot => {
  robot.respond(/gold status (.*)/i, res => {
    const name = res.match[1]
    const goldUsers = JSON.parse(robot.brain.get('gold_users') || '{}')
    const data = Object.keys(goldUsers)
      .map(key => goldUsers[key])
      .find(data => data.user === name)
    if (data) {
      const expire = (new Date(data.expire)).toISOString().split('T').shift()
      res.send(`${name} es golden :monea: hasta el ${expire}`)
    } else {
      res.send(`${name} no es golden :monea:`)
    }
    return
  })

  robot.respond(/gold insert (.*)/i, res => {
    const key = res.match[1]
    const keys = (process.env.GOLD_KEYS || '').split(',')
    const goldUsers = JSON.parse(robot.brain.get('gold_users') || '{}')
    if (key in goldUsers) {
      res.send('Lo siento, la key ya fue utilizada.')
    } else if (keys.includes(key)) {
      const now = new Date()
      const diff = 1000 * 60 * 60 * 24 * 30
      const expire = new Date(now.getTime() + diff)
      goldUsers[key] = {user: res.message.user.name, expire: expire}
      robot.brain.set('gold_users', JSON.stringify(goldUsers))
      res.send('*¡Felicitaciones!* ya eres golden :monea: :wink: :yeah:')
    } else {
      res.send('No es una clave válida')
    }
    return
  })
}
