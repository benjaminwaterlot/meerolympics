<template>
  <div>
    <router-link
      v-for="link in links"
      :key="link.label"
      :to="link.route"
      @click.native="$emit('close')"
      :class="[
        'block',
        'bg-gray-100 border-b-2 w-full text-left font-bold text-lg',
        'py-4 px-4 text-gray-700',
        'transition-all hover:text-green-500'
      ]"
    >
      <span>{{ link.label }}</span>
    </router-link>
  </div>
</template>


<script>
import allLinks from '@/router/navigation'
import { mapGetters } from 'vuex'

export default {
  name: 'Drawer',
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

