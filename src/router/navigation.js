export default [
  {
    label: 'Ranking',
    route: '/players',
    icon: 'flag-checkered'
  },
  {
    label: 'Matches',
    route: '/matches',
    icon: 'star'
  },
  {
    label: 'Play',
    route: '/matches/create',
    icon: 'trophy'
  },
  {
    label: 'Login',
    route: '/login',
    isLogged: false,
    icon: 'user-astronaut'
  },
  {
    label: 'Logout',
    route: '/logout',
    isLogged: true,
    icon: 'user-ninja'
  }
]
