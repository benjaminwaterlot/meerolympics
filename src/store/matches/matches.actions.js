// import MatchesDB from '@/firebase/firestore/matches-db'
// import generateMatchID from '@/lib/generateMatchID'

export default {
  // createMatch: async ({ commit, rootState }, players) => {
  //   const DB = new MatchesDB()
  //   const participants = players.map(({ id }) => id)
  //   // @TODO: UNMOCK THIS
  //   const teams = players.map(player => {
  //     return {
  //       id: player.team,
  //       participants: [player.id],
  //       result: 'WIN',
  //       score: 8
  //     }
  //   })
  //   const sport = rootState.settings.sport
  //   const id = generateMatchID({ participants: players, sport })
  //   return DB.create({ participants, teams, sport }, id)
  // }
}
