import MatchesDB from '@/firebase/firestore/matches-db'
import generateMatchID from '@/lib/generateMatchID'

export default {
  createMatch: async ({ commit, rootState }, players) => {
    const DB = new MatchesDB()

    const participants = players.map(({ id }) => id)
    // @TODO: THIS CANT SCALE TO MORE THAN 2 players
    const teams = players.map(player => {
      return {
        id: player.team,
        participants: [player.id],
        result: 'WIN',
        score: 8
      }
    })
    const sport = rootState.settings.sport

    const id = generateMatchID({ participants: players, sport })

    const createdMatch = await DB.create({ participants, teams, sport }, id)
    return createdMatch
  }
}
