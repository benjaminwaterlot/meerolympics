<template>
  <div>
    <PlayerDisplay
      v-for="player in teams[0]"
      :id="player._id"
      :key="player._id"
      v-bind="player"
      place="left"
      @select="id => $emit('select', id)"
    />
    <div class="flex items-center justify-around">
      <hr class="w-1/3 border-t-2" />
      <div
        class="h-32 w-32 my-8 rounded-full bg-green-500 flex items-center justify-center"
      >
        <span class="_vs-text text-5xl text-white font-bold font-avalon">
          <button v-if="ready" @click="$emit('start')">
            <FaIcon class="ml-1" :icon="['fas', 'play']" />
          </button>
          <span v-else>VS</span>
        </span>
      </div>
      <hr class="w-1/3 border-t-2" />
    </div>
    <PlayerDisplay
      v-for="player in teams[1]"
      :id="player._id"
      :key="player._id"
      v-bind="player"
      place="right"
      @select="id => $emit('select', id)"
    />
  </div>
</template>

<script>
import { groupBy } from 'ramda'
import PlayerDisplay from './PlayerDisplay.vue'

export default {
  name: 'PlayersDisplay',
  components: {
    PlayerDisplay
  },
  props: {
    players: {
      type: Array,
      required: true
    }
  },
  computed: {
    teams() {
      return Object.values(groupBy(({ team }) => team, this.players))
    },
    ready() {
      return this.players.every(player => player._id)
    }
  }
}
</script>

<style scoped>
._vs-text {
  text-shadow: 3px 3px 0px rgba(0, 0, 0, 0.15);
}
</style>
