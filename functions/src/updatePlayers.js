const axios = require('axios')
const functions = require('firebase-functions')
const Firestore = require('@google-cloud/firestore')
const { pick } = require('ramda')

const DB = new Firestore({
  projectId: 'champeero'
})

exports.updatePlayers = functions.https.onRequest(async (request, response) => {
  const BAMBOO_KEY = 'd22319294a29ce15f0500a6b87e6bd5299c1dcc9'

  const { data } = await axios.get(
    `https://${BAMBOO_KEY}:x@api.bamboohr.com/api/gateway.php/meero/v1/employees/directory`,
    {
      headers: {
        Accept: 'application/json'
      },
      responseType: 'json'
    }
  )

  const employees = data.employees
    .filter(({ location }) => location === 'Paris')
    .map(({ id, firstName, lastName, photoUrl, workEmail }) => ({
      id,
      firstName,
      lastName,
      photo: photoUrl,
      email: workEmail
    }))

  if (!(employees && employees.length)) return response.status(400).send(data)

  const batch = DB.batch()

  employees.forEach(employee => {
    batch.set(DB.collection('players').doc(employee.id), employee)
  })

  return batch.commit().then(data => response.send(data))
})
