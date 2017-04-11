'use strict';

const Helper = require('hubot-test-helper');
const {expect} = require('chai');
const helper = new Helper('../scripts/lmgtfy.coffee');

class NewMockResponse extends Helper.Response {
  random(items) {
    return '¿Era muy difícil? :wntard:';
  };
};

describe('lmgtfy', function() {
  beforeEach(function() {
    this.room = helper.createRoom({
      response: NewMockResponse
    });
  });
  afterEach(function() {
    this.room.destroy();
  });
  context('Preguntar a google', function() {
    beforeEach(function(done) {
      this.room.user.say('user', 'hubot google como testear');
      setTimeout(done, 500);
    });
    it('Debe entregar una sugerencia', function() {
      expect(this.room.messages).to.eql([
        ['user', 'hubot google como testear'],
        ['hubot', 'http://lmgtfy.com/?q=como%20testear\n¿Era muy difícil? :wntard:']
      ]);
    });
  });
  context('Preguntar a lmgtfy por un usuario', function() {
    beforeEach(function(done) {
      this.room.user.say('user', 'hubot lmgtfy @user como testear');
      setTimeout(done, 500);
    });
    it('Debe entregar una sugerencia', function() {
      expect(this.room.messages).to.eql([
        ['user', 'hubot lmgtfy @user como testear'],
        ['hubot', 'user: http://lmgtfy.com/?q=como%20testear\n¿Era muy difícil? :wntard:']
      ]);
    });
  });
});
