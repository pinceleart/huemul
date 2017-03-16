Helper = require("hubot-test-helper")
expect = require("chai").expect

helper = new Helper("../scripts/pinera.coffee")

class NewMockResponse extends Helper.Response
  random: (items) ->
    "https://pbs.twimg.com/media/Cy7cN3QWIAAP7pR.jpg"

describe "pinera", ->
  beforeEach ->
    @room = helper.createRoom(response: NewMockResponse)

  afterEach ->
    @room.destroy()

  context "Escribir piñera", ->
    beforeEach (done) ->
      @room.user.say("user", "piñera")
      setTimeout(done, 500)

    it "Debe entregar una imagen", ->
      expect(@room.messages).to.eql([
        ["user", "piñera"]
        ["hubot", "https://pbs.twimg.com/media/Cy7cN3QWIAAP7pR.jpg"]
      ])

  context "Escribir yeta", ->
    beforeEach (done) ->
      @room.user.say("user", "yeta")
      setTimeout(done, 500)

    it "Debe entregar una imagen", ->
      expect(@room.messages).to.eql([
        ["user", "yeta"]
        ["hubot", "https://pbs.twimg.com/media/Cy7cN3QWIAAP7pR.jpg"]
      ])
