Helper = require("hubot-test-helper")
expect = require("chai").expect

helper = new Helper("../scripts/kendrick.coffee")

class NewMockResponse extends Helper.Response
  random: (items) ->
    "http://i.giphy.com/bZkQ55qlfrwgE.gif"

describe "kendrick", ->
  beforeEach ->
    @room = helper.createRoom(response: NewMockResponse)

  afterEach ->
    @room.destroy()

  context "Obtener un imagen random", ->
    beforeEach (done) ->
      @room.user.say("user", "hubot anna")
      setTimeout(done, 500)

    it "Debe entregar una imagen", ->
      expect(@room.messages).to.eql([
        ["user", "hubot anna"]
        ["hubot", "http://i.giphy.com/bZkQ55qlfrwgE.gif"]
      ])
