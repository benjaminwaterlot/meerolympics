export default {
  fetchMatches: ({ rootGetters, rootState }, player) =>
    rootGetters['app/client']
      .get('matches', { params: { sport: rootState.settings.sport, player } })
      .then(({ data }) => data),

  submitMatch: async ({ rootGetters, commit, rootState }, match) => {
    // Create the match object for back-end use.
    const participants = match.participants.map(({ _id, team }) => ({
      player: _id,
      team,
      result: match.winner === team ? 'win' : 'loss',
      score: Number(match.scores[team] || 0)
    }))

    const { data } = await rootGetters['app/client'].post('/matches', {
      match: { participants, sport: rootState.settings.sport }
    })

    // Remove players from local store: their elo has changed, data is obsolete.
    match.participants.map(({ _id }) => commit('players/resetPlayer', _id, { root: true }))

    return data
  }
}
