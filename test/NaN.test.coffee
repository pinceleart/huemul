Helper = require("hubot-test-helper")
expect = require("chai").expect

helper = new Helper("../scripts/NaN.js")

describe "NaN", ->
  beforeEach ->
    @room = helper.createRoom(httpd: false)

  afterEach ->
    @room.destroy()

  context "Obtener un imagen random", ->
    beforeEach (done) ->
      @room.user.say("user", "NaN")
      setTimeout(done, 500)

    it "Debe entregar una imagen", ->
      expect(@room.messages).to.eql([
        ["user", "NaN"]
        ["hubot", "NaNNaNNaNNaNNaNNaNNaNNaNNaNNaNNaNNaNNaNNaNNaN Batman! ~ :huemul:"]
      ])
