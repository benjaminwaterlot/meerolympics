<template>
  <div class="bg-gray-200 p-4 sm:p-8 min-h-screen">
    <Title icon="flag-checkered" text="General ranking" />
    <Loader v-if="loading" class="mx-auto my-10" />
    <PlayerItem v-for="player in players" :key="player._id" v-bind="player" />
  </div>
</template>

<script>
import Title from '@/components/Title/Title.vue'
import Loader from '@/components/Loader/Loader.vue'
import { mapState, mapActions } from 'vuex'
import PlayerItem from '@/components/PlayerItem/PlayerItem.vue'

export default {
  name: 'Players',
  components: {
    PlayerItem,
    Loader,
    Title
  },
  props: {},
  data: () => ({
    players: [],
    loading: false
  }),
  computed: {
    ...mapState('app', ['networkOnLine']),
    ...mapState('settings', ['sport'])
  },
  async created() {
    this.loading = true
    this.players = await this.fetchRanking()
    this.loading = false
  },
  methods: {
    ...mapActions('players', ['fetchRanking'])
  }
}
</script>
