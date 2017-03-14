Helper = require("hubot-test-helper")
expect = require("chai").expect

helper = new Helper("../scripts/citas.js")

class NewMockResponse extends Helper.Response
  random: (items) ->
    "> Lo bien hecho es mejor que lo bien dicho. *-Benjamin Franklin*"

describe "citas", ->
  beforeEach ->
    @room = helper.createRoom(response: NewMockResponse)

  afterEach ->
    @room.destroy()

  context "Pedir una cita", ->
    beforeEach (done) ->
      @room.user.say("user", "hubot una cita")
      setTimeout(done, 500)

    it "Debe entregar una cita", ->
      expect(@room.messages).to.eql([
        ["user", "hubot una cita"]
        ["hubot", "> Lo bien hecho es mejor que lo bien dicho. *-Benjamin Franklin*"]
      ])
