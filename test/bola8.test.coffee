Helper = require("hubot-test-helper")
expect = require("chai").expect

helper = new Helper("../scripts/bola8.js")

class NewMockResponse extends Helper.Response
  random: (items) ->
    "Sin duda"

describe "bola8", ->
  beforeEach ->
    @room = helper.createRoom(response: NewMockResponse)

  afterEach ->
    @room.destroy()

  context "Preguntar a hubot", ->
    beforeEach (done) ->
      @room.user.say("user", "hubot pregunta sere el mejor bot")
      setTimeout(done, 500)

    it "Debe entregar una respuesta", ->
      expect(@room.messages).to.eql([
        ["user", "hubot pregunta sere el mejor bot"]
        ["hubot", ":huemul: ~ Sin duda"]
      ])

  context "Pedir consejo a hubot", ->
    beforeEach (done) ->
      @room.user.say("user", "hubot consejo como puedo ser mejor")
      setTimeout(done, 500)

    it "Debe entregar un consejo", ->
      expect(@room.messages).to.eql([
        ["user", "hubot consejo como puedo ser mejor"]
        ["hubot", ":huemul: ~ Sin duda"]
      ])
