Helper = require("hubot-test-helper")
expect = require("chai").expect

helper = new Helper("../scripts/que_almorzar.coffee")

class NewMockResponse extends Helper.Response
  random: (items) ->
    "cerveza"

describe "que_almorzar", ->
  beforeEach ->
    @room = helper.createRoom(response: NewMockResponse)

  afterEach ->
    @room.destroy()

  context "Consultar qué desayunar", ->
    beforeEach (done) ->
      @room.user.say("user", "hubot qué desayunar")
      setTimeout(done, 500)

    it "Debe entregar una sugerencia", ->
      expect(@room.messages).to.eql([
        ["user", "hubot qué desayunar"]
        ["hubot", "Te sugiero: cerveza"]
      ])

  context "Consultar que desayunar", ->
    beforeEach (done) ->
      @room.user.say("user", "hubot que desayunar")
      setTimeout(done, 500)

    it "Debe entregar una sugerencia", ->
      expect(@room.messages).to.eql([
        ["user", "hubot que desayunar"]
        ["hubot", "Te sugiero: cerveza"]
      ])

  context "Consultar qué almorzar", ->
    beforeEach (done) ->
      @room.user.say("user", "hubot qué almorzar")
      setTimeout(done, 500)

    it "Debe entregar una sugerencia", ->
      expect(@room.messages).to.eql([
        ["user", "hubot qué almorzar"]
        ["hubot", "Te sugiero: cerveza"]
      ])

  context "Consultar que almorzar", ->
    beforeEach (done) ->
      @room.user.say("user", "hubot que almorzar")
      setTimeout(done, 500)

    it "Debe entregar una sugerencia", ->
      expect(@room.messages).to.eql([
        ["user", "hubot que almorzar"]
        ["hubot", "Te sugiero: cerveza"]
      ])

  context "Consultar qué cenar", ->
    beforeEach (done) ->
      @room.user.say("user", "hubot qué cenar")
      setTimeout(done, 500)

    it "Debe entregar una sugerencia", ->
      expect(@room.messages).to.eql([
        ["user", "hubot qué cenar"]
        ["hubot", "Para el *anvre*: cerveza"]
      ])

  context "Consultar que cenar", ->
    beforeEach (done) ->
      @room.user.say("user", "hubot que cenar")
      setTimeout(done, 500)

    it "Debe entregar una sugerencia", ->
      expect(@room.messages).to.eql([
        ["user", "hubot que cenar"]
        ["hubot", "Para el *anvre*: cerveza"]
      ])

  context "Consultar qué tomar", ->
    beforeEach (done) ->
      @room.user.say("user", "hubot qué tomar")
      setTimeout(done, 500)

    it "Debe entregar una sugerencia", ->
      expect(@room.messages).to.eql([
        ["user", "hubot qué tomar"]
        ["hubot", "Si tienes sed: cerveza"]
      ])

  context "Consultar que tomar", ->
    beforeEach (done) ->
      @room.user.say("user", "hubot que tomar")
      setTimeout(done, 500)

    it "Debe entregar una sugerencia", ->
      expect(@room.messages).to.eql([
        ["user", "hubot que tomar"]
        ["hubot", "Si tienes sed: cerveza"]
      ])

  context "Consultar qué cerveza tomar", ->
    beforeEach (done) ->
      @room.user.say("user", "hubot qué cerveza tomar")
      setTimeout(done, 500)

    it "Debe entregar una sugerencia", ->
      expect(@room.messages).to.eql([
        ["user", "hubot qué cerveza tomar"]
        ["hubot", "Si tienes sed: cerveza"]
      ])

  context "Consultar que cerveza tomar", ->
    beforeEach (done) ->
      @room.user.say("user", "hubot que cerveza tomar")
      setTimeout(done, 500)

    it "Debe entregar una sugerencia", ->
      expect(@room.messages).to.eql([
        ["user", "hubot que cerveza tomar"]
        ["hubot", "Si tienes sed: cerveza"]
      ])

  context "Consultar qué comer", ->
    beforeEach (done) ->
      @room.user.say("user", "hubot qué comer")
      setTimeout(done, 500)

    it "Debe entregar una sugerencia", ->
      expect(@room.messages).to.eql([
        ["user", "hubot qué comer"]
        ["hubot", "Depende de la comida para: *desayunar*, *almorzar* ó *cenar*. Pregúntame de nuevo."]
      ])

  context "Consultar que comer", ->
    beforeEach (done) ->
      @room.user.say("user", "hubot que comer")
      setTimeout(done, 500)

    it "Debe entregar una sugerencia", ->
      expect(@room.messages).to.eql([
        ["user", "hubot que comer"]
        ["hubot", "Depende de la comida para: *desayunar*, *almorzar* ó *cenar*. Pregúntame de nuevo."]
      ])
