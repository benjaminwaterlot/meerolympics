<template>
  <div class="flex items-center shadow rounded-lg bg-gray-100 px-6 py-4 h-full">
    <div class="h-16 w-16 rounded-full mr-4 bg-gray-400"></div>
    <Input
      v-bind="$attrs"
      focus
      class="rounded bg-white h-12 w-3/4"
      @input="e => $emit('input', e)"
    />
  </div>
</template>

<script>
import Input from '@/components/Input'

export default {
  name: 'PlayerCard',
  components: {
    Input
  }
}
</script>
