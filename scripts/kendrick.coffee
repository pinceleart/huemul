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
  "http://i.giphy.com/aUQcF83As9ah2.gif",
  "http://i.giphy.com/17ieqEyGhWgSI.gif",
  "http://i.giphy.com/MrOy8tFZ1CZt6.gif",
  "http://i.giphy.com/9wVT49DL0m8lq.gif",
  "https://media1.popsugar-assets.com/files/thumbor/L7fOIS9RN57NDmOEY84wSHb6isQ/fit-in/1024x1024/filters:format_auto-!!-:strip_icc-!!-/2014/01/30/843/n/1922398/21c2a90c1ab9aed8_tumblr_mfhfonwf671rg1b79o1_500/i/general-she-supercandid-relatable.gif",
  "http://i.imgur.com/OcBuB.gif",
  "http://k33.kn3.net/taringa/2/D/6/F/0/7/AnnaKendrick/58F.gif"
]

module.exports = (robot) ->
  robot.respond /anna/gi, (msg) ->
    msg.send msg.random images
