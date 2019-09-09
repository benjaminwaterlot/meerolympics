const functions = require('firebase-functions')
const Firestore = require('@google-cloud/firestore')

const DB = new Firestore({
  projectId: 'champeero'
})

exports.helloWorld = functions.https.onRequest(async (request, response) => {
  const test = (await DB.collection('players').get()).docs.map(doc =>
    doc.data()
  )

  console.log(test)
  response.status(200).send(test)
})
