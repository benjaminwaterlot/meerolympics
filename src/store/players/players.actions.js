export default {
  fetchRanking: ({ rootGetters }) =>
    rootGetters['app/client']
      .get('players/ranking', { params: { sport: 'babyfoot' } })
      .then(({ data }) => data),

  fetchPlayer: async ({ state, commit, rootGetters }, id) => {
    const playerFound = state.players[id]
    if (playerFound) return Promise.resolve(playerFound)

    const { data } = await rootGetters['app/client'].get(`players/${id}`)
    commit('setPlayer', data)

    return data
  },

  fetchEmployees: async ({ commit, state, rootGetters }) => {
    if (state.employees.length) return Promise.resolve(state.employees)

    const { data } = await rootGetters['app/client'].get('/employees')

    return commit('setEmployees', data)
  }
}
