import { request } from 'graphql-request'
import store from '../Redux/store'

const queryServer = async (query, whatAction) => {
  const response = await request('http://localhost:4000/', query)
  const data = await response
  store.dispatch({ type: whatAction, payload: data })
}

export default queryServer
