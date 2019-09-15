<template>
  <div class="bg-gray-100 p-4 sm:p-8 min-h-screen">
    <h1 class="text-3xl font-bold">Create a match</h1>

    <span v-if="currentlySelecting">Player selection screen</span>
    <PlayersDisplay v-else :players="players" @select="startPlayerSelection" />
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import PlayersDisplay from './PlayersDisplay'

export default {
  name: 'CreateMatch',
  components: {
    PlayersDisplay
  },
  data: () => ({
    currentlySelecting: null,
    players: [
      { selectId: 0, team: '1' },
      { selectId: 1, team: '1' },
      { selectId: 2, team: '2' },
      { selectId: 3, team: '2' }
    ]
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
    ...mapActions('players', ['fetchEmployees'])
  }
}
</script>
