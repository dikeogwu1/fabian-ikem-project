import { request } from 'graphql-request'
import store from '../Redux/store'

const queryServer = async (query) => {
  const response = await request('http://localhost:4000/', query)
  const data = await response
  store.dispatch({ type: 'GET_DATA', payload: data })
}

export default queryServer
