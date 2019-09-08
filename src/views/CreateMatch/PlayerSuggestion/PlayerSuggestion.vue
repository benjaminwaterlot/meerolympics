<template>
  <button class="block w-full rounded shadow my-3 p-3 bg-gray-100">
    <span class="font-bold">{{ firstName }}</span>
    {{ ' ' }}
    <span class="font-light">{{ lastName }}</span>
  </button>
</template>

<script>
export default {
  name: 'PlayerSuggestion',
  props: {
    firstName: {
      type: String,
      required: true
    },
    lastName: {
      type: String,
      required: true
    }
  }
}
</script>