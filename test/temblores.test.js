'use strict';

require('coffee-script/register');
const test = require('ava');
const Helper = require('hubot-test-helper');

const helper = new Helper('../scripts/temblor.js');

class NewMockResponse extends Helper.Response {
  random(items) {
    return null;
  };
}

test.beforeEach(t => {
  t.context.room = helper.createRoom({httpd: false, response: NewMockResponse});
});
test.afterEach(t => {
  t.context.room.destroy();
});

test.cb('Es imposible que no hayan temblores sobre 6 en el mundo durante un mes.', t => {
  t.context.room.user.say('user', 'hubot temblores');
  setTimeout(() => {
    t.notDeepEqual(t.context.room.messages, [
      ['user', 'hubot temblores'],
      ['hubot', 'Por suerte, ningún temblor mayor a 6 grados en todo el mundo.']
    ]);
    t.end();
  }, 500);
});
test.cb('Lugar donde no hayan temblores. Nunca.', t => {
  t.context.room.user.say('user', 'hubot temblores enunlugardondenuncatiembla');
  setTimeout(() => {
    t.deepEqual(t.context.room.messages, [
      ['user', 'hubot temblores enunlugardondenuncatiembla'],
      ['hubot', 'Por suerte, ningún temblor mayor a 6 grados en ENUNLUGARDONDENUNCATIEMBLA.']
    ]);
    t.end();
  }, 500);
});