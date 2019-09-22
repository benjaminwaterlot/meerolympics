<template>
  <h1 class="text-3xl font-bold text-center uppercase mb-6">
    <FaIcon v-if="icon" :icon="icon" />
    <br v-if="icon" />
    {{ text }}
  </h1>
</template>

<script>
export default {
  name: 'Title',
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
