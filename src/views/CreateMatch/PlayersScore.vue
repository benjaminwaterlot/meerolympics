<template>
  <div>
    <Title icon="flag-checkered" text="Report scores" class="mb-8" />
    <div
      v-for="team in teams"
      :key="team[0].team"
      :class="[
        'mee-card',
        'team-card bg-white w-full sm:w-1/2 lg:w-1/3 p-6 m-6 shadow-lg mx-auto',
        winner === team[0].team && 'bg-yellow-100'
      ]"
    >
      <div class="flex justify-between">
        <h2 class="text-xl font-black text-left pr-6 w-1/2">
          {{ team.map(({ firstName }) => firstName).join(' & ') }}
        </h2>
        <div class="flex flex-shrink bg-gray-300 rounded-full p-1">
          <img
            v-for="(player, i) in team"
            :key="player._id"
            :src="player.photo"
            class="h-16 w-16 rounded-full"
            :class="i && '-mx-3'"
          />
        </div>
      </div>
      <div class="flex justify-center items-center mt-8">
        <input
          v-model="scores[team[0].team]"
          type="text"
          placeholder="Score"
          class="p-2 bg-gray-100 rounded-lg text-center font-black text-2xl text-gray-600 w-48"
        />
        <button
          :class="[
            'h-12 w-12 rounded-full ml-8',
            'shadow transition-all',
            winner === team[0].team
              ? 'shadow-md bg-yellow-500 text-white'
              : 'bg-gray-100 text-gray-600'
          ]"
          @click="winner = team[0].team"
        >
          <FaIcon icon="crown" />
        </button>
      </div>
    </div>
    <Loader v-if="loading" class="mx-auto my-20" />
    <button
      v-else-if="ready"
      :class="[
        'mee-card',
        'block px-6 py-2',
        'text-3xl font-bold bg-green-500 text-white rounded-full font-avalon mx-auto my-8'
      ]"
      @click="submit"
    >
      Valider
    </button>
  </div>
</template>

<script>
import { groupBy } from 'ramda'
import { mapActions, mapGetters } from 'vuex'
import Title from '@/components/Title/Title.vue'
import Loader from '@/components/Loader/Loader.vue'

export default {
  name: 'PlayersScore',
  components: {
    Loader,
    Title
  },
  props: {
    players: {
      type: Array,
      required: true
    }
  },
  data: () => ({
    scores: {},
    winner: null,
    loading: null
  }),
  computed: {
    teams() {
      const playersWithInfos = this.players.map(player => ({
        ...player,
        ...this.getEmployeeOrPlayer(player._id)
      }))
      const teams = Object.values(groupBy(({ team }) => team, playersWithInfos))
      return teams
    },
    ready() {
      const scores = Object.keys(this.scores)
      return this.winner && scores.length > 1 && scores.every(score => score)
    },
    ...mapGetters('players', ['getEmployeeOrPlayer'])
  },
  methods: {
    ...mapActions('matches', ['submitMatch']),
    isWinner(team) {
      return this.winner === team[0].team
    },
    async submit() {
      this.loading = true
      await this.submitMatch({
        participants: this.players,
        winner: this.winner,
        scores: this.scores
      })
      this.loading = false
      this.$router.push({ name: 'matches' })
    }
  }
}
</script>

<style scoped>
.team-card {
  border-radius: 20px;
}
</style>
