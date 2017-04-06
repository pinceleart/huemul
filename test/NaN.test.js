'use strict';

require('coffee-script/register')
const Helper = require('hubot-test-helper');
const {expect} = require('chai');
const helper = new Helper('../scripts/NaN.js');

describe('NaN', () => {
  beforeEach(() => {
    this.room = helper.createRoom({httpd: false});
  });
  afterEach(() => {
    this.room.destroy();
  });
  context('Obtener un imagen random', () => {
    beforeEach((done) => {
      this.room.user.say('user', 'NaN');
      setTimeout(done, 500);
    });
    it('Debe entregar una imagen', () => {
      expect(this.room.messages).to.eql([['user', 'NaN'], ['hubot', 'NaNNaNNaNNaNNaNNaNNaNNaNNaNNaNNaNNaNNaNNaNNaN Batman! ~ :huemul:']]);
    });
  });
});
