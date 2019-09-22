<template>
  <div class="bg-gray-100 p-4 sm:p-8 min-h-screen">
    <Title icon="star" text="Recent matchs" />
    <div v-for="match in sortedMatches" :key="match._id">
      <MatchItem v-bind="match" />
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import MatchItem from '@/components/MatchItem/MatchItem.vue'
import Title from '@/components/Title/Title.vue'
import moment from 'moment'

export default {
  name: 'Matches',
  components: {
    MatchItem,
    Title
  },
  data: () => ({
    matches: []
  }),
  computed: {
    ...mapState('settings', ['sport']),
    sortedMatches() {
      return this.matches
        .sort((a, b) => {
          return new Date(a.createdAt) > new Date(b.createdAt) ? -1 : 1
        })
        .map(({ createdAt, ...rest }) => ({
          ...rest,
          createdAt: moment(new Date(createdAt)).fromNow()
        }))
    }
  },
  async created() {
    this.matches = await this.fetchMatches()
  },
  methods: {
    ...mapActions('matches', ['fetchMatches'])
  }
}
</script>
