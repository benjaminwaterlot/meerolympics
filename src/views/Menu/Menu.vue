<template>
  <div class="bg-gray-200 p-4 sm:p-8 min-h-screen">
    <Title icon="bars" text="Menu" />
    <router-link
      v-for="link in links"
      :key="link.label"
      :to="link.route"
      :class="[
        'block',
        'bg-gray-100 w-full text-left font-bold text-lg',
        'py-4 px-4 text-gray-700 rounded-lg mee-card my-3',
        'transition-all hover:text-green-500'
      ]"
      @click.native="$emit('close')"
    >
      <FaIcon :icon="link.icon" class="mr-3" />
      <span>{{ link.label }}</span>
    </router-link>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import allLinks from '@/router/navigation'
import Title from '@/components/Title/Title.vue'

export default {
  name: 'Players',
  components: {
    Title
  },
  props: {},
  data: () => ({
    allLinks
  }),
  computed: {
    ...mapGetters('authentication', ['isUserLoggedIn']),
    links() {
      return this.allLinks.filter(link => {
        if (!('isLogged' in link)) return true
        return link.isLogged ? this.isUserLoggedIn : !this.isUserLoggedIn
      })
    }
  }
}
</script>
