<template>
  <input
    type="text"
    class="rounded px-2 py-1 shadow-md"
    v-bind="$attrs"
    @input="e => $emit('input', e.target.value)"
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

<style lang="scss" scoped></style>
