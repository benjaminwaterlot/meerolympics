export default {
  submitMatch: async ({ rootGetters, commit }, match) => {
    const participants = match.participants.map(player => {
      return {
        player: player._id,
        team: player.team,
        result: match.winner === player.team ? 'win' : 'loss',
        score: Number(match.scores[player.team] || 0)
      }
    })

    const sport = 'babyfoot'

    const req = await rootGetters['app/client'].post('/matches', {
      match: { participants, sport }
    })

    match.participants.map(({ _id }) =>
      commit('players/resetPlayer', _id, { root: true })
    )

    return req.data
  }
}
