Helper = require("hubot-test-helper")
expect = require("chai").expect

helper = new Helper("../scripts/lmgtfy.coffee")

class NewMockResponse extends Helper.Response
  random: (items) ->
    "¿Era muy difícil? :wntard:"

describe "lmgtfy", ->
  beforeEach ->
    @room = helper.createRoom(response: NewMockResponse)

  afterEach ->
    @room.destroy()

  context "Preguntar a google", ->
    beforeEach (done) ->
      @room.user.say("user", "hubot google como testear")
      setTimeout(done, 500)

    it "Debe entregar una sugerencia", ->
      expect(@room.messages).to.eql([
        ["user", "hubot google como testear"]
        ["hubot", "http://lmgtfy.com/?q=como%20testear\n¿Era muy difícil? :wntard:"]
      ])

  context "Preguntar a lmgtfy por un usuario", ->
    beforeEach (done) ->
      @room.user.say("user", "hubot lmgtfy @user como testear")
      setTimeout(done, 500)

    it "Debe entregar una sugerencia", ->
      expect(@room.messages).to.eql([
        ["user", "hubot lmgtfy @user como testear"]
        ["hubot", "user: http://lmgtfy.com/?q=como%20testear\n¿Era muy difícil? :wntard:"]
      ])
