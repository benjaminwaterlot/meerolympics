<template>
  <div
    class="flex my-4"
    :class="place === 'left' ? 'justify-start' : 'justify-end'"
  >
    <button class="w-full md:w-2/3 lg:w-2/5 p-4 bg-white rounded-lg shadow-lg">
      <div v-if="id" class="flex items-center">
        <img :src="photo" class="rounded-full h-16 w-16 mr-4" />
        <div class="flex-grow flex justify-between items-center">
          <p class="">
            <span class="text-2xl text-gray-700 font-bold">
              {{ firstName }}
            </span>
            <br />
            <span class="text-sm text-gray-500 font-light">{{ lastName }}</span>
          </p>
          <p v-if="elo" class="text-green-300 font-avalon text-right">
            <span class="font-light text-lg">ELO </span>
            <span class="text-2xl sm:text-4xl text-green-500 font-bold">
              {{ elo }}
            </span>
          </p>
        </div>
      </div>
      <div v-else class="flex items-center" @click="$emit('select', selectId)">
        <div class="rounded-full h-16 w-16 bg-gray-300 mr-4" />
        <div class="flex-grow">
          <div class="rounded h-6 w-1/2 bg-gray-200 mb-2" />
          <div class="rounded h-6 w-1/3 bg-gray-100" />
        </div>
      </div>
    </button>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
  name: 'PlayerDisplay',
  props: {
    firstName: {
      type: String
    },
    lastName: {
      type: String
    },
    id: {
      type: String
    },
    photo: {
      type: String
    },
    selectId: {
      type: Number
    },
    place: {
      type: String,
      required: true
    }
  },
  computed: {
    ...mapState('players', ['players']),
    fullPlayer() {
      if (!this.id) return null
      return this.players[this.id]
    },
    elo() {
      if (!this.fullPlayer) return null
      const sport =
        this.fullPlayer.sports &&
        this.fullPlayer.sports.find(({ id }) => id === 'babyfoot')

      return (sport && sport.elo) || '-'
    }
  },
  watch: {
    id: {
      immediate: true,
      async handler(id) {
        if (!id) return
        return this.fetchPlayer(id)
      }
    }
  },
  methods: {
    ...mapActions('players', ['fetchPlayer'])
  }
}
</script>

<style scoped>
.wrapper {
  /* box-shadow: 6px 3px 6px rgba(0, 0, 0, 0.03); */
}
</style>
