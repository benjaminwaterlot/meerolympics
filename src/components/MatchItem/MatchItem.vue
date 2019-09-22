<template>
  <button
    :class="[
      'mee-card',
      'block',
      'bg-white',
      'w-full lg:w-3/5',
      'py-2 px-4 my-3 mx-auto',
      'rounded-lg'
    ]"
  >
    <div :class="['flex justify-between flex-wrap']">
      <div
        v-for="(team, index) in teams"
        :key="team.id"
        :class="['flex justify-between flex-col', 'w-full sm:w-1/2']"
      >
        <div :class="['text-center sm:text-left']">
          <h2 :class="[`font-bold text-${result(team).color}-500 mb-2`]">
            <FaIcon v-if="result(team).icon" :icon="result(team).icon" />
            {{ result(team).text }}
          </h2>
          <span
            v-for="player in team"
            :key="player._id"
            :class="['inline-block text-left', 'my-1']"
          >
            <img :src="player.photo" :class="['inline-block', 'h-8 w-8 rounded-full']" />
            <span :class="['font-bold mx-2']">{{ player.firstName }}</span>
            <Elo :elo="player.eloBefore + player.gain" :gain="player.gain" :class="['text-sm']" />
            <br />
          </span>
        </div>
      </div>
    </div>
    <hr class="my-2" />
    <div :class="['text-xs text-gray-400 text-left']">
      Created by <span class="font-bold">{{ createdBy }}</span> {{ createdAt }}
    </div>
  </button>
</template>

<script>
import { mapState } from 'vuex'
import Elo from '@/components/Elo/Elo.vue'
import { groupBy } from 'ramda'

export default {
  name: 'MatchItem',
  components: {
    Elo
  },
  props: {
    participants: {
      type: Array,
      required: true
    },
    sport: {
      type: String,
      required: true
    },
    createdAt: {
      type: String,
      required: true
    },
    createdBy: {
      type: String,
      required: true
    }
  },
  computed: {
    teams() {
      return Object.values(groupBy(({ team }) => team, this.players))
    },
    players() {
      if (!this.employees.length) return []

      const { employees } = this
      return this.participants.map(participant => ({
        ...participant,
        ...employees.find(({ _id }) => _id === participant.player)
      }))
    },
    ...mapState('players', ['employees'])
  },
  methods: {
    result(team) {
      return team[0].result === 'win'
        ? {
            color: 'yellow',
            text: 'Winner',
            icon: 'trophy'
          }
        : {
            color: 'gray',
            text: 'Loser'
          }
    },
    playerNames(players) {
      return players.map(({ firstName }) => firstName).join(' & ')
    }
  }
}
</script>
