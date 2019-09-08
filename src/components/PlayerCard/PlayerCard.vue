<template>
  <div class="flex items-center shadow rounded-lg bg-gray-100 px-6 py-4 h-full">
    <img :src="photo" alt="avatar" class="h-16 w-16 rounded-full mr-4" />
    <p>
      <span class="font-bold text-xl">{{ firstName}}</span>
      <br />
      <span class="font-light text-sm">{{ lastName }}</span>
    </p>
  </div>
</template>

<script>
export default {
	name: 'PlayerCard',
	props: {
		firstName: {
			type: String,
			required: true
		},
		lastName: {
			type: String,
			required: true
		},
		photo: {
			type: String,
			required: true
		}
	}
}
</script>

<style lang="scss" scoped>
</style>