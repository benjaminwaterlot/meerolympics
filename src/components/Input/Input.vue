<template>
  <input
    type="text"
    class="rounded px-2 py-1 shadow-md"
    @input="(e) => $emit('input', e.target.value)"
    v-bind="$attrs"
  />
</template>

<script>
export default {
	name: 'Input',
	props: {
		focus: {
			type: Boolean,
			default: false
		}
	},
	mounted() {
		if (this.focus) this.$el.focus()
	}
}
</script>

<style lang="scss" scoped>
</style>