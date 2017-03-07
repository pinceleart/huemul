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
      if movie.Response is 'False'
        msg.send "¿Seguro qué ese es el nombre?\n¡Tienes que elegir una película o serie!"
      else
        info = ":popcorn: *#{movie.Title} (#{movie.Year})*\n\n"
        info += "IMDb Rating: `#{movie.imdbRating}/10`\n" if movie.imdbRating? and movie.imdbRating isnt 'N/A'
        info += "Rotten Tomatoes: `#{movie.tomatoMeter}%`\n" if movie.tomatoMeter? and movie.tomatoMeter isnt 'NA'
        info += ">_#{movie.Plot}_\n" if movie.Plot? and movie.Plot isnt 'N/A'
        info += "Genre: `#{movie.Genre}`\n" if movie.Genre? and movie.Genre isnt 'N/A'
        info += "Director: #{movie.Director}\n" if movie.Director? and movie.Director isnt 'N/A'
        info += "Actors: #{movie.Actors}\n" if movie.Actors? and movie.Actors isnt 'N/A'
        info += "Awards: #{movie.Awards}\n" if movie.Awards? and movie.Awards isnt 'N/A'
        info += "URL: www.imdb.com/title/#{movie.imdbID}" if movie.imdbID? and movie.imdbID isnt 'N/A'
        msg.send info


