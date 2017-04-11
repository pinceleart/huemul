'use strict';

const Helper = require('hubot-test-helper');
const {expect} = require('chai');
const helper = new Helper('../scripts/invierte.js');

describe('invierte', function() {
  beforeEach(function() {
    this.room = helper.createRoom({httpd: false});
  });
  afterEach(function() {
    this.room.destroy();
  });
  context('Invertir texto', function() {
    beforeEach(function(done) {
      this.room.user.say('user', 'hubot invierte hola mundo');
      setTimeout(done, 500);
    });
    it('Debe entregar el texto invertido', function() {
      expect(this.room.messages[0]).to.eql(['user', 'hubot invierte hola mundo']);
      expect(this.room.messages[1][1]).to.match(/\u006F\u0070\u0075\u0075\u026F\ \u0250\u0283\u006F\u0265/);
    });
  });
});
