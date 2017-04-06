'use strict';

const Helper = require('hubot-test-helper');
const {expect} = require('chai');
const helper = new Helper('../scripts/alegria.coffee');

class NewMockResponse extends Helper.Response {
  random(items) {
    return 'http://i.imgur.com/1CVUXQE.jpg';
  };
}

describe('alegria', function() {
  beforeEach(function() {
    this.room = helper.createRoom({
      response: NewMockResponse
    });
  });
  afterEach(function() {
    this.room.destroy();
  });
  context('Obtener un imagen con el comando hubot alegria', function() {
    beforeEach(function(done) {
      this.room.user.say('user', 'hubot alegria');
      setTimeout(done, 500);
    });
    it('Debe entregar una imagen', function() {
      expect(this.room.messages).to.eql([
        ['user', 'hubot alegria'],
        ['hubot', 'http://i.imgur.com/1CVUXQE.jpg']
      ]);
    });
  });
  context('Obtener un imagen con el comando hubot alegría', function() {
    beforeEach(function(done) {
      this.room.user.say('user', 'hubot alegría');
      setTimeout(done, 500);
    });
    it('Debe entregar una imagen', function() {
      expect(this.room.messages).to.eql([['user', 'hubot alegría'], ['hubot', 'http://i.imgur.com/1CVUXQE.jpg']]);
    });
  });
  context('Obtener un imagen con el comando hubot alegrame', function() {
    beforeEach(function(done) {
      this.room.user.say('user', 'hubot alegrame');
      setTimeout(done, 500);
    });
    it('Debe entregar una imagen', function() {
      expect(this.room.messages).to.eql([
        ['user', 'hubot alegrame'],
        ['hubot', 'http://i.imgur.com/1CVUXQE.jpg']
      ]);
    });
  });
  context('Obtener un imagen con el comando hubot alégrame', function() {
    beforeEach(function(done) {
      this.room.user.say('user', 'hubot alégrame');
      setTimeout(done, 500);
    });
    it('Debe entregar una imagen', function() {
      expect(this.room.messages).to.eql([
        ['user', 'hubot alégrame'],
        ['hubot', 'http://i.imgur.com/1CVUXQE.jpg']]);
    });
  });
  context('Obtener un imagen con el comando hubot felicidad', function() {
    beforeEach(function(done) {
      this.room.user.say('user', 'hubot felicidad');
      setTimeout(done, 500);
    });
    it('Debe entregar una imagen', function() {
      expect(this.room.messages).to.eql([
        ['user', 'hubot felicidad'],
        ['hubot', 'http://i.imgur.com/1CVUXQE.jpg']
      ]);
    });
  });
  context('Obtener un imagen con el comando hubot feliz', function() {
    beforeEach(function(done) {
      this.room.user.say('user', 'hubot feliz');
      setTimeout(done, 500);
    });
    it('Debe entregar una imagen', function() {
      expect(this.room.messages).to.eql([
        ['user', 'hubot feliz'],
        ['hubot', 'http://i.imgur.com/1CVUXQE.jpg']
      ]);
    });
  });
  context('Obtener un imagen con el comando hubot yay', function() {
    beforeEach(function(done) {
      this.room.user.say('user', 'hubot yay');
      setTimeout(done, 500);
    });
    it('Debe entregar una imagen', function() {
      expect(this.room.messages).to.eql([
        ['user', 'hubot yay'],
        ['hubot', 'http://i.imgur.com/1CVUXQE.jpg']
      ]);
    });
  });
});
