import 'coffee-script/register'
import test from 'ava'
import Helper from 'hubot-test-helper'

const helper = new Helper('../scripts/torrent.js')
const sleep = m => new Promise(resolve => setTimeout(() => resolve(), m))

test.beforeEach(t => {
  t.context.room = helper.createRoom({httpd: false})
})

test.afterEach(t => t.context.room.destroy())

test('Torrent de Titanic', async t => {
  t.context.room.user.say('user', 'hubot torrent titanic')
  await sleep(5000)

  const user = t.context.room.messages[0]
  const hubotMessage1 = t.context.room.messages[1]
  const hubotMessage2 = t.context.room.messages[2]

  // test message of user
  t.deepEqual(user, ['user', 'hubot torrent titanic'])

  // test response messages of hubot
  const text = `Encontradas 2 coincidencias:
<https://yts.am/movie/titanic-1997|Titanic: año: 1997, rating: 7.8>
<https://yts.am/movie/titanic-1953|Titanic: año: 1953, rating: 7.2>
Todos los resultados en *<https://yts.ag/browse-movies/titanic|yts.arg>*`
  t.deepEqual(hubotMessage2, ['hubot', text])
})
