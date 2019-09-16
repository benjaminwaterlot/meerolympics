<template>
  <div class="bg-gray-100 p-4 sm:p-8 min-h-screen">
    <h1 class="text-3xl font-bold">Create a match</h1>

    <PlayerSelection
      v-if="currentlySelecting"
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
      { selectId: 0, team: '1' },
      { selectId: 1, team: '1' },
      { selectId: 2, team: '2' },
      { selectId: 3, team: '2' }
    ],
    settingScore: false
  }),
  computed: {
    ...mapState('authentication', ['user', 'player'])
  },
  created() {
    this.fetchEmployees()
    if (this.player) this.players[0] = { ...this.players[0], ...this.player }
  },
  methods: {
    startPlayerSelection(id) {
      this.currentlySelecting = id
    },
    getPlayerSlot(id) {
      console.log(id)
      return this.players.find(({ selectId }) => selectId === id)
    },
    deselect(id) {
      // const idx = this.players.findIndex(({ selectId }) => selectId === id)
      // const { selectId, team } = this.players[idx]
      // this.players[idx] = { selectId, team }
      // const playerSlot = this.getPlayerSlot(id)
      const playerSlot = this.getPlayerSlot(id)
      Vue.set(playerSlot, '_id', null)
      Vue.set(playerSlot, 'firstName', null)
      Vue.set(playerSlot, 'lastName', null)
      Vue.set(playerSlot, 'photo', null)
    },
    ...mapActions('players', ['fetchEmployees']),
    choosePlayer({ selectId, employee }) {
      const playerSlot = this.players.find(
        player => player.selectId === selectId
      )

      for (const [propName, prop] of Object.entries(employee))
        Vue.set(playerSlot, propName, prop)

      this.currentlySelecting = null
    }
  }
}
</script>
