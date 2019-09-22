<template>
  <div class="bg-gray-100 p-4 sm:p-8 min-h-screen">
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
    if (this.player) {
      Vue.set(this.players[0], '_id', this.player._id)
      Vue.set(this.players[0], 'firstName', this.player.firstName)
      Vue.set(this.players[0], 'lastName', this.player.lastName)
      Vue.set(this.players[0], 'photo', this.player.photo)
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
      console.log(id)
      const playerSlot = this.getPlayerSlot(id)
      console.log(playerSlot)
      Vue.set(playerSlot, '_id', null)
      Vue.set(playerSlot, 'firstName', null)
      Vue.set(playerSlot, 'lastName', null)
      Vue.set(playerSlot, 'photo', null)
    },
    ...mapActions('players', ['fetchEmployees']),
    choosePlayer({ selectId, employee }) {
      const playerSlot = this.players.find(player => player.selectId === selectId)

      for (const [propName, prop] of Object.entries(employee)) Vue.set(playerSlot, propName, prop)

      this.currentlySelecting = null
    }
  }
}
</script>
