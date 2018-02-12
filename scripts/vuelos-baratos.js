const puppeteer = require('puppeteer')

// Description:
//   Show the cheapest flight to a city from Santiago, Chile using despegar.com
//
// Dependencies:
//   Pupepeteer
//
// Configuration:
//   None
//
// Commands:
//   hubot vuelo barato a valdivia - Returns the cheapest price to Valdivia from Santiago
//
// Author:
//   @raerpo_

// I want to keep the city list small. If you want to include more cities you can do it here:
const cityCodes = {
  // Chile
  osorno: 'ZOS',
  concepcion: 'CCP',
  iquique: 'IQQ',
  antofagasta: 'ANF',
  arica: 'ARI',
  coquimbo: 'COW',
  castro: 'WCA',
  temuco: 'ZCO',
  'isla de pascua': 'IPC',
  valdivia: 'ZAL',
  'punta arenas': 'PUQ',
  'puerto aisen': 'WPA',
  balmaceda: 'BBA',
  'puerto montt': 'PMC',
  // Colombia
  bogota: 'BOG',
  medellin: 'EOH',
  'cartagena de indias': 'ctg',
  'san andres': 'ADZ',
  // Argentina
  'buenos aires': 'BUE',
  mendoza: 'MDZ',
  // Peru
  lima: 'lim',
  // Brasil
  'rio de janeiro': 'rio',
  'sao paulo': 'sao',
  // Uruguay
  montevideo: 'mvd',

  // Norte america
  'new york': 'NYC',
  miami: 'mia',
  'san francisco': 'sfo',
  'las vegas': 'las',
  mexico: 'mex',
  montreal: 'ymq',

  // Europa
  madrid: 'mad',
  roma: 'rom',
  paris: 'par',
  berlin: 'ber',
  moscu: 'mow',
  barcelona: 'bcn',
  // Asia
  tokyo: 'tyo',
  beijing: 'bjs'
}

module.exports = robot => {
  robot.respond(/vuelo barato a (.*)/i, msg => {
    const city = msg.match[1].toLowerCase()
    const cityExist = typeof cityCodes[city] !== 'undefined'
    if (!cityExist) return msg.send('No conozco esa ciudad :retard:')
    const cityCode = cityCodes[city]
    msg.send(`Buscando el vuelo más barato para ${city} desde Santigo :airplane_departure: :loading:`)
    ;(async () => {
      const browser = await puppeteer.launch()
      const page = await browser.newPage()
      page.setViewport({ width: 1280, height: 1000 })
      await page.goto(`https://www.despegar.cl/vuelos/scl/${cityCode}/`, { waitUntil: 'networkidle2' })
      const price = await page.evaluate(() => document.querySelector('#alerts .price-amount').textContent)
      if (!price) {
        msg.send(`No encontré ningún vuelo para ${city} desde Santiago :sadhuemul:`)
      }
      msg.send(`Encontré vuelos desde: CLP ${price}`)
      msg.send(`Se puede comprar aquí: https://www.despegar.cl/vuelos/scl/${cityCode}/`)
      await browser.close()
    })()
  })
}
