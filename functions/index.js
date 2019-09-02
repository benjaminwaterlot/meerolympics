const functions = require('firebase-functions')
const admin = require('firebase-admin')
const axios = require('axios')

admin.initializeApp()
console.debug(admin)

const Firestore = require('@google-cloud/firestore')

const firestore = new Firestore({
  projectId: 'champeero'
})

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions

exports.updateMembers = functions.https.onRequest(async (request, response) => {
  const BAMBOO_KEY = 'd22319294a29ce15f0500a6b87e6bd5299c1dcc9'
  const BAMBOO_DOMAIN = 'api.bamboohr.com/api/gateway.php'
  const BAMBOO_URL = `https://${BAMBOO_KEY}:x@${BAMBOO_DOMAIN}/meero/v1/employees/directory`

  const headers = {
    Accept: 'application/json'
  }

  //   const add = await firestore
  //     .collection('players')
  //     .add({ test: 'hello world!' })

  //   return response.status(200).send(add)

  const { data } = await axios.get(BAMBOO_URL, {
    headers,
    responseType: 'json'
  })

  const employees = data.employees
  if (!employees) return response.status(400).send(data)

  //   const add = await firestore.collection('employees').add()

  response.send(data)
})

exports.helloWorld = functions.https.onRequest((request, response) => {
  response.send('Hello from Firebase!')
})
