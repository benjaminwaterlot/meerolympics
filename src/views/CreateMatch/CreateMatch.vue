<template>
  <div class="background">
    <h2 class="text-3xl font-bold">Create a match</h2>
    <div class="flex flex-wrap -mx-4 my-4">
      <div v-for="(player, index) in choosePlayers" class="w-full md:w-1/2 h-24 px-4 my-4">
        <Input v-if="choosePlayers[index].selected" v-model="input" />
        <PlayerSelectionCard v-else-if="choosePlayers[index].id" v-bind="player" />
        <PlayerSelectionEmpty v-else @click.native="editPlayer(index)" />
      </div>
    </div>
    <div>
      <button
        v-for="player in filterPlayers"
        :key="player.id"
        @click="selectPlayer(player)"
        class="block text-xl text-blue-300 shadow-md m-6 p-3 bg-gray-100"
      >{{ `${player.firstName} ${player.lastName}` }}</button>
    </div>
  </div>
</template>

<script>
import _ from 'lodash'
import { mapState, mapActions } from 'vuex'
import Input from '@/components/Input'
import PlayerCard from '@/components/PlayerCard'
import { PlayerSelectionCard, PlayerSelectionEmpty } from './PlayerSelection'

export default {
	name: 'CreateMatch',
	components: {
		Input,
		PlayerSelectionCard,
		PlayerSelectionEmpty
	},
	data: () => ({
		choosePlayers: [{}, {}, {}, {}],
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