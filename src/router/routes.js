import CheckLogin from '@/views/CheckLogin'
import Menu from '@/views/Menu/Menu.vue'

export default [
  {
    path: '/menu',
    name: 'menu',
    component: Menu,
    meta: { authNotRequired: true }
  },
  {
    path: '/check-login',
    name: 'check-login',
    component: CheckLogin,
    meta: { authNotRequired: true }
  },
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "client-chunk-login" */ '@/views/Login.vue'),
    meta: { authNotRequired: true }
  },
  {
    path: '/players',
    name: 'players',
    component: () =>
      import(/* webpackChunkName: "client-chunk-players" */ '@/views/Players/Players.vue'),
    meta: { authNotRequired: true }
  },
  {
    path: '/players/:id',
    name: 'player-profile',
    component: () =>
      import(/* webpackChunkName: "client-chunk-players" */ '@/views/Players/PlayerProfile.vue'),
    meta: { authNotRequired: true }
  },
  {
    path: '/matches',
    name: 'matches',
    component: () =>
      import(/* webpackChunkName: "client-chunk-players" */ '@/views/Matches/Matches.vue'),
    meta: { authNotRequired: true }
  },
  {
    path: '/matches/create',
    name: 'matches-create',
    component: () =>
      import(
        /* webpackChunkName: "client-chunk-create-match" */ '@/views/CreateMatch/CreateMatch.vue'
      ),
    meta: { authNotRequired: true } // @TODO: To remove
  },
  { path: '*', redirect: '/players' }
]
