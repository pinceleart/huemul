#
# Description:
#   Get detailed information about movies or series from IMDb
#
# Dependencies:
#   None
#
# Configuration:
#   None
#
# Commands:
#   hubot imdb <movie or serie> <year>
#   hubot movie <movie or serie> <year>
#
# Author:
#   @ravenous <hello@ravenous.io>

module.exports = (robot) ->
  robot.respond /(imdb|movie)\s(.*)/i, (msg) ->
    str = msg.match[2]
    year = ''

    # Check if there's a year at the end of the string
    if str.match(/\d{4}$/i)
      title = str.slice(0, -5).split(' ').join('+')
      year = str.slice(-4)
    else
      title = str.split(' ').join('+')

    # Send request to the OMDB API
    msg.http('http://omdbapi.com/')
    .query({
      t: title,
      y: year,
      tomatoes: true
      })
    .get() (err, res, body) ->
      movie = JSON.parse(body)
      emptyMsg = ['NA', 'N/A']

      if movie.Response is 'False'
        msg.send "¿Seguro qué ese es el nombre?\n¡Tienes que elegir una película o serie!"
      else
        info = ":popcorn: *#{movie.Title} (#{movie.Year})*\n\n"
        info += "IMDb Rating: `#{movie.imdbRating}/10`\n" if movie.imdbRating? and emptyMsg.includes(movie.imdbRating) == false
        info += "Rotten Tomatoes: `#{movie.tomatoMeter}%`\n" if movie.tomatoMeter? and emptyMsg.includes(movie.tomatoMeter) == false
        info += ">_#{movie.Plot}_\n" if movie.Plot? and emptyMsg.includes(movie.Plot) == false
        info += "Genre: `#{movie.Genre}`\n" if movie.Genre? and emptyMsg.includes(movie.Genre) == false
        info += "Director: #{movie.Director}\n" if movie.Director? and emptyMsg.includes(movie.Director) == false
        info += "Actors: #{movie.Actors}\n" if movie.Actors? and emptyMsg.includes(movie.Actors) == false
        info += "Awards: #{movie.Awards}\n" if movie.Awards? and emptyMsg.includes(movie.Awards) == false
        info += "URL: www.imdb.com/title/#{movie.imdbID}" if movie.imdbID? and emptyMsg.includes(movie.imdbID) == false
        msg.send info


