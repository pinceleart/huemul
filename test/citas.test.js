'use strict';

const Helper = require('hubot-test-helper');
const {expect} = require('chai');
const helper = new Helper('../scripts/citas.js');

class NewMockResponse extends Helper.Response {
  random(items) {
    return '> Lo bien hecho es mejor que lo bien dicho. *-Benjamin Franklin*';
  };
}

describe('citas', function() {
  beforeEach(function() {
    this.room = helper.createRoom({response: NewMockResponse});
  });
  afterEach(function() {
    this.room.destroy();
  });
  context('Pedir una cita', function() {
    beforeEach(function(done) {
      this.room.user.say('user', 'hubot una cita');
      setTimeout(done, 500);
    });
    it('Debe entregar una cita', function() {
      expect(this.room.messages).to.eql([
        ['user', 'hubot una cita'],
        ['hubot', '> Lo bien hecho es mejor que lo bien dicho. *-Benjamin Franklin*']
      ]);
    });
  });
});
