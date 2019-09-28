<template>
  <div class="bg-gray-100 p-4 sm:p-8 min-h-screen">
    <PlayerSelection
      v-if="currentlySelecting !== null"
      :select-id="currentlySelecting"
      :players="players"
      @choose="choosePlayer"
    />
    <PlayersScore v-else-if="settingScore" :players="players" />
    <PlayersDisplay
      v-else
      :players="players"
      @select="startPlayerSelection"
      @cancel="deselect"
      @start="settingScore = true"
    />
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import Vue from 'vue'
import PlayersDisplay from './PlayersDisplay'
import PlayerSelection from './PlayerSelection'
import PlayersScore from './PlayersScore'

export default {
  name: 'CreateMatch',
  components: {
    PlayersDisplay,
    PlayersScore,
    PlayerSelection
  },
  data: () => ({
    currentlySelecting: null,
    players: [
      { selectId: 0, team: '1', _id: null },
      { selectId: 1, team: '1', _id: null },
      { selectId: 2, team: '2', _id: null },
      { selectId: 3, team: '2', _id: null }
    ],
    settingScore: false
  }),
  computed: {
    ...mapState('authentication', ['user', 'player'])
  },
  created() {
    this.fetchEmployees()
    if (this.player) {
      Vue.set(this.players[0], '_id', this.player._id)
    }
  },
  methods: {
    startPlayerSelection(id) {
      this.currentlySelecting = id
    },
    getPlayerSlot(id) {
      return this.players.find(({ selectId }) => selectId === id)
    },
    deselect(id) {
      const playerSlot = this.getPlayerSlot(id)
      console.log(playerSlot)
      Vue.set(playerSlot, '_id', null)
    },
    ...mapActions('players', ['fetchEmployees']),
    choosePlayer({ selectId, employee }) {
      const playerSlot = this.players.find(player => player.selectId === selectId)

      Vue.set(playerSlot, '_id', employee._id)

      this.currentlySelecting = null
    }
  }
}
</script>
