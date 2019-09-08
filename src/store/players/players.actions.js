import PlayersDB from '@/firebase/firestore/players-db'

export default {
  /**
   * Fetch players
   */
  fetchPlayers: async ({ commit }) => {
    const aggregateDB = new PlayersDB()

    const players = await aggregateDB.readAll()
    console.debug(players)
    commit('setPlayers', players)
  }
}
