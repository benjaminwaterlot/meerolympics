<template>
  <div :class="['bg-gray-200 p-4 sm:p-8 min-h-screen', 'flex flex-col items-center']">
    <Title icon="flag-checkered" text="General ranking" />
    <Loader v-if="loading" class="mx-auto my-10" />
    <router-link
      v-for="player in players"
      :key="player._id"
      :to="{ name: 'player-profile', params: { id: player._id } }"
      :class="['w-full md:w-2/3 lg:w-2/5']"
    >
      <PlayerItem v-bind="player" />
    </router-link>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import Title from '@/components/Title/Title.vue'
import Loader from '@/components/Loader/Loader.vue'
import PlayerItem from '@/components/PlayerItem/PlayerItem.vue'

export default {
  name: 'Players',
  components: {
    PlayerItem,
    Loader,
    Title
  },
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
