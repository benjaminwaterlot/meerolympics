// import PlayersDB from '@/firebase/firestore/players-db'
import AggregateDB from '@/firebase/firestore/aggregate-db'

export default {
  /**
   * Fetch players
   */
  fetchPlayers: async ({ commit }) => {
    const aggregateDB = new AggregateDB()

    const { players } = await aggregateDB.read('players')
    console.debug(players)
    commit('setPlayers', players)
  }
}
