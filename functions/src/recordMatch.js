const functions = require('firebase-functions')
const Firestore = require('@google-cloud/firestore')
const validate = require('./lib/validate')

const DB = new Firestore({
  projectId: 'champeero'
})
const PLAYERS = DB.collection('players')

exports.recordMatch = functions.https.onRequest(async (request, response) => {
  const { match } = request.body

  // Validate the body input
  const { valid, details } = validate(match, 'match')
  if (!valid) return response.status(400).send(details.errors)

  // Get the reference of participants in Firestore
  const participantsRefs = match.participants.map(playerId =>
    PLAYERS.doc(playerId)
  )

  // Fetch the player documents
  const participants = await Promise.all(
    participantsRefs.map(async ref => (await ref.get()).data())
  )

  // @TODO: REAL DELTA :)
  const DELTA = () => Math.floor(Math.random() * 20)

  // Compute the player updates to apply
  const updates = participants.map(({ id, BABYFOOT = { elo: 1200 } }) => ({
    id,
    BABYFOOT: { ...BABYFOOT, elo: BABYFOOT.elo + DELTA() }
  }))

  // Launch the transaction, updating all players
  const tr = await DB.runTransaction(transaction =>
    Promise.all(
      updates.map(({ id, BABYFOOT }) =>
        transaction.update(PLAYERS.doc(id), { BABYFOOT })
      )
    )
  )

  response.status(200).send(tr)
})
