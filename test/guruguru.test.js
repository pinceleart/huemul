'use strict';

const Helper = require('hubot-test-helper');
const {expect} = require('chai');
const helper = new Helper('../scripts/guruguru.coffee');

describe('guruguru', function() {
  beforeEach(function() {
    this.room = helper.createRoom({httpd: false});
  });
  afterEach(function() {
    this.room.destroy();
  });
  context('Traducir texto a guruguru', function() {
    beforeEach(function(done) {
      this.room.user.say('user', 'hubot guru hola mundo');
      setTimeout(done, 500);
    });
    it('Debe traducir el texto', function() {
      expect(this.room.messages).to.eql([
        ['user', 'hubot guru hola mundo'],
        ['hubot', 'hoga ñugngo']
      ]);
    });
  });
});
