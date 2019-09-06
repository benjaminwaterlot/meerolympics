<template>
  <div>
    <p v-if="players === null" class="infos-label">Loading...</p>
    <p v-if="players && !players.length" class="infos-label">
      You don't have any player yet
    </p>
    <div
      v-for="(player, index) in players"
      :key="player.id"
      class="player-row"
      :index="index"
      :data="player"
    >
      {{ `${player.firstName} ${player.lastName}` }}
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  computed: {
    ...mapState('players', ['players'])
  },
  created() {
    this.fetchPlayers()
  },
  methods: {
    ...mapActions('players', ['fetchPlayers'])
  }
}
</script>

<style lang="scss" scoped>
@import '@/theme/variables.scss';

.infos-label {
  text-align: center;
}

.player-row {
  display: flex;
  align-items: center;
  width: 100%;
  max-width: 500px;
  margin: 10px auto;
  justify-content: space-between;
}
</style>
