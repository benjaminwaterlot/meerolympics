<template>
  <div class="flex my-4" :class="place === 'left' ? 'justify-start' : 'justify-end'">
    <button :class="['w-full md:w-2/3 lg:w-2/5', 'p-4', 'bg-white rounded-lg', 'mee-card']">
      <div v-if="_id" class="flex items-center">
        <img :src="employee.photo" class="rounded-full h-16 w-16 mr-4" />
        <div class="flex-grow flex justify-between items-center">
          <p class="text-left flex-grow">
            <span class="text-2xl text-gray-700 font-bold">
              {{ employee.firstName }}
            </span>
            <br />
            <span class="text-sm text-gray-500 font-light">{{ employee.lastName }}</span>
          </p>
          <Elo :elo="elo" class="text-lg" />
          <button class="ml-3 -mt-2 self-start text-gray-500" @click="$emit('cancel', selectId)">
            <FaIcon icon="times" />
          </button>
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
import { mapActions, mapState, mapGetters } from 'vuex'
import Elo from '@/components/Elo/Elo.vue'

const id = '_id'

export default {
  name: 'PlayerDisplay',
  components: {
    Elo
  },
  props: {
    [id]: {
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
    ...mapState('settings', ['sport']),
    ...mapGetters('players', ['getPlayer', 'getEmployee']),
    player() {
      return this._id ? this.getPlayer(this._id) : null
    },
    employee() {
      return this._id ? this.getEmployee(this._id) : null
    },
    elo() {
      if (!this.player) return null
      const sport = this.player.sports && this.player.sports.find(({ id }) => id === this.sport)

      return (sport && sport.elo) || null
    }
  },
  watch: {
    _id: {
      immediate: true,
      async handler(_id) {
        return _id ? this.fetchPlayer(_id) : null
      }
    }
  },
  methods: {
    ...mapActions('players', ['fetchPlayer'])
  }
}
</script>
