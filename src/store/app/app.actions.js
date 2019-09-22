import { isNil } from 'lodash'
import axios from 'axios'

// const client = axios.create({
//   baseURL: production ? '' : 'http://localhost:3000'
// })

export default {
  // request: async ({ dispatch, rootState }, { url, options = {} }) => {
  //   const idtoken = await dispatch('authentication/getIdToken', null, {
  //     root: true
  //   })
  //   // console.log('initiating request with id token : ', idtoken.slice(0, 10))
  //   // console.log('IDTOKEN', rootState.authentication.idtoken)
  //   // console.log(client)
  //   // console.log(client.headers)
  //   // console.log(client.options)

  //   return client.get(url, { headers: { idtoken }, ...options })
  // },

  /**
   * Closes "add to home screen" modal for apple
   */
  closeAddToHomeScreenModalForApple: async ({ commit }) => {
    localStorage.setItem('addToHomeIosPromptLastDate', Date.now())
    commit('setShowAddToHomeScreenModalForApple', false)
  },

  /**
   * Trigger service worker skipWating so the new service worker can take over.
   * This will also trigger a window refresh (see /src/misc/register-service-worker.js)
   */
  serviceWorkerSkipWaiting({ state, commit }) {
    if (isNil(state.SWRegistrationForNewContent)) return

    commit('setRefreshingApp', true)
    state.SWRegistrationForNewContent.waiting.postMessage('skipWaiting')
  }
}
