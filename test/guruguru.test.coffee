Helper = require("hubot-test-helper")
expect = require("chai").expect

helper = new Helper("../scripts/guruguru.coffee")

describe "guruguru", ->
  beforeEach ->
    @room = helper.createRoom(httpd: false)

  afterEach ->
    @room.destroy()

  context "Traducir texto a guruguru", ->
    beforeEach (done) ->
      @room.user.say("user", "hubot guru hola mundo")
      setTimeout(done, 500)

    it "Debe traducir el texto", ->
      expect(@room.messages).to.eql([
        ["user", "hubot guru hola mundo"]
        ["hubot", "hoga ñugngo"]
      ])
