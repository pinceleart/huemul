Helper = require("hubot-test-helper")
expect = require("chai").expect

helper = new Helper("../scripts/ql.js")

class NewMockResponse extends Helper.Response
  random: (items) ->
    """\n \
(҂._.)\n \
<,╤╦╤─ ҉ - - - - :huemul:\n \
/--\'\n\
"""

describe "ql", ->
  beforeEach ->
    @room = helper.createRoom(response: NewMockResponse)

  afterEach ->
    @room.destroy()

  context "Escribir ql", ->
    beforeEach (done) ->
      @room.user.say("user", "hubot ql")
      setTimeout(done, 500)

    it "Debe entregar un ascii art", ->
      expect(@room.messages).to.eql([
        ["user", "hubot ql"]
        ["hubot", """\n \
(҂._.)\n \
<,╤╦╤─ ҉ - - - - :huemul:\n \
/--\'\n\
"""]
      ])

  context "Escribir rql", ->
    beforeEach (done) ->
      @room.user.say("user", "hubot rql")
      setTimeout(done, 500)

    it "Debe entregar un ascii art", ->
      expect(@room.messages).to.eql([
        ["user", "hubot rql"]
        ["hubot", """\n \
(҂._.)\n \
<,╤╦╤─ ҉ - - - - :huemul:\n \
/--\'\n\
"""]
      ])

  context "Escribir ctm", ->
    beforeEach (done) ->
      @room.user.say("user", "hubot ctm")
      setTimeout(done, 500)

    it "Debe entregar un ascii art", ->
      expect(@room.messages).to.eql([
        ["user", "hubot ctm"]
        ["hubot", """\n \
(҂._.)\n \
<,╤╦╤─ ҉ - - - - :huemul:\n \
/--\'\n\
"""]
      ])

  context "Escribir mátate", ->
    beforeEach (done) ->
      @room.user.say("user", "hubot mátate")
      setTimeout(done, 500)

    it "Debe entregar un ascii art", ->
      expect(@room.messages).to.eql([
        ["user", "hubot mátate"]
        ["hubot", """\n \
(҂._.)\n \
<,╤╦╤─ ҉ - - - - :huemul:\n \
/--\'\n\
"""]
      ])

  context "Escribir matate", ->
    beforeEach (done) ->
      @room.user.say("user", "hubot matate")
      setTimeout(done, 500)

    it "Debe entregar un ascii art", ->
      expect(@room.messages).to.eql([
        ["user", "hubot matate"]
        ["hubot", """\n \
(҂._.)\n \
<,╤╦╤─ ҉ - - - - :huemul:\n \
/--\'\n\
"""]
      ])

  context "Escribir culiao", ->
    beforeEach (done) ->
      @room.user.say("user", "hubot culiao")
      setTimeout(done, 500)

    it "Debe entregar un ascii art", ->
      expect(@room.messages).to.eql([
        ["user", "hubot culiao"]
        ["hubot", """\n \
(҂._.)\n \
<,╤╦╤─ ҉ - - - - :huemul:\n \
/--\'\n\
"""]
      ])

  context "Escribir reculiao", ->
    beforeEach (done) ->
      @room.user.say("user", "hubot reculiao")
      setTimeout(done, 500)

    it "Debe entregar un ascii art", ->
      expect(@room.messages).to.eql([
        ["user", "hubot reculiao"]
        ["hubot", """\n \
(҂._.)\n \
<,╤╦╤─ ҉ - - - - :huemul:\n \
/--\'\n\
"""]
      ])

  context "Escribir remilculiao", ->
    beforeEach (done) ->
      @room.user.say("user", "hubot remilculiao")
      setTimeout(done, 500)

    it "Debe entregar un ascii art", ->
      expect(@room.messages).to.eql([
        ["user", "hubot remilculiao"]
        ["hubot", """\n \
(҂._.)\n \
<,╤╦╤─ ҉ - - - - :huemul:\n \
/--\'\n\
"""]
      ])
