<template>
  <h1 class="text-3xl font-bold text-center uppercase mb-6">
    <img v-if="picture" :src="picture" :class="['h-16 w-16 mx-auto rounded-full mb-3']" />
    <template v-else-if="icon">
      <FaIcon :icon="icon" />
      <br />
    </template>
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
    },
    picture: {
      type: String
    }
  }
}
</script>
