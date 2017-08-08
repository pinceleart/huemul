// Description:
//   Get detailed information about movies or series from IMDb
//
// Dependencies:
//   None
//
// Configuration:
//   None
//
// Commands:
//   hubot imdb <movie or serie> <year>
//   hubot movie <movie or serie> <year>
//
// Author:
//   @ravenous <hello@ravenous.io>

function checkValue(value) {
  const emptyMsg = ['NA', 'N/A'];

  if ((value != null) && emptyMsg.includes(value) === false) {
    return true;
  }

  return false;
}

module.exports = (robot) => {
  robot.respond(/(imdb|movie)\s(.*)/i, (msg) => {
    const str = msg.match[2];
    let title = str;
    let year = '';

    // Check if there's a year at the end of the string
    if (str.length > 4 && str.match(/\d{4}$/i)) {
      title = str.slice(0, -5).split(' ').join('+');
      year = str.slice(-4);
    } else {
      title = str.split(' ').join('+');
    }

    // Send request to the themoviedb API
    robot.http(`https://api.themoviedb.org/3/search/movie?api_key=019b7cf328685efc9351fefb7abf3f3d&query=${title}`)
    .get()( (err, res, body) => {
      
      if (err || res.statusCode !== 200) {
        return robot.emit('error', err || new Error(`Status code ${res.statusCode}`), msg)
      }

      const movie = JSON.parse(body);

      if (movie.total_results === 0) {
        msg.send("¿Seguro qué ese es el nombre? ¡Tienes que elegir una película o serie! :retard:");
      } else {

        let movieInfo = `Resultados para ${str}: :cabrita:\n`;

        movie.results.forEach(function(e){
          movieInfo += `- ${e.title} (${e.release_date}): ${e.vote_average} puntos\n`
        });

        msg.send(movieInfo);
      }
    });
  });
};


