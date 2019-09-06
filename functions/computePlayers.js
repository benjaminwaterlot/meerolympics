const functions = require('firebase-functions')
const Firestore = require('@google-cloud/firestore')

const DB = new Firestore({
  projectId: 'champeero'
})

exports.computePlayers = functions.firestore
  .document('players/{playerId}')
  .onWrite(async () => {
    const players = await DB.collection('players').get()

    console.debug('players', players)

    await DB.collection('aggregate')
      .doc('players')
      .set(players)

    const res = await DB.collection('aggregate')
      .doc('players')
      .get()

    console.debug(res)
  })
