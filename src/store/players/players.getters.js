import { find } from 'lodash'

export default {
  getPlayer: state => playerId => state.players[playerId]
}
