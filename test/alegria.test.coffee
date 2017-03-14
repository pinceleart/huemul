Helper = require("hubot-test-helper")
expect = require("chai").expect

helper = new Helper("../scripts/alegria.coffee")

class NewMockResponse extends Helper.Response
  random: (items) ->
    "http://i.imgur.com/1CVUXQE.jpg"

describe "alegria", ->
  beforeEach ->
    @room = helper.createRoom(response: NewMockResponse)

  afterEach ->
    @room.destroy()

  context "Obtener un imagen con el comando hubot alegria", ->
    beforeEach (done) ->
      @room.user.say("user", "hubot alegria")
      setTimeout(done, 500)

    it "Debe entregar una imagen", ->
      expect(@room.messages).to.eql([
        ["user", "hubot alegria"]
        ["hubot", "http://i.imgur.com/1CVUXQE.jpg"]
      ])

  context "Obtener un imagen con el comando hubot alegría", ->
    beforeEach (done) ->
      @room.user.say("user", "hubot alegría")
      setTimeout(done, 500)

    it "Debe entregar una imagen", ->
      expect(@room.messages).to.eql([
        ["user", "hubot alegría"]
        ["hubot", "http://i.imgur.com/1CVUXQE.jpg"]
      ])

  context "Obtener un imagen con el comando hubot alegrame", ->
    beforeEach (done) ->
      @room.user.say("user", "hubot alegrame")
      setTimeout(done, 500)

    it "Debe entregar una imagen", ->
      expect(@room.messages).to.eql([
        ["user", "hubot alegrame"]
        ["hubot", "http://i.imgur.com/1CVUXQE.jpg"]
      ])

  context "Obtener un imagen con el comando hubot alégrame", ->
    beforeEach (done) ->
      @room.user.say("user", "hubot alégrame")
      setTimeout(done, 500)

    it "Debe entregar una imagen", ->
      expect(@room.messages).to.eql([
        ["user", "hubot alégrame"]
        ["hubot", "http://i.imgur.com/1CVUXQE.jpg"]
      ])

  context "Obtener un imagen con el comando hubot felicidad", ->
    beforeEach (done) ->
      @room.user.say("user", "hubot felicidad")
      setTimeout(done, 500)

    it "Debe entregar una imagen", ->
      expect(@room.messages).to.eql([
        ["user", "hubot felicidad"]
        ["hubot", "http://i.imgur.com/1CVUXQE.jpg"]
      ])

  context "Obtener un imagen con el comando hubot feliz", ->
    beforeEach (done) ->
      @room.user.say("user", "hubot feliz")
      setTimeout(done, 500)

    it "Debe entregar una imagen", ->
      expect(@room.messages).to.eql([
        ["user", "hubot feliz"]
        ["hubot", "http://i.imgur.com/1CVUXQE.jpg"]
      ])

  context "Obtener un imagen con el comando hubot yay", ->
    beforeEach (done) ->
      @room.user.say("user", "hubot yay")
      setTimeout(done, 500)

    it "Debe entregar una imagen", ->
      expect(@room.messages).to.eql([
        ["user", "hubot yay"]
        ["hubot", "http://i.imgur.com/1CVUXQE.jpg"]
      ])
