export default {
  fetchRanking: async ({ rootGetters }) => {
    const { data } = await rootGetters['app/client'].get('players/ranking', {
      params: { sport: 'babyfoot' }
    })

    return data
  },
  fetchPlayer: async ({ state, commit, rootGetters }, id) => {
    const playerFound = state.players[id]
    if (playerFound) return playerFound

    const { data } = await rootGetters['app/client'].get(`players/${id}`)
    commit('setPlayer', data)

    return data
  },
  fetchEmployees: async ({ commit, state, rootGetters }) => {
    if (state.employees.length) return state.employees

    const { data } = await rootGetters['app/client'].get('/employees')

    return commit('setEmployees', data)
  }
  // fetchPlayer: async ({ commit, state }, id) => {
  //   if (state.players[id]) return state.players[id]

  //   const player = await new PlayersDB().read(id)
  //   return commit('setPlayer', player)
  // }
}
