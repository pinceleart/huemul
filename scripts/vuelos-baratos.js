const puppeteer = require('puppeteer')

// Description:
//   Show current GitHub status and messages
//
// Dependencies:
//   None
//
// Configuration:
//   None
//
// Commands:
//   hubot github status - Returns the last human communication, status, and timestamp.
//   hubot github status resume - Returns the current system status and timestamp.
//   hubot github status all - Returns the most recent human communications with status and timestamp.
//
// Author:
//   voke
//
// Modified by:
//   @jorgeepunan

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
  'san andres': 'ADZ',
  // Argentina
  'buenos aires': 'BUE',
  mendoza: 'MDZ',
  // USA
  'new york': 'NYC',
  // Europa
  madrid: 'mad',
  roma: 'rom',
  paris: 'par'
}

module.exports = robot => {
  robot.respond(/vuelo barato$/i, msg => {
    ;(async () => {
      const browser = await puppeteer.launch()
      const page = await browser.newPage()
      page.setViewport({ width: 1280, height: 1000 })
      await page.goto('https://www.despegar.cl/vuelos/scl/nyc/', { waitUntil: 'networkidle2' })
      const price = await page.evaluate(() => document.querySelector('#alerts .price-amount').textContent)
      msg.send(price)
      await browser.close()
    })()
  })
}
