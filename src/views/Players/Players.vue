<template>
  <div class="bg-gray-200 p-4 sm:p-8 min-h-screen">
    <Title icon="flag-checkered" text="General ranking" />
    <PlayerItem v-for="player in players" :key="player._id" v-bind="player" />
  </div>
</template>

<script>
import Title from '@/components/Title/Title.vue'
import { mapState, mapActions } from 'vuex'
import PlayerItem from '@/components/PlayerItem/PlayerItem.vue'

export default {
  name: 'Players',
  components: {
    PlayerItem,
    Title
  },
  props: {},
  data: () => ({
    players: []
  }),
  computed: {
    ...mapState('app', ['networkOnLine']),
    ...mapState('settings', ['sport'])
  },
  async created() {
    this.players = await this.fetchRanking()
  },
  methods: {
    ...mapActions('players', ['fetchRanking'])
  }
}
</script>
