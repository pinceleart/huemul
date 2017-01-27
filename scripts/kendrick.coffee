# Description:
#   Display pictures of pinceleart's girlfriend.
#
# Dependencies:
#   None
#
# Configuration:
#   None
#
# Notes:
#   Anna   - Displays a Anna Kendrick picture

#
# Author:
#   @pinceleart

images = [
  "http://i.giphy.com/bZkQ55qlfrwgE.gif",
  "http://i.giphy.com/26BRwtfB9qBN4znm8.gif",
  "http://i.giphy.com/bG3ISgJnyZxbW.gif",
  "http://i.giphy.com/12MCPAmEP4JCRq.gif",
  "http://i.giphy.com/RyvoPaWNe8Xte.gif",
  "http://i.giphy.com/kFgQqnEgOIuCk.gif",
  "http://i.giphy.com/pPp1lfcrOOIQ8.gif"
]

module.exports = (robot) ->
  robot.respond /anna/gi, (msg) ->
    msg.send msg.random images
