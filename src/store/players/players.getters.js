export default {
  getPlayer: state => playerId => state.players[playerId],

  getEmployee: state => playerId => state.employees.find(({ _id }) => _id === playerId),

  getEmployeeOrPlayer: (state, getters) => playerId =>
    getters.getPlayer(playerId) || getters.getEmployee(playerId)
}
