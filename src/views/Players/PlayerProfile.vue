<template>
  <div v-if="player" class="bg-gray-200 p-4 sm:p-8 min-h-screen">
    <Title :text="title" :picture="player.photo" icon="user-ninja" />
    <div v-if="player"></div>

    <SubTitle text="Profile" icon="user-ninja" />
    <hr class="mb-8" />
    <div class="flex">
      <div
        v-for="sport in player.sports"
        :key="sport.id"
        :class="['mee-card rounded-lg p-4 bg-white flex items-center']"
      >
        <FaIcon icon="futbol" class="text-4xl" />
        <div class="bg-gray-300 h-full w-1 ml-5" />
        <div :class="['flex flex-col mx-5']">
          <div class="flex">
            <h3 class="text-xl font-bold capitalize mr-4">
              {{ sport.id }}
            </h3>
          </div>
          <p class="text-gray-600 text-sm mt-1">
            <span class="font-bold">
              {{ matchesBySport[sport.id].length }}
            </span>
            matches played
          </p>
        </div>
        <Elo :elo="sport.elo" class="self-start" />
      </div>
    </div>

    <SubTitle text="Matches" icon="star" class="mt-16" />
    <hr />
    <div v-for="match in matches" :key="match._id">
      <MatchItem v-bind="match" />
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapState } from 'vuex'
import { groupBy } from 'ramda'
import Title from '@/components/Title/Title.vue'
import SubTitle from '@/components/Title/SubTitle.vue'
import MatchItem from '@/components/MatchItem/MatchItem.vue'
import Elo from '@/components/Elo/Elo.vue'

export default {
  name: 'PlayerProfile',
  components: { Title, MatchItem, SubTitle, Elo },
  data: () => ({
    matches: []
  }),
  computed: {
    ...mapGetters('players', ['getEmployeeOrPlayer']),
    ...mapState('settings', ['sport']),
    id() {
      return this.$route.params.id
    },
    player() {
      return this.getEmployeeOrPlayer(this.id)
    },
    title() {
      return this.player ? `${this.player.firstName}'s profile` : ``
    },
    matchesBySport() {
      return groupBy(({ sport }) => sport, this.matches)
    }
  },
  async created() {
    this.fetchPlayer(this.id)
    this.matches = await this.fetchMatches(this.id)
  },
  methods: {
    ...mapActions('players', ['fetchPlayer']),
    ...mapActions('matches', ['fetchMatches'])
  }
}
</script>
