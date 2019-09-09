<template>
  <div class="background">
    <h2 class="text-3xl font-bold">Create a match</h2>
    <div class="flex flex-wrap -mx-4 my-4">
      <div
        v-for="(player, index) in choosePlayers"
        :key="player.id"
        class="w-full md:w-1/2 h-24 px-4 my-4"
      >
        <PlayerSelectionInput
          v-if="choosePlayers[index].selected"
          v-model="input"
        />
        <PlayerSelectionCard
          v-else-if="choosePlayers[index].id"
          v-bind="player"
        />
        <PlayerSelectionEmpty v-else @click.native="editPlayer(index)" />
      </div>
    </div>
    <PlayerSuggestion
      v-for="player in filterPlayers.slice(0, 5)"
      :key="player.id"
      v-bind="player"
      @click.native="selectPlayer(player)"
    />
    <Button v-if="sendReady" class="mx-auto block" @click.native="submit">
      Lancer le match
    </Button>
  </div>
</template>

<script>
import _ from 'lodash'
import { mapState, mapActions } from 'vuex'
import Vue from 'vue'
import Button from '@/components/Button'
import {
  PlayerSelectionCard,
  PlayerSelectionEmpty,
  PlayerSelectionInput
} from './PlayerSelection'
import { PlayerSuggestion } from './PlayerSuggestion'

export default {
  name: 'CreateMatch',
  components: {
    Button,
    PlayerSelectionCard,
    PlayerSelectionEmpty,
    PlayerSelectionInput,
    PlayerSuggestion
  },
  data: () => ({
    choosePlayers: [{ team: 1 }, { team: 2 }],
    input: '',
    debouncedInput: '',
    updateInput: null
  }),
  computed: {
    ...mapState('players', ['employees']),
    filterPlayers() {
      if (!(this.debouncedInput && this.debouncedInput.length > 1)) return []

      const search = this.debouncedInput.toLowerCase()

      // Filter the player list by first and last names.
      return this.employees.filter(({ firstName, lastName }) =>
        [firstName.toLowerCase(), lastName.toLowerCase()].some(name =>
          name.includes(search)
        )
      )
    },
    sendReady() {
      return this.choosePlayers.every(({ id }) => id)
    }
  },
  watch: {
    input(newer) {
      this.updateInput(newer)
    }
  },
  created() {
    this.updateInput = _.debounce(input => (this.debouncedInput = input), 300)
    this.fetchEmployees()
  },
  methods: {
    emptyFields() {
      this.input = ''
      this.debouncedInput = ''
    },
    ...mapActions('players', ['fetchEmployees']),
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
    async submit() {
      console.time('Match creation')
      await this.createMatch(this.choosePlayers)
      console.timeEnd('Match creation')

      this.$router.go()
    }
  }
}
</script>
