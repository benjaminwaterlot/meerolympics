<template>
  <div :class="['flex flex-col items-center', 'bg-gray-100 p-4 sm:p-8 min-h-screen']">
    <Title text="Login with Meero" icon="user-astronaut" />

    <!-- Loader -->
    <div v-show="user === undefined" class="m-6 text-gray-600 font-bold text-lg">
      Authenticating...
    </div>

    <!-- Offline instruction -->
    <div v-show="!networkOnLine" data-test="offline-instruction">
      Please check your connection, login feature is not available offline.
    </div>

    <p v-if="loginError">{{ loginError }}</p>
    <!-- Auth UI -->
    <button
      v-show="user !== undefined && !user && networkOnLine"
      :class="[
        'block',
        'rounded-lg px-6 py-2',
        'mee-card',
        'bg-white font-bold text-green-500 text-lg'
      ]"
      @click="login"
    >
      Login
    </button>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'
import { isNil } from 'lodash'
import firebase from 'firebase/app'
import { desktop as isDekstop } from 'is_js'
import Title from '@/components/Title/Title.vue'

export default {
  data: () => ({ loginError: null }),
  components: {
    Title
  },
  head: function() {
    return {
      title: {
        inner: 'Login'
      },
      meta: [
        {
          name: 'description',
          content: `Sign in or sign up to ${this.appTitle}`,
          id: 'desc'
        }
      ]
    }
  },
  computed: {
    ...mapState('authentication', ['user']),
    ...mapState('app', ['networkOnLine', 'appTitle'])
  },
  watch: {
    user: {
      handler(user) {
        if (!isNil(user)) {
          const redirectUrl = isNil(this.$route.query.redirectUrl)
            ? '/products'
            : this.$route.query.redirectUrl
          this.$router.push(redirectUrl)
        }
      },
      immediate: true
    }
  },
  methods: {
    ...mapActions('authentication', ['getIdToken']),
    async logToken() {
      console.log(await this.getIdToken())
    },
    ...mapMutations('authentication', ['setUser']),
    async login() {
      this.loginError = null
      const provider = new firebase.auth.GoogleAuthProvider()
      provider.setCustomParameters({
        hd: 'meero.com'
      })

      this.setUser(undefined)

      try {
        // Firebase signin with popup is faster than redirect
        // but we can't use it on mobile because it's not well supported
        // when app is running as standalone on ios & android
        isDekstop()
          ? await firebase.auth().signInWithPopup(provider)
          : await firebase.auth().signInWithRedirect(provider)
      } catch (err) {
        this.loginError = err
        this.setUser(null)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/theme/variables.scss';

.page-wrapper {
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;

  .login-page-title {
    text-align: center;
  }

  .login-btn {
    margin-top: 20px;
    cursor: pointer;
    padding: 5px 20px;
    border: 1px solid;
    display: inline-block;
    border-radius: 3px;
    border-color: #2c3e50;

    &:hover {
      color: $vue-color;
      border-color: $vue-color;
    }
  }
}
</style>
