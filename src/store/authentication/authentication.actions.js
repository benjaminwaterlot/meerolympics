import firebase from 'firebase/app'
import router from '@/router'

export default {
  /**
   * Callback fired when user login
   */
  login: async ({ commit, dispatch, state, rootGetters }) => {
    const idtoken = await firebase
      .auth()
      .currentUser.getIdToken(true)
      .catch(function(error) {
        console.log('ERROR, the error is ', error)
      })

    commit('setIdtoken', idtoken)

    const client = await rootGetters['app/client']

    const getOrCreateUser = await client.put('/users').catch(err => {
      console.error('>>> Not authenticated ; login out.')
      console.error(err)
      return dispatch('logout')
    })

    const user = getOrCreateUser.data.value
    console.log('>>> User recognized as\n', { ...user, idtoken: state.idtoken })

    const player = (await client.get('/players/me')).data
    console.log('>>> Player recognized as\n', player)

    commit('setPlayer', player)
    commit('setUser', user)
  },

  /**
   * Callback fired when user logout
   */
  logout: ({ commit }) => {
    commit('setUser', null)

    const currentRouter = router.app.$route
    if (!(currentRouter.meta && currentRouter.meta.authNotRequired)) {
      router.push('/login')
    }
  },
  getIdToken: async state => {
    const { currentUser } = firebase.auth()
    console.log(state.user)
    if (!currentUser) throw new Error('NOT CONNECTED!')

    return currentUser.getIdToken(true)
  }
}
