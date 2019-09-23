// import Home from '@/views/Home'
import CheckLogin from '@/views/CheckLogin'
import Menu from '@/views/Menu/Menu.vue'

export default [
  // {
  //   path: '/home',
  //   name: 'home',
  //   component: Home,
  //   meta: { authNotRequired: true }
  // },
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
      import(/* webpackChunkName: "client-chunk-create-match" */ '@/views/CreateMatch/CreateMatch.vue')
  },
  { path: '*', redirect: '/players' }
]
