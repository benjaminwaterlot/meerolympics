import Vue from 'vue'

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import {
  faUsers,
  faUserNinja,
  faPlay,
  faIdCardAlt,
  faStar,
  faCrown,
  faTimes,
  faChessQueen,
  faChessRook,
  faChessKnight,
  faChessPawn,
  faFlagCheckered,
  faUserAstronaut,
  faBars,
  faFutbol,
  faTrophy
} from '@fortawesome/free-solid-svg-icons'

import App from './App.vue'
import router from './router'
import store from './store'
import '@/misc/register-service-worker'
import '@/misc/handle-network-status'
import '@/firebase/init'
import '@/firebase/authentication'
import '@/misc/handle-apple-install-prompt'
import 'pwacompat'
import '@/theme/main.scss'

library.add([
  faUsers,
  faUserNinja,
  faPlay,
  faIdCardAlt,
  faStar,
  faCrown,
  faTimes,
  faChessQueen,
  faChessRook,
  faChessKnight,
  faChessPawn,
  faFlagCheckered,
  faUserAstronaut,
  faBars,
  faFutbol,
  faTrophy
])

Vue.component('FaIcon', FontAwesomeIcon)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

console.log(`
🍱 This app was bootstrapped with bento-starter 🍱

👉 https://bento-starter.netlify.com/

`)
