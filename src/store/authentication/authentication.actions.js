import { isNil } from 'lodash'
import firebase from 'firebase/app'
import router from '@/router'
import { createNewUserFromFirebaseAuthUser } from '@/misc/helpers'
import UsersDB from '@/firebase/users-db'

export default {
  /**
   * Callback fired when user login
   */
  login: async ({ commit, dispatch, state }, firebaseAuthUser) => {
    const userFromFirebase = await new UsersDB().read(firebaseAuthUser.uid)

    const user = isNil(userFromFirebase)
      ? await createNewUserFromFirebaseAuthUser(firebaseAuthUser)
      : userFromFirebase

    firebase
      .auth()
      .currentUser.getIdToken(true)
      .then(function(idToken) {
        console.log('YOUGOU, Your token is ', idToken)
        // Send token to your backend via HTTPS
      })
      .catch(function(error) {
        console.log('ERROR, the error is ', error)
      })
    console.log('user', user)
    commit('setUser', user)
    console.log('stateuser', state.user)
    dispatch('products/getUserProducts', null, { root: true })
  },

  /**
   * Callback fired when user logout
   */
  logout: ({ commit }) => {
    commit('setUser', null)
    commit('products/setProducts', null, { root: true })

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
