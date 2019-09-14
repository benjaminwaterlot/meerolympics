import AggregateDB from '@/firebase/firestore/aggregate-db'
import PlayersDB from '@/firebase/firestore/players-db'

export default {
  fetchRanking: async ({ rootGetters }) => {
    const { data } = await rootGetters['app/client'].get('players/ranking', {
      params: { sport: 'babyfoot' }
    })

    return data
  },
  /**
   * Fetch players
   */
  fetchEmployees: async ({ commit, state }) => {
    if (state.employees.length) return state.employees

    const { employees } = await new AggregateDB().read('employees')

    return commit('setEmployees', employees)
  },
  fetchPlayer: async ({ commit, state }, id) => {
    if (state.players[id]) return state.players[id]

    const player = await new PlayersDB().read(id)
    return commit('setPlayer', player)
  }
}
