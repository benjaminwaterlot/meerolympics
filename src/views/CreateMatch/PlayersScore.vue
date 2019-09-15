<template>
  <div>
    <div
      v-for="team in teams"
      :key="team[0].team"
      class="team-card bg-white w-full sm:w-1/2 lg:w-1/3 p-6 m-6 shadow-lg mx-auto"
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
      <div class="flex justify-center mt-8">
        <input
          v-model="scores[team[0].team]"
          type="number"
          placeholder="Score"
          class="p-2 bg-gray-100 rounded-lg text-center font-black text-2xl text-gray-600"
        />
        <button
          class="h-8 w-8 rounded-full border-2"
          :class="winner === team[0].team ? 'bg-green-500' : ''"
          @click="winner = team[0].team"
        />
      </div>
    </div>
    <button
      v-if="ready"
      class="block px-6 py-2 text-3xl font-bold bg-green-500 text-white rounded-full font-avalon shadow-lg mx-auto my-8"
      @click="submit"
    >
      Valider
    </button>
  </div>
</template>

<script>
import { groupBy } from 'ramda'
import { mapActions } from 'vuex'

export default {
  name: 'PlayersScore',
  props: {
    players: {
      type: Array,
      required: true
    }
  },
  data: () => ({
    scores: {},
    winner: null
  }),
  computed: {
    teams() {
      const teams = Object.values(groupBy(({ team }) => team, this.players))
      return teams
    },
    ready() {
      return true
    }
  },
  methods: {
    ...mapActions('matches', ['submitMatch']),
    async submit() {
      await this.submitMatch({
        participants: this.players,
        winner: this.winner,
        scores: this.scores
      })
      this.$router.push({ name: 'home' })
    }
  }
}
</script>

<style scoped>
.team-card {
  border-radius: 20px;
}
</style>
