'use strict';

const Helper = require('hubot-test-helper');
const {expect} = require('chai');
const helper = new Helper('../scripts/que_almorzar.coffee');

class NewMockResponse extends Helper.Response {
  random(items) {
    return 'cerveza';
  };
};

describe('que_almorzar', function() {
  beforeEach(function() {
    this.room = helper.createRoom({response: NewMockResponse});
  });
  afterEach(function() {
    this.room.destroy();
  });
  context('Consultar qué desayunar', function() {
    beforeEach(function(done) {
      this.room.user.say('user', 'hubot qué desayunar');
      setTimeout(done, 500);
    });
    it('Debe entregar una sugerencia', function() {
      expect(this.room.messages).to.eql([
        ['user', 'hubot qué desayunar'],
        ['hubot', 'Te sugiero: cerveza']
      ]);
    });
  });
  context('Consultar que desayunar', function() {
    beforeEach(function(done) {
      this.room.user.say('user', 'hubot que desayunar');
      setTimeout(done, 500);
    });
    it('Debe entregar una sugerencia', function() {
      expect(this.room.messages).to.eql([
        ['user', 'hubot que desayunar'],
        ['hubot', 'Te sugiero: cerveza']
      ]);
    });
  });
  context('Consultar qué almorzar', function() {
    beforeEach(function(done) {
      this.room.user.say('user', 'hubot qué almorzar');
      setTimeout(done, 500);
    });
    it('Debe entregar una sugerencia', function() {
      expect(this.room.messages).to.eql([
        ['user', 'hubot qué almorzar'],
        ['hubot', 'Te sugiero: cerveza']
      ]);
    });
  });
  context('Consultar que almorzar', function() {
    beforeEach(function(done) {
      this.room.user.say('user', 'hubot que almorzar');
      setTimeout(done, 500);
    });
    it('Debe entregar una sugerencia', function() {
      expect(this.room.messages).to.eql([
        ['user', 'hubot que almorzar'],
        ['hubot', 'Te sugiero: cerveza']
      ]);
    });
  });
  context('Consultar qué cenar', function() {
    beforeEach(function(done) {
      this.room.user.say('user', 'hubot qué cenar');
      setTimeout(done, 500);
    });
    it('Debe entregar una sugerencia', function() {
      expect(this.room.messages).to.eql([
        ['user', 'hubot qué cenar'],
        ['hubot', 'Para el *anvre*: cerveza']
      ]);
    });
  });
  context('Consultar que cenar', function() {
    beforeEach(function(done) {
      this.room.user.say('user', 'hubot que cenar');
      setTimeout(done, 500);
    });
    it('Debe entregar una sugerencia', function() {
      expect(this.room.messages).to.eql([
        ['user', 'hubot que cenar'],
        ['hubot', 'Para el *anvre*: cerveza']
      ]);
    });
  });
  context('Consultar qué tomar', function() {
    beforeEach(function(done) {
      this.room.user.say('user', 'hubot qué tomar');
      setTimeout(done, 500);
    });
    it('Debe entregar una sugerencia', function() {
      expect(this.room.messages).to.eql([
        ['user', 'hubot qué tomar'],
        ['hubot', 'Si tienes sed: cerveza']
      ]);
    });
  });
  context('Consultar que tomar', function() {
    beforeEach(function(done) {
      this.room.user.say('user', 'hubot que tomar');
      setTimeout(done, 500);
    });
    it('Debe entregar una sugerencia', function() {
      expect(this.room.messages).to.eql([
        ['user', 'hubot que tomar'],
        ['hubot', 'Si tienes sed: cerveza']
      ]);
    });
  });
  context('Consultar qué cerveza tomar', function() {
    beforeEach(function(done) {
      this.room.user.say('user', 'hubot qué cerveza tomar');
      setTimeout(done, 500);
    });
    it('Debe entregar una sugerencia', function() {
      expect(this.room.messages).to.eql([
        ['user', 'hubot qué cerveza tomar'],
        ['hubot', 'Si tienes sed: cerveza']
      ]);
    });
  });
  context('Consultar que cerveza tomar', function() {
    beforeEach(function(done) {
      this.room.user.say('user', 'hubot que cerveza tomar');
      setTimeout(done, 500);
    });
    it('Debe entregar una sugerencia', function() {
      expect(this.room.messages).to.eql([
        ['user', 'hubot que cerveza tomar'],
        ['hubot', 'Si tienes sed: cerveza']
      ]);
    });
  });
  context('Consultar qué comer', function() {
    beforeEach(function(done) {
      this.room.user.say('user', 'hubot qué comer');
      setTimeout(done, 500);
    });
    it('Debe entregar una sugerencia', function() {
      expect(this.room.messages).to.eql([
        ['user', 'hubot qué comer'],
        ['hubot', 'Depende de la comida para: *desayunar*, *almorzar* ó *cenar*. Pregúntame de nuevo.']
      ]);
    });
  });
  context('Consultar que comer', function() {
    beforeEach(function(done) {
      this.room.user.say('user', 'hubot que comer');
      setTimeout(done, 500);
    });
    it('Debe entregar una sugerencia', function() {
      expect(this.room.messages).to.eql([
        ['user', 'hubot que comer'],
        ['hubot', 'Depende de la comida para: *desayunar*, *almorzar* ó *cenar*. Pregúntame de nuevo.']
      ]);
    });
  });
});
