import { request } from 'graphql-request'
import store from '../Redux/store'

export const endpoint = 'http://localhost:4000/'

const queryServer = async (query, whatAction) => {
  const response = await request(endpoint, query)
  const data = await response
  store.dispatch({ type: whatAction, payload: data })
}

export default queryServer
