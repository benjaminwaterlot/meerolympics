import { isNil } from 'lodash'
import axios from 'axios'

const production = process.env.NODE_ENV === 'production'

const client = axios.create({
  baseURL: production ? '' : 'http://localhost:3000'
})

export default {
  client: (_, __, rootState) => {
    client.defaults.headers.common['idtoken'] = rootState.authentication.idtoken
    return client
  },
  newContentAvailable: state => !isNil(state.SWRegistrationForNewContent)
}
