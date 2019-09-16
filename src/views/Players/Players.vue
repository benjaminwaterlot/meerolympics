<template>
  <div class="bg-gray-200 p-4 sm:p-8 min-h-screen">
    <h1 class="text-3xl font-bold text-center">Classement général</h1>
    <PlayerItem v-for="player in players" :key="player._id" v-bind="player" />
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import PlayerItem from './PlayerItem.vue'

export default {
  name: 'Players',
  components: {
    PlayerItem
  },
  props: {},
  data: () => ({
    players: []
  }),
  computed: {
    ...mapState('app', ['networkOnLine']),
    ...mapState('settings', ['sport'])
  },
  created() {
    this.fetchPlayers()
  },
  methods: {
    ...mapActions('players', ['fetchRanking']),
    async fetchPlayers() {
      this.players = await this.fetchRanking()
    }
  }
}
</script>
