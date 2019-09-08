<template>
  <div class="page-wrapper">
    <h1 class="players-page-title">Players page</h1>
    <players-list class="players-list"></players-list>
    <add-product v-if="networkOnLine"></add-product>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import PlayersList from '@/components/PlayersList'
import AddProduct from '@/components/AddProduct'

export default {
	components: { PlayersList, AddProduct },
	computed: mapState('app', ['networkOnLine'])
}
</script>

<style lang="scss" scoped>
@import '@/theme/variables.scss';

.players-page-title {
	text-align: center;
	margin-bottom: 60px;
}

.players-list {
	margin: 20px 0;
}
</style>
