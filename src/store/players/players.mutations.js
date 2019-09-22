import Vue from 'vue'

export default {
  /* Players */
  setEmployees: (state, employees) => (state.employees = employees),
  setPlayer: (state, player) => Vue.set(state.players, player._id, player),
  resetPlayer: (state, playerId) => {
    Vue.set(state.players, playerId, null)
  }
}
