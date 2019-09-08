import { path } from 'ramda'
import AggregateDB from '@/firebase/firestore/aggregate-db'

export default {
  /**
   * Fetch players
   */
  fetchPlayers: async ({ commit, state }) => {
    if (path(['players', 'length'], state)) return state.players

    const aggregateDB = new AggregateDB()

    const { players } = await aggregateDB.read('players')

    return commit('setPlayers', players)
  }
}
