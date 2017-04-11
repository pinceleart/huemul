'use strict';

const Helper = require('hubot-test-helper');
const {expect} = require('chai');
const helper = new Helper('../scripts/pinera.coffee');

class NewMockResponse extends Helper.Response {
  random(items) {
    return 'https://pbs.twimg.com/media/Cy7cN3QWIAAP7pR.jpg';
  };
};

describe('pinera', function() {
  beforeEach(function() {
    this.room = helper.createRoom({response: NewMockResponse});
  });
  afterEach(function() {
    this.room.destroy();
  });
  context('Escribir piñera', function() {
    beforeEach(function(done) {
      this.room.user.say('user', 'piñera');
      setTimeout(done, 500);
    });
    it('Debe entregar una imagen', function() {
      expect(this.room.messages).to.eql([
        ['user', 'piñera'],
        ['hubot', 'https://pbs.twimg.com/media/Cy7cN3QWIAAP7pR.jpg']
      ]);
    });
  });
  context('Escribir yeta', function() {
    beforeEach(function(done) {
      this.room.user.say('user', 'yeta');
      setTimeout(done, 500);
    });
    it('Debe entregar una imagen', function() {
      expect(this.room.messages).to.eql([
        ['user', 'yeta'],
        ['hubot', 'https://pbs.twimg.com/media/Cy7cN3QWIAAP7pR.jpg']
      ]);
    });
  });
});
