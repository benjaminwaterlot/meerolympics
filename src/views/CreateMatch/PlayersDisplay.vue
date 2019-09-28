<template>
  <div>
    <Title icon="users" text="Select players" class="mb-12" />
    <PlayerDisplay
      v-for="player in teams[0]"
      :key="player._id"
      v-bind="player"
      place="left"
      @select="id => $emit('select', id)"
      @cancel="id => $emit('cancel', id)"
    />
    <div class="flex items-center justify-around">
      <hr class="w-1/3 border-t-2" />
      <div class="h-32 w-32 my-8 rounded-full bg-green-500 flex items-center justify-center">
        <span class="vs-text text-5xl text-white font-bold font-avalon">
          <button v-if="ready" @click="$emit('start')">
            <FaIcon class="ml-1" icon="play" />
          </button>
          <span v-else>VS</span>
        </span>
      </div>
      <hr class="w-1/3 border-t-2" />
    </div>
    <PlayerDisplay
      v-for="player in teams[1]"
      :key="player._id"
      v-bind="player"
      place="right"
      @select="id => $emit('select', id)"
      @cancel="id => $emit('cancel', id)"
    />
  </div>
</template>

<script>
import { groupBy } from 'ramda'
import PlayerDisplay from './PlayerDisplay.vue'
import Title from '@/components/Title/Title.vue'

export default {
  name: 'PlayersDisplay',
  components: {
    PlayerDisplay,
    Title
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
.vs-text {
  text-shadow: 3px 3px 0px rgba(0, 0, 0, 0.15);
}
</style>
