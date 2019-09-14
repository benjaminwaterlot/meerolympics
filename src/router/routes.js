import Home from '@/views/Home'
import CheckLogin from '@/views/CheckLogin'

export default [
  {
    path: '/home',
    name: 'home',
    component: Home,
    meta: {
      authNotRequired: true
    }
  },
  {
    path: '/check-login',
    name: 'check-login',
    component: CheckLogin,
    meta: {
      authNotRequired: true
    }
  },
  {
    path: '/login',
    name: 'login',
    component: () =>
      import(/* webpackChunkName: "client-chunk-login" */ '@/views/Login.vue'),
    meta: {
      authNotRequired: true
    }
  },
  {
    path: '/players',
    name: 'players',
    component: () =>
      import(
        /* webpackChunkName: "client-chunk-players" */ '@/views/Players.vue'
      )
  },
  {
    path: '/create-match',
    name: 'create-match',
    component: () =>
      import(
        /* webpackChunkName: "client-chunk-create-match" */ '@/views/CreateMatch/CreateMatch.vue'
      )
  },
  {
    path: '/products/:id',
    name: 'product',
    props: true,
    component: () =>
      import(
        /* webpackChunkName: "client-chunk-product-details" */ '@/views/Product.vue'
      )
  },
  { path: '*', redirect: '/home' }
]
