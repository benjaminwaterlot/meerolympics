import { isNil } from 'lodash'
import axios from 'axios'

const production = process.env.NODE_ENV === 'production'

const client = axios.create({
  baseURL: production ? 'https://meerolympics.herokuapp.com' : 'http://localhost:3000'
  // baseURL: production ? 'https://meerolympics.herokuapp.com' : 'https://meerolympics.herokuapp.com'
})

export default {
  client: (_, __, rootState) => {
    client.defaults.headers.common['idtoken'] = rootState.authentication.idtoken
    return client
  },
  newContentAvailable: state => !isNil(state.SWRegistrationForNewContent)
}
