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

module.exports = robot => {
  // NOTE: messages contains new lines for some reason.
  let formatString = string => decodeURIComponent(string.replace(/(\n)/gm, ' '))

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
