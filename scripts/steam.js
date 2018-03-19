// Description:
//   Get the current steam daily deal.
//   Get info about games

// Dependencies:
//   "cheerio": "latest"

// Commands:
//   hubot steam daily - Show the current steam daily deal.
//   hubot steam [Game Name] - Show game info.
//   hubot steam help - Show available command list.

// Author:
//   @christopher

'use strict'
const cheerio = require('cheerio')
const commands = [
  `Comandos de Steam:`,
  '`huemul steam daily` - Muestra la oferta del día.',
  '`huemul steam [Nombre Juego]` - Muestra información básica de un juego.'
]

module.exports = robot => {
  const getBody = (uri, header = null) => {
    return new Promise((resolve, reject) => {
      let request
      if (header) {
        request = robot.http(uri).header(header.key, header.value)
      } else {
        request = robot.http(uri)
      }
      request.get()((err, res, body) => {
        if (err || res.statusCode !== 200) {
          return reject(err || new Error(`Status code ${res.statusCode}`))
        }
        resolve(body)
      })
    })
  }

  const getGameDesc = game => {
    return new Promise((resolve, reject) => {
      getBody(`http://store.steampowered.com/search/?term=${game}`).then(body => {
        const $ = cheerio.load(body)
        let games = $('.search_result_row')
          .slice(0, 1)
          .map(function() {
            return $(this).attr('data-ds-appid')
          })
          .get()
        resolve(games)
      })
    })
  }

  const getDailyId = () => {
    return new Promise((resolve, reject) => {
      getBody('http://store.steampowered.com').then(body => {
        const $ = cheerio.load(body)
        const idAttr = $('.dailydeal_desc .dailydeal_countdown').attr('id')
        resolve(idAttr.substr(idAttr.length - 6))
      })
    })
  }

  const getPrice = id => {
    const cookie = 'steamCountry=CL%7Cb8a8a3da46a6c324d177af2855ca3d9b;timezoneOffset=-10800,0;'
    const uri = `http://store.steampowered.com/api/appdetails/?appids=${id}&cc=CL`
    return new Promise((resolve, reject) => {
      const data = getBody(uri, { key: 'cookie', value: cookie }).then(body => {
        const game = JSON.parse(body)[id].data
        const name = game.name
        const price = game.price_overview
        const final = price.final / 100
        const initial = price.initial / 100
        const discount = price.discount_percent
        return {
          name: name,
          final: final,
          initial: initial,
          discount: discount,
          uri: `https://store.steampowered.com/app/${id}`
        }
      })
      resolve(data)
    })
  }

  const getDesc = id => {
    const cookie = 'steamCountry=CL%7Cb8a8a3da46a6c324d177af2855ca3d9b;timezoneOffset=-10800,0;'
    var uri = `http://store.steampowered.com/api/appdetails/?appids=${id}&cc=CL`
    return new Promise((resolve, reject) => {
      const data = getBody(uri, { key: 'cookie', value: cookie }).then(body => {
        const game = JSON.parse(body)[id].data
        if (game.type === 'game') {
          const type = game.type
          const desc = game.short_description
          const name = game.name
          //sugar
          const meta = !game.metacritic ? 0 : game.metacritic.score
          //price process
          const itsfree = game.is_free
          const price = itsfree ? 0 : game.price_overview
          const final = price.final / 100
          //Important!
          const dev = game.developers
          const discount = price.discount_percent
          uri = `https://store.steampowered.com/app/${id}`

          return {
            name,
            price,
            final,
            discount,
            uri,
            desc,
            dev,
            meta,
            type
          }
        } else {
          const type = game.type
          return {
            type
          }
        }
      })
      resolve(data)
    })
  }

  const sendMessage = (message, channel) => {
    if (robot.adapter.constructor.name === 'SlackBot') {
      const options = { unfurl_links: false, as_user: true }
      robot.adapter.client.web.chat.postMessage(channel, message, options)
    } else {
      robot.messageRoom(channel, message)
    }
  }

  robot.respond(/steam(.*)/i, msg => {
    const args = msg.match[1].split(' ')[1]
    const cant = msg.match[1].split(' ')[2]
    const full = msg.match[1]

    if (args != 'help') {
      if (args == 'daily') {
        getDailyId()
          .then(getPrice)
          .then(data => {
            sendMessage(
              `¡Lorea la oferta del día!: *${data.name}*, a sólo $CLP *${data.final}*. Valor original $CLP *${
                data.initial
              }*, eso es un -*${data.discount}*%! <${data.uri}|Ver más>`,
              msg.message.room
            )
          })
          .catch(err => {
            if (err == 404) {
              msg.send('No se encontró la oferta del día, revisaste los especiales?')
            } else {
              msg.send('Actualmente _Steam_ no responde.')
              robot.emit('error', err || new Error(`Status code ${res.statusCode}`), msg)
            }
          })
      } else {
        getGameDesc(full)
          .then(getDesc)
          .then(data => {
            let tipo = data.type
            if (data.type !== 'game') {
              msg.send(`¡Cuek!, no encontré el juego`)
            } else {
              let meta = data.meta === 0 ? 'No Registra' : data.meta
              if (data.discount > 0) {
                msg.send(
                  `Nombre del Juego: *${data.name}*\nValor: $CLP *${data.final}* (%${
                    data.discount
                  } Off)\nDesarrollador: *${data.dev}*\nMetacritic: *${meta}*\nDescripción: ${data.desc} <${
                    data.uri
                  }|Ver más>`
                )
              } else {
                let price = data.price == 0 ? 'Free-To-Play' : data.final
                msg.send(
                  `Nombre del Juego: *${data.name}*\nValor: $CLP *${price}*\nDesarrollador: *${
                    data.dev
                  }*\nMetacritic: *${meta}*\nDescripción: ${data.desc} <${data.uri}|Ver más>`
                )
              }
            }
          })
          .catch(err => {
            if (err == 404) {
              msg.send('¡Cuek!, no encontré el juego')
            } else {
              msg.send('¡Cuek!, no encontré el juego')
              robot.emit('error', err || new Error(`Status code ${res.statusCode}`), msg)
            }
          })
      }
    } else {
      commands.map(result => {
        sendMessage(result, msg.message.room)
      })
    }
  })
}
