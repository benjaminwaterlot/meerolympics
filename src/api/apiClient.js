import axios from 'axios'
import store from '../store'

const production = process.env.NODE_ENV === 'production'

;(async () => {
  console.log('store', store)
  console.log('token', store.dispatch('authentication/getIdToken').then(t => t))
})()

const client = axios.create({
  baseURL: production ? '' : 'http://localhost:3000',
  headers: {
    idtoken: store.dispatch('authentication/getIdToken').then(t => t)
  }
})

export default client
