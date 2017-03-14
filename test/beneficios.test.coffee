Helper = require("hubot-test-helper")
expect = require("chai").expect

helper = new Helper("../scripts/beneficios.js")

class NewMockResponse extends Helper.Response
  random: (items) ->
    "Tómate la tarde libre, proletario."

describe "beneficios", ->
  beforeEach ->
    @room = helper.createRoom(response: NewMockResponse)

  afterEach ->
    @room.destroy()

  context "Obtener un imagen random", ->
    beforeEach (done) ->
      @room.user.say("user", "hubot un beneficio")
      setTimeout(done, 500)

    it "Debe entregar una imagen", ->
      expect(@room.messages).to.eql([
        ["user", "hubot un beneficio"]
        ["hubot", "Tómate la tarde libre, proletario."]
      ])
