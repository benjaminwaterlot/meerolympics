const functions = require('firebase-functions')
const Firestore = require('@google-cloud/firestore')

const DB = new Firestore({
  projectId: 'champeero'
})

exports.addBabyfoot = functions.https.onRequest(async (request, response) => {
  const updateBatch = DB.batch()

  const players = await DB.collection('players').get()

  players.docs.forEach(emp => {
    updateBatch.update(emp.ref, {
      BABYFOOT: { elo: 1200 }
    })
  })

  await updateBatch.commit()

  response.status(200).send('OK')
})
