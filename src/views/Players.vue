<template>
  <div class="page-wrapper">
    <h1 class="players-page-title">Players page</h1>
    <div>
      <div v-for="player in players" :key="player.id">
        {{ player.firstName }} =>
        {{ player.sports.find(({ id }) => id === 'babyfoot').elo }}
      </div>
    </div>
    <!-- <players-list class="players-list"></players-list>
    <add-product v-if="networkOnLine"></add-product> -->
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  data: () => ({
    players: []
  }),
  computed: mapState('app', ['networkOnLine']),
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

<style lang="scss" scoped>
@import '@/theme/variables.scss';

.players-page-title {
  text-align: center;
  margin-bottom: 60px;
}

.players-list {
  margin: 20px 0;
}
</style>
