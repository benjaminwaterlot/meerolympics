<template>
  <div>
    <Title icon="id-card-alt" text="Find a player" />
    <div>
      <input
        ref="input"
        v-model="input"
        type="text"
        :class="[
          'block w-full sm:w-2/3',
          'mx-auto my-10 p-4',
          'text-2xl font-bold text-center rounded-lg shadow-xl'
        ]"
      />
    </div>
    <div class="my-10">
      <PlayerItem
        v-for="employee in filtered"
        :key="employee._id"
        v-bind="employee"
        @click.native="$emit('choose', { selectId, employee })"
      />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import PlayerItem from '@/components/PlayerItem/PlayerItem.vue'
import Title from '@/components/Title/Title.vue'

export default {
  name: 'PlayerSelection',
  components: {
    PlayerItem,
    Title
  },
  props: {
    selectId: {
      type: Number,
      required: true
    },
    players: {
      type: Array,
      required: true
    }
  },
  data: () => ({
    input: ''
  }),
  mounted() {
    this.$refs.input.focus()
  },
  computed: {
    ...mapState('players', ['employees']),
    refined() {
      return this.employees.map(({ firstName, lastName, ...rest }) => ({
        firstNameLower: firstName.toLowerCase(),
        lastNameLower: lastName.toLowerCase(),
        firstName,
        lastName,
        ...rest
      }))
    },
    filtered() {
      if (this.input.length < 3) return []
      const inputLower = this.input.toLowerCase()

      return this.refined.filter(({ firstNameLower, lastNameLower, _id }) => {
        const filterNames =
          firstNameLower.includes(inputLower) || lastNameLower.includes(inputLower)

        const notAlreadySelected = !this.players.find(player => player._id === _id)

        return filterNames && notAlreadySelected
      })
    }
  }
}
</script>
