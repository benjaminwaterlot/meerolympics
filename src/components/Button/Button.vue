<template>
  <button
    class="px-8 py-2 rounded-full text-lg font-bold transition-all"
    :class="`bg-${color}-400 hover:bg-${color}-500  text-${textColor}`"
  >
    <slot />
  </button>
</template>

<script>
export default {
  name: 'Button',
  props: {
    color: {
      type: String,
      default: 'green'
    },
    textColor: {
      type: String,
      default: 'white'
    }
  }
}
</script>

