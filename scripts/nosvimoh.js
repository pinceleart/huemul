// Description:
//   zapatilladeclavo.jpg
//
// Dependencies:
//   None
//
// Configuration:
//   None
//
// Command:
//   hubot nosvimo - Displays a chao nos vimos picture
//
// Author:
//   @pinceleart

let images = [
  "https://memecrunch.com/meme/B521D/chao-nos-vimo/image.gif",
  "https://media.tenor.com/images/03fb6a1872602d54b6d9c42efce45a05/tenor.gif",
  "http://66.media.tumblr.com/884bd93f973ef44ba90f3f47f8ac87d2/tumblr_njguz3If0q1rw80ozo1_400.gif",
  "http://generadordememesonline.com/media/created/2w7wb5.png",
  "https://i.giphy.com/VsXhOdCYnpw1q.gif",
  "http://generadordememesonline.com/media/created/xtz4kp.jpg",
  "http://pa1.narvii.com/6479/0518a785aafb86cfb2a10be7151d58c944d10019_hq.gif"
];

module.exports = robot => {
  robot.respond(/nosvimo/gi, msg => msg.send(msg.random(images)));
};
