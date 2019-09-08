<template>
  <div class="background">
    <h2 class="text-3xl font-bold">Create a match</h2>
    <div class="flex flex-wrap -mx-4 my-4">
      <div v-for="(player, index) in choosePlayers" class="w-full md:w-1/2 h-24 px-4 my-4">
        <PlayerSelectionInput v-if="choosePlayers[index].selected" v-model="input" />
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
    <Button v-if="sendReady" @click.native="submit" class="mx-auto block">Lancer le match</Button>
  </div>
</template>

<script>
import _ from 'lodash'
import { mapState, mapActions } from 'vuex'
import Input from '@/components/Input'
import Button from '@/components/Button'
import {
	PlayerSelectionCard,
	PlayerSelectionEmpty,
	PlayerSelectionInput
} from './PlayerSelection'
import Vue from 'vue'

export default {
	name: 'CreateMatch',
	components: {
		Input,
		Button,
		PlayerSelectionCard,
		PlayerSelectionEmpty,
		PlayerSelectionInput
	},
	data: () => ({
		choosePlayers: [{ team: 1 }, { team: 2 }],
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
			if (!(this.debouncedInput && this.debouncedInput.length > 1)) return []

			const search = this.debouncedInput.toLowerCase()

			// Filter the player list by first and last names.
			return this.players.filter(({ firstName, lastName }) =>
				[firstName.toLowerCase(), lastName.toLowerCase()].some(name =>
					name.includes(search)
				)
			)
		},
		sendReady() {
			return this.choosePlayers.every(({ id }) => id)
		}
	},
	methods: {
		emptyFields() {
			this.input = ''
			this.debouncedInput = ''
		},
		...mapActions('players', ['fetchPlayers']),
		...mapActions('matches', ['createMatch']),
		editPlayer(index) {
			this.choosePlayers = this.choosePlayers.map((player, idx) => ({
				...player,
				selected: idx === index ? true : false
			}))
		},
		selectPlayer(player) {
			this.emptyFields()
			const idx = this.choosePlayers.findIndex(({ selected }) => selected)
			Vue.set(this.choosePlayers, idx, {
				...this.choosePlayers[idx],
				...player,
				selected: false
			})
		},
		submit() {
			this.createMatch(this.choosePlayers)
		}
	}
}
</script>
