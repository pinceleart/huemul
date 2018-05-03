import 'coffee-script/register';
import test from 'ava';
import Helper from 'hubot-test-helper';
import nock from 'nock'

const helper = new Helper('../scripts/noticias.js');
const sleep = m => new Promise(resolve => setTimeout(() => resolve(), m));

test.beforeEach(t => {
  t.context.room = helper.createRoom({httpd: false});
});

test.afterEach(t => t.context.room.destroy());

test('Debe entregar mensaje de error', async t => {
  nock('http://search.24horas.cl')
    .get('/search/')
    .query({q: 'game of thrones'})
    .reply(200, 'Code ID: 503')
  t.context.room.user.say('user', 'hubot noticias game of thrones');
  await sleep(500);

  const user = t.context.room.messages[0];
  const hubot = t.context.room.messages[1];

  t.deepEqual(user, ['user', 'hubot noticias game of thrones']);
  t.deepEqual(hubot, [
    'hubot',
    '@user ocurrió un error con la búsqueda'
  ])
});
