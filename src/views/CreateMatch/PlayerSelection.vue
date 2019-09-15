<template>
  <div>
    <div>
      <input
        ref="input"
        v-model="input"
        type="text"
        class="w-full sm:w-2/3 mx-auto my-10 block p-4 text-2xl font-bold text-center rounded-lg shadow-xl focus:outline-none"
      />
    </div>
    <div class="my-10">
      <button
        v-for="employee in filtered"
        :key="employee._id"
        class="block w-full sm:w-1/2 p-2 bg-white shadow-md rounded-lg flex items-center my-4 mx-auto"
        @click="$emit('choose', { selectId, employee })"
      >
        <img :src="employee.photo" class="h-12 w-12 mr-4 rounded-full" />
        <div class="">
          <span class="text-xl font-bold text-gray-700">
            {{ employee.firstName }}
          </span>
          <span class="text-md text-gray-600">
            {{ employee.lastName }}
          </span>
        </div>
      </button>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'PlayerSelection',
  props: {
    selectId: {
      type: Number,
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

      return this.refined.filter(
        ({ firstNameLower, lastNameLower }) =>
          firstNameLower.includes(inputLower) ||
          lastNameLower.includes(inputLower)
      )
    }
  }
}
</script>
