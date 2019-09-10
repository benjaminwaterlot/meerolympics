const functions = require('firebase-functions')
const Firestore = require('@google-cloud/firestore')
const { propEq, equals } = require('ramda')
const validate = require('./lib/validate')

const DB = new Firestore({
  projectId: 'champeero'
})
const PLAYERS = DB.collection('players')
const START_ELO = 1200

exports.recordMatch = functions.https.onRequest(async (request, response) => {
  const { match } = request.body

  // Validate the body input
  const { valid, validation } = validate(match, 'match')
  if (!valid) return response.status(400).send(validation.errors)

  // Get the reference of participants in Firestore
  const participantsRefs = match.participants.map(playerId =>
    PLAYERS.doc(playerId)
  )

  // Fetch the player documents
  const participants = await Promise.all(
    participantsRefs.map(async ref => (await ref.get()).data())
  )

  const populatedTeams = match.teams.map(({ participants: p }) =>
    p.map(id => {
      console.log(JSON.stringify(id))
      console.log('pars', JSON.stringify(participants.find(propEq('id', id))))
      return participants.find(equals(id))
    })
  )

  console.log(JSON.stringify(populatedTeams))

  // const team1Elo = match.teams
  //   .find(propEq('id', '1'))
  //   .participants.reduce(
  //     (acc, partId) =>
  //       acc + participants.find(propEq('id', partId)).BABYFOOT.elo,
  //     0
  //   )
  // console.log(JSON.stringify(team1Elo))
  // console.log(JSON.stringify(participants))

  // const teams = participants.reduce((acc, player) => {

  // }, [])

  // const team1Chance =

  // @TODO: REAL DELTA For each player :)
  const DELTA = () => Math.floor(Math.random() * 20)

  // Compute the player updates to apply
  const updates = participants.map(({ id, BABYFOOT = { elo: START_ELO } }) => ({
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
