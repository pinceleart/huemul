'use strict';

const Helper = require('hubot-test-helper');
const {expect} = require('chai');
const helper = new Helper('../scripts/nosvimoh.coffee');

class NewMockResponse extends Helper.Response {
  random(items) {
    return 'https://memecrunch.com/meme/B521D/chao-nos-vimo/image.gif';
  };
};

describe('nosvimoh', function() {
  beforeEach(function() {
    this.room = helper.createRoom({response: NewMockResponse});
  });
  afterEach(function() {
    this.room.destroy();
  });
  context('Escribir nosvimo', function() {
    beforeEach(function(done) {
      this.room.user.say('user', 'hubot nosvimo');
      setTimeout(done, 500);
    });
    it('Debe entregar una imagen', function() {
      expect(this.room.messages).to.eql([
        ['user', 'hubot nosvimo'],
        ['hubot', 'https://memecrunch.com/meme/B521D/chao-nos-vimo/image.gif']
      ]);
    });
  });
});
