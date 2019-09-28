<template>
  <h2 class="text-2xl font-bold text-left mb-3">
    <FaIcon v-if="icon" :icon="icon" />
    {{ text }}
  </h2>
</template>

<script>
export default {
  name: 'SubTitle',
  props: {
    text: {
      type: String,
      required: true
    },
    icon: {
      type: String
    }
  }
}
</script>
