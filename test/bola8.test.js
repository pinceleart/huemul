'use strict';

const Helper = require('hubot-test-helper');
const {expect} = require('chai');
const helper = new Helper('../scripts/bola8.js');

class NewMockResponse extends Helper.Response {
  random(items) {
    return 'Sin duda';
  };
}

describe('bola8', function() {
  beforeEach(function() {
    this.room = helper.createRoom({
      response: NewMockResponse
    });
  });
  afterEach(function() {
    this.room.destroy();
  });
  context('Preguntar a hubot', function() {
    beforeEach(function(done) {
      this.room.user.say('user', 'hubot pregunta sere el mejor bot');
      setTimeout(done, 500);
    });
    it('Debe entregar una respuesta', function() {
      expect(this.room.messages).to.eql([
        ['user', 'hubot pregunta sere el mejor bot'],
        ['hubot', ':huemul: ~ Sin duda']
      ]);
    });
  });
  context('Pedir consejo a hubot', function() {
    beforeEach(function(done) {
      this.room.user.say('user', 'hubot consejo como puedo ser mejor');
      setTimeout(done, 500);
    });
    it('Debe entregar un consejo', function() {
      expect(this.room.messages).to.eql([
        ['user', 'hubot consejo como puedo ser mejor'],
        ['hubot', ':huemul: ~ Sin duda']
      ]);
    });
  });
});
