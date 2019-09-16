<template>
  <div>
    <button
      :class="[
        'block',
        'bg-white',
        'w-full md:w-2/3 lg:w-2/5',
        'p-4 my-3 mx-auto',
        'rounded-lg',
        'shadow-lg hover:shadow-md',
        'transition-all'
      ]"
    >
      <div :class="['flex items-center']">
        <img :src="photo" :class="['rounded-full', 'h-16 w-16', 'mr-4']" />
        <div :class="['flex flex-grow justify-between items-center']">
          <p :class="['text-left']">
            <span class="text-2xl text-gray-700 font-bold">
              {{ firstName }}
            </span>
            <br />
            <span class="text-sm text-gray-500 font-light">
              {{ lastName }}
            </span>
          </p>
          <p class="text-green-300 font-avalon text-right">
            <span class="font-light text-lg">ELO </span>
            <span class="text-2xl sm:text-4xl text-green-500 font-bold">
              {{ sports.find(({ id }) => id === sport).elo }}
            </span>
          </p>
        </div>
      </div>
    </button>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'PlayerItem',
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
      type: Array,
      required: true
    }
  },
  computed: {
    ...mapState('settings', ['sport'])
  }
}
</script>
