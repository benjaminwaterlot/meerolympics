import PlayersDB from '@/firebase/firestore/players-db'

export default {
  /**
   * Fetch players
   */
  fetchPlayers: async ({ commit }) => {
    const playersDB = new PlayersDB()

    const players = await playersDB.readAll()
    console.debug(players)
    commit('setPlayers', players)
  }
}
