<template>
  <button class="block w-full h-full" v-bind="$attrs">
    <div
      class="flex items-center shadow rounded-lg bg-gray-100 px-6 py-4 h-full"
    >
      <div class="h-16 w-16 rounded-full mr-4 bg-gray-400"></div>
      <div class="rounded bg-gray-200 h-12 w-3/4" />
    </div>
  </button>
</template>

<script>
export default {
  name: 'PlayerCard'
}
</script>
