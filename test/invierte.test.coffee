Helper = require("hubot-test-helper")
expect = require("chai").expect

helper = new Helper("../scripts/invierte.js")

describe "invierte", ->
  beforeEach ->
    @room = helper.createRoom(httpd: false)

  afterEach ->
    @room.destroy()

  context "Invertir texto", ->
    beforeEach (done) ->
      @room.user.say("user", "hubot invierte hola mundo")
      setTimeout(done, 500)

    it "Debe entregar el texto invertido", ->
      expect(@room.messages[0]).to.eql(["user", "hubot invierte hola mundo"])
      expect(@room.messages[1][1]).to.match(/\u006F\u0070\u0075\u0075\u026F\ \u0250\u0283\u006F\u0265/)
