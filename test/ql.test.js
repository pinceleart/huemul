'use strict';

const Helper = require('hubot-test-helper');
const {expect} = require('chai');
const helper = new Helper('../scripts/ql.js');

class NewMockResponse extends Helper.Response {
  random(items) {
    return '\n (҂._.)\n <,╤╦╤─ ҉ - - - - :huemul:\n /--\'\n';
  };
};

describe('ql', function() {
  beforeEach(function() {
    this.room = helper.createRoom({response: NewMockResponse});
  });
  afterEach(function() {
    this.room.destroy();
  });
  context('Escribir ql', function() {
    beforeEach(function(done) {
      this.room.user.say('user', 'hubot ql');
      setTimeout(done, 500);
    });
    it('Debe entregar un ascii art', function() {
      expect(this.room.messages).to.eql([
        ['user', 'hubot ql'],
        ['hubot', '\n (҂._.)\n <,╤╦╤─ ҉ - - - - :huemul:\n /--\'\n']
      ]);
    });
  });
  context('Escribir rql', function() {
    beforeEach(function(done) {
      this.room.user.say('user', 'hubot rql');
      setTimeout(done, 500);
    });
    it('Debe entregar un ascii art', function() {
      expect(this.room.messages).to.eql([
        ['user', 'hubot rql'],
        ['hubot', '\n (҂._.)\n <,╤╦╤─ ҉ - - - - :huemul:\n /--\'\n']
      ]);
    });
  });
  context('Escribir ctm', function() {
    beforeEach(function(done) {
      this.room.user.say('user', 'hubot ctm');
      setTimeout(done, 500);
    });
    it('Debe entregar un ascii art', function() {
      expect(this.room.messages).to.eql([
        ['user', 'hubot ctm'],
        ['hubot', '\n (҂._.)\n <,╤╦╤─ ҉ - - - - :huemul:\n /--\'\n']
      ]);
    });
  });
  context('Escribir mátate', function() {
    beforeEach(function(done) {
      this.room.user.say('user', 'hubot mátate');
      setTimeout(done, 500);
    });
    it('Debe entregar un ascii art', function() {
      expect(this.room.messages).to.eql([
        ['user', 'hubot mátate'],
        ['hubot', '\n (҂._.)\n <,╤╦╤─ ҉ - - - - :huemul:\n /--\'\n']
      ]);
    });
  });
  context('Escribir matate', function() {
    beforeEach(function(done) {
      this.room.user.say('user', 'hubot matate');
      setTimeout(done, 500);
    });
    it('Debe entregar un ascii art', function() {
      expect(this.room.messages).to.eql([
        ['user', 'hubot matate'],
        ['hubot', '\n (҂._.)\n <,╤╦╤─ ҉ - - - - :huemul:\n /--\'\n']
      ]);
    });
  });
  context('Escribir culiao', function() {
    beforeEach(function(done) {
      this.room.user.say('user', 'hubot culiao');
      setTimeout(done, 500);
    });
    it('Debe entregar un ascii art', function() {
      expect(this.room.messages).to.eql([
        ['user', 'hubot culiao'],
        ['hubot', '\n (҂._.)\n <,╤╦╤─ ҉ - - - - :huemul:\n /--\'\n']
      ]);
    });
  });
  context('Escribir reculiao', function() {
    beforeEach(function(done) {
      this.room.user.say('user', 'hubot reculiao');
      setTimeout(done, 500);
    });
    it('Debe entregar un ascii art', function() {
      expect(this.room.messages).to.eql([
        ['user', 'hubot reculiao'],
        ['hubot', '\n (҂._.)\n <,╤╦╤─ ҉ - - - - :huemul:\n /--\'\n']
      ]);
    });
  });
  context('Escribir remilculiao', function() {
    beforeEach(function(done) {
      this.room.user.say('user', 'hubot remilculiao');
      setTimeout(done, 500);
    });
    it('Debe entregar un ascii art', function() {
      expect(this.room.messages).to.eql([
        ['user', 'hubot remilculiao'],
        ['hubot', '\n (҂._.)\n <,╤╦╤─ ҉ - - - - :huemul:\n /--\'\n']
      ]);
    });
  });
});
