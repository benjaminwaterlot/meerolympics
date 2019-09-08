<template>
  <div class="flex items-center shadow rounded-lg bg-gray-100 px-6 py-4 h-full">
    <img :src="photo" alt="avatar" class="h-16 w-16 mr-4 rounded-full" />
    <div class="flex justify-between items-center w-full">
      <p>
        <span class="font-bold text-2xl">{{ firstName }}</span>
        <br />
        <span class="font-light text-sm">{{ lastName }}</span>
      </p>
      <p v-if="playerDetails" class="">
        <span class="text-xl font-thin text-green-400">{{ `ELO ` }}</span>
        <span class="text-2xl font-extrabold text-green-400">
          {{ playerDetails.id }}
        </span>
      </p>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex'

export default {
  name: 'PlayerCard',
  props: {
    firstName: {
      type: String,
      required: true
    },
    lastName: {
      type: String,
      required: true
    },
    photo: {
      type: String,
      required: true
    },
    id: {
      type: String,
      required: true
    }
  },
  async created() {
    this.fetchPlayer(this.id)
  },
  computed: {
    ...mapGetters('players', ['getPlayer']),
    playerDetails() {
      return this.getPlayer(this.id)
    }
  },
  methods: {
    ...mapActions('players', ['fetchPlayer'])
  }
}
</script>
