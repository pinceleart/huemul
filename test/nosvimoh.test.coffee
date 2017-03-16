Helper = require("hubot-test-helper")
expect = require("chai").expect

helper = new Helper("../scripts/nosvimoh.coffee")

class NewMockResponse extends Helper.Response
  random: (items) ->
    "https://memecrunch.com/meme/B521D/chao-nos-vimo/image.gif"

describe "nosvimoh", ->
  beforeEach ->
    @room = helper.createRoom(response: NewMockResponse)

  afterEach ->
    @room.destroy()

  context "Escribir nosvimo", ->
    beforeEach (done) ->
      @room.user.say("user", "hubot nosvimo")
      setTimeout(done, 500)

    it "Debe entregar una imagen", ->
      expect(@room.messages).to.eql([
        ["user", "hubot nosvimo"]
        ["hubot", "https://memecrunch.com/meme/B521D/chao-nos-vimo/image.gif"]
      ])
