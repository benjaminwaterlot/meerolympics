const functions = require('firebase-functions')
const Firestore = require('@google-cloud/firestore')
const { pick } = require('ramda')

const DB = new Firestore({
  projectId: 'champeero'
})

exports.computeEmployees = functions.firestore
  .document('players/{playerId}')
  .onCreate(async () => {
    const docs = (await DB.collection('players').get()).docs.map(doc =>
      doc.data()
    )

    const employees = docs.map(pick(['id', 'firstName', 'lastName', 'photo']))

    console.log(`${employees.length} employees updated.`)

    await DB.collection('aggregate')
      .doc('employees')
      .set({ employees })
  })
