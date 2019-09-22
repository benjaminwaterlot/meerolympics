<template>
  <button
    :class="[
      'mee-card',
      'block',
      'bg-white',
      'w-full md:w-2/3 lg:w-2/5',
      'py-2 px-4 my-3 mx-auto',
      'rounded-lg'
    ]"
  >
    <div :class="['flex items-center']">
      <img :src="photo" :class="['rounded-full', 'h-12 w-12', 'mr-4']" />
      <div :class="['flex flex-grow justify-between items-center']">
        <p :class="['text-left']">
          <span class="text-xl text-gray-700 font-bold">
            {{ firstName }}
          </span>
          <br />
          <span class="text-sm text-gray-500 font-light">
            {{ lastName }}
          </span>
        </p>
        <Elo v-if="sports" :elo="sports.find(({ id }) => id === sport).elo" />
      </div>
    </div>
  </button>
</template>

<script>
import { mapState } from 'vuex'
import Elo from '@/components/Elo/Elo.vue'

export default {
  name: 'PlayerItem',
  components: {
    Elo
  },
  props: {
    photo: {
      type: String,
      required: true
    },
    firstName: {
      type: String,
      required: true
    },
    lastName: {
      type: String,
      required: true
    },
    sports: {
      type: Array
    }
  },
  computed: {
    ...mapState('settings', ['sport'])
  }
}
</script>
