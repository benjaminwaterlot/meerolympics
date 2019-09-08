<template>
  <div>
    <h2>Create a match</h2>
    <div v-for="(player, index) in choosePlayers" @click="() => editPlayer(index)">
      <input v-if="choosePlayers[index].selected" v-model="input" type="text" />
      <div v-else>Choose a player</div>
    </div>
    <div>
      <ul>
        <li
          v-for="player in filterPlayers"
          :key="player.id"
          @click="selectPlayer(player)"
          class="text-xl text-gray-900 leading-tight"
        >{{ `${player.firstName} ${player.lastName}` }}</li>
      </ul>
    </div>
  </div>
</template>

<script>
import _ from 'lodash'
import { mapState, mapActions } from 'vuex'

export default {
	name: 'CreateMatch',
	data: () => ({
		choosePlayers: [{}, {}],
		input: '',
		debouncedInput: '',
		updateInput: null
	}),
	watch: {
		input(newer) {
			this.updateInput(newer)
		}
	},
	created() {
		this.updateInput = _.debounce(input => (this.debouncedInput = input), 150)
		this.fetchPlayers()
	},
	computed: {
		...mapState('players', ['players']),
		filterPlayers() {
			if (!(this.debouncedInput && this.debouncedInput.length > 2)) return []

			const search = this.debouncedInput.toLowerCase()

			// Filter the player list by first and last names.
			return this.players.filter(({ firstName, lastName }) =>
				[firstName.toLowerCase(), lastName.toLowerCase()].some(name =>
					name.includes(search)
				)
			)
		}
	},
	methods: {
		emptyFields() {
			this.input = ''
			this.debouncedInput = ''
		},
		...mapActions('players', ['fetchPlayers']),
		editPlayer(index) {
			this.choosePlayers = this.choosePlayers.map((player, idx) => ({
				...player,
				selected: idx === index ? true : false
			}))
		},
		selectPlayer({ id, firstName, lastName, photo }) {
			this.emptyFields()
			const playerToUpdate = this.choosePlayers.findIndex(
				({ selected }) => selected
			)

			this.choosePlayers[playerToUpdate] = {
				selected: false,
				id,
				firstName,
				lastName,
				photo
			}
			console.debug(this.choosePlayers)
		}
	}
}
</script>

<style lang="scss" scoped>
@import '@/theme/variables.scss';
</style>