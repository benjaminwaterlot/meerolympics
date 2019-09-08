const functions = require('firebase-functions')
const Firestore = require('@google-cloud/firestore')
const { pick } = require('ramda')

const DB = new Firestore({
  projectId: 'champeero'
})

exports.computePlayers = functions.firestore
  .document('players/{playerId}')
  .onCreate(async () => {
    const docs = (await DB.collection('players').get()).docs.map(doc =>
      doc.data()
    )

    const players = docs.map(pick(['id', 'firstName', 'lastName', 'photo']))

    console.log(`${players.length} players updated.`)

    await DB.collection('aggregate')
      .doc('players')
      .set({ players: players })
  })
