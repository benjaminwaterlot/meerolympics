<template>
  <span
    v-if="elo"
    :title="gain ? `Elo original : ${elo - gain}` : null"
    :class="[
      'rounded-full px-4 py-1',
      `bg-${league.color}-200 text-${league.color}-${league.accent + 500} font-bold`
    ]"
  >
    <FaIcon :icon="league.icon" />
    <span class="ml-2">{{ elo }}</span>
    <span v-if="gain" class="font-light text-xs">{{ displayGain }}</span>
  </span>
  <span v-else class="rounded-full px-4 py-1 bg-gray-200 text-gray-400 font-bold">New</span>
</template>

<script>
import { getLeague } from '@/lib/leagues'

export default {
  name: 'Elo',
  props: {
    elo: {
      type: Number
    },
    gain: {
      type: Number
    }
  },
  computed: {
    displayGain() {
      const { gain } = this
      return gain > 0 ? ` (+ ${gain})` : ` (- ${Math.abs(gain)})`
    },
    league() {
      return getLeague(this.elo)
    }
  }
}
</script>
