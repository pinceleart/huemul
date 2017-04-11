'use strict';

const Helper = require('hubot-test-helper');
const {expect} = require('chai');
const helper = new Helper('../scripts/kendrick.coffee');

class NewMockResponse extends Helper.Response {
  random(items) {
    return 'http://i.giphy.com/bZkQ55qlfrwgE.gif';
  };
};

describe('kendrick', function() {
  beforeEach(function() {
    this.room = helper.createRoom({response: NewMockResponse});
  });
  afterEach(function() {
    this.room.destroy();
  });
  context('Obtener un imagen random', function() {
    beforeEach(function(done) {
      this.room.user.say('user', 'hubot anna');
      setTimeout(done, 500);
    });
    it('Debe entregar una imagen', function() {
      expect(this.room.messages).to.eql([
        ['user', 'hubot anna'],
        ['hubot', 'http://i.giphy.com/bZkQ55qlfrwgE.gif']
      ]);
    });
  });
});
