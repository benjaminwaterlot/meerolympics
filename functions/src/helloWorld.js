const functions = require('firebase-functions')
const Firestore = require('@google-cloud/firestore')

const DB = new Firestore({
  projectId: 'champeero'
})

exports.helloWorld = functions.https.onRequest(async (request, response) => {
  const addPlayers = await DB.collection('players').add({
    message: 'hello world'
  })
  const players = (await DB.collection('players').get()).docs.map(p => p.data())
  response.status(200).send(JSON.stringify(players, null, 10))
})
