const axios = require('axios')
const functions = require('firebase-functions')

exports.updatePlayers = functions.https.onRequest(async (request, response) => {
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

  const employees = data.employees.filter(
    ({ location }) => location === 'Paris'
  )

  if (!(employees && employees.length)) return response.status(400).send(data)

  // const sample = employees
  // .slice(0, 10)
  // const batch = firestore.batch()

  // sample.forEach(employee => {
  //   batch.set(firestore.collection('players').doc(employee.id), employee)
  // })

  // return batch.commit().then(res => response.send(res))

  //   const add = await firestore.collection('employees').add()

  //   response.send(data)
})
