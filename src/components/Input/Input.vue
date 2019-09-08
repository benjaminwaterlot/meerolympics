<template>
  <input
    type="text"
    v-bind="$attrs"
    @input="(e) => $emit('input', e.target.value)"
    class="rounded px-2 py-1 shadow-md"
  />
</template>

<script>
export default {
	name: 'Input'
}
</script>

<style lang="scss" scoped>
</style>