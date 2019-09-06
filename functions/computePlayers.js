const functions = require('firebase-functions')
const Firestore = require('@google-cloud/firestore')

const DB = new Firestore({
  projectId: 'champeero'
})

exports.computePlayers = functions.firestore
  .document('players/{playerId}')
  .onWrite(async () => {
    const raw = await DB.collection('players').get()
    const players = []
    raw.forEach(doc => players.push(doc.data()))

    // console.debug('players', players)

    await DB.collection('aggregate')
      .doc('players')
      .set({ players: players })

    const res = await DB.collection('aggregate')
      .doc('players')
      .get()

    console.debug(res)
  })
