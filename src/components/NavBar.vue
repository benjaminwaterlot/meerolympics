<template>
  <header class="navbar container mx-auto" :class="{ offline: !networkOnLine }">
    <router-link to="/players">
      <img alt="logo-bento" class="logo h-8 w-8" src="@/assets/img/logo-short.svg" />
      <span class="site-name title-desktop text-green-500">{{ appTitle }}</span>
      <span class="site-name title-mobile text-green-500">{{ appShortTitle }}</span>
    </router-link>
    <div class="links">
      <button class="block sm:hidden font-bold text-lg" @click="$router.push('/menu')">
        <span class="xs-hide">Menu</span>
        <FaIcon icon="bars" class="ml-3" />
      </button>
      <nav class="nav-links hidden sm:block">
        <div class="nav-item">
          <router-link to="/players">Ranking</router-link>
        </div>
        <div class="nav-item">
          <router-link to="/matches">Matches</router-link>
        </div>
        <div class="nav-item">
          <router-link to="/matches/create">Play</router-link>
        </div>
        <div v-if="!isUserLoggedIn && networkOnLine" class="nav-item">
          <router-link to="/login">Login</router-link>
        </div>
        <div v-if="isUserLoggedIn && networkOnLine" class="nav-item logout-item" @click="logout">
          <a>Logout</a>
        </div>
        <div v-if="!networkOnLine" class="nav-item offline-label">Offline</div>
      </nav>

      <router-link
        v-if="isUserLoggedIn && networkOnLine"
        :to="{ name: 'player-profile', params: { id: user._id } }"
      >
        <img class="user-picture" :src="player.photo" alt="Avatar" />
      </router-link>
    </div>
  </header>
</template>

<script>
import firebase from 'firebase/app'
import { mapGetters, mapState } from 'vuex'

export default {
  computed: {
    ...mapGetters('authentication', ['isUserLoggedIn']),
    ...mapState('authentication', ['user', 'player']),
    ...mapState('app', ['networkOnLine', 'appTitle', 'appShortTitle'])
  },
  methods: {
    async logout() {
      await firebase.auth().signOut()
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/theme/variables.scss';

.navbar {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 20;
  right: 0;
  height: $navbar-height;
  background-color: $navbar-color;
  box-sizing: border-box;
  border-bottom: 1px solid #eaecef;
  padding: 0.7rem 1.5rem;
  line-height: 2.2rem;

  a {
    display: flex;
    align-items: center;
  }

  .title-desktop {
    display: inline;
  }

  .title-mobile {
    display: none;
  }

  @media (max-width: 360px) {
    .xs-hide {
      display: none;
    }
  }

  @media (max-width: 500px) {
    padding: 0.7rem 0.7rem;

    .can-hide {
      display: none;
    }

    .title-desktop {
      display: none;
    }

    .title-mobile {
      display: block;
    }
  }

  .site-name {
    font-size: 1.3rem;
    font-weight: 600;
    color: #2c3e50;
    position: relative;
  }

  .logo {
    height: 24px;
    padding-right: 8px;
  }

  .links {
    padding-left: 1.5rem;
    box-sizing: border-box;
    white-space: nowrap;
    font-size: 0.9rem;
    position: absolute;
    right: 1.5rem;
    top: 0.7rem;
    display: flex;

    .nav-links {
      display: flex;
      align-items: center;
      justify-content: center;

      .nav-item {
        position: relative;
        display: inline-block;
        margin-left: 1.5rem;
        line-height: 2.2rem;

        &:first-child {
          margin-left: 0;
        }

        a {
          font-weight: 500;
          font-size: 0.9rem;
          text-decoration: none;
          color: $navbar-link-color;
          border-color: #2c3e50;
          line-height: 1.4rem;
          display: inline-block;
          cursor: pointer;
        }

        @mixin activatedLink() {
          margin-bottom: -2px;
          border-bottom: 2px solid #00a295;
        }

        .router-link-exact-active {
          @include activatedLink;
        }

        @media (hover) {
          :hover {
            @include activatedLink;
          }
        }
      }
    }
  }

  &.offline {
    background: $navbar-offline-color;
    .links .nav-links .nav-item a,
    .site-name {
      color: white;
    }
  }

  .user-picture {
    max-height: 32px;
    margin-left: 1.5rem;
    border-radius: 50%;
  }

  .offline-label {
    padding: 0px 10px;
    border: 1px solid white;
    border-radius: 5px;
    color: white;
    margin-left: 1.5rem;
  }
}
</style>
