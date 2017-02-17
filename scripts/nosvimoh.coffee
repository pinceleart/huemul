# Description:
#   zapatilladeclavo.jpg
#
# Dependencies:
#   None
#
# Configuration:
#   None
#
# Notes:
#   echo nosvimo   - Displays a chao nos vimos picture

#
# Author:
#   @pinceleart

images = [
  "https://memecrunch.com/meme/B521D/chao-nos-vimo/image.gif",
  "http://www.generadormemes.com/media/created/4mgtokl1dfpf0otjhlproh1knem6lt17e3vd0e7hb2bvku59rywwgxqp0iexe2f.jpg",
  "http://66.media.tumblr.com/884bd93f973ef44ba90f3f47f8ac87d2/tumblr_njguz3If0q1rw80ozo1_400.gif",
  "http://1.bp.blogspot.com/-r9gYeHHkTYM/UOiA8klogvI/AAAAAAAAAos/JA2euk5aQEo/s1600/adios-te-veo-luego.gif",
  "https://68.media.tumblr.com/tumblr_m5p2bxGkET1qjc97eo1_500.jpg",
  "https://media0.giphy.com/media/yi1OZ83P4R2kE/200_s.gif",
]

module.exports = (robot) ->
  robot.respond /nosvimo/gi, (msg) ->
    msg.send msg.random images
