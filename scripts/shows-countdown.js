// Description:
//   Search for next airing episode of a given tv show
//
// Dependencies:
//   none
//
// Configuration:
//   None
//
// Commands:
//   huemul countdown help
//   huemul countdown <title>
//
// Author:
//   @JoseMCO


module.exports = robot => {
  robot.respond(/countdown(.*)/i, (msg) => {
    const search = msg.match[1].toLowerCase().split(' ').join('%20')
    if (search === '%20help' || !search) {
      msg.send('Tení que darme el nombre de la serie po! (ej: huemul countdown mr robot)\n')
      return false
    }

    // Send request to the tvmaze search API
    robot.http("http://api.tvmaze.com/search/shows?q=" + search).get()( (err, res, body) => {
      if (err || res.statusCode !== 200) {
        return robot.emit('error', err || new Error(`Status code ${res.statusCode}`), msg)
      }

      const data = JSON.parse(body)

      if (data.length === 0) {
        msg.send("¿Seguro que ese es el nombre? ¡Tienes que elegir una serie que exista! :retard:")
      } 
      else {

        let show_name = data[0].show.name
        let ep_link = data[0].show._links.nextepisode

        if (!ep_link) {
          msg.send(show_name+" no tiene más fechas! :llora:")
        } 
        else {
          // Send request to the tvmaze episode API
          robot.http(ep_link.href).get()( (err, res, body) => {
            if (err || res.statusCode !== 200) {
              return robot.emit('error', err || new Error(`Status code ${res.statusCode}`), msg)
            }

            const data = JSON.parse(body)

            if (!data) {
              msg.send("¿Seguro que ese es el nombre? ¡Tienes que elegir una serie que exista! :retard:")
            } 
            else {
              let ep_name = data.name
              let ep_date = data.airstamp
              let ep_tag = +data.season+"x"+data.number

              let distance = new Date(ep_date) - new Date()
              let _second = 1000
              let _minute = _second * 60
              let _hour = _minute * 60
              let _day = _hour * 24

              let days = Math.floor(distance / _day)
              let hours = Math.floor((distance % _day) / _hour)
              let minutes = Math.floor((distance % _hour) / _minute)
              let seconds = Math.floor((distance % _minute) / _second)
              let count = days+"d "+hours+"h "+minutes+"m y "+seconds+"s :popcorn:"
              let result = "El siguiente episodio de "+show_name+" ("+ep_tag+": "+ep_name+") se estrena en "+count

              msg.send(result)
            }
          })
        }
      }
    })
  })
}
