import { request } from 'graphql-request'
import store from '../Redux/store'
import { ADD_ALL_CATEGORIES } from '../Redux/action'
import QUERYS from './queries'

const queryServer = async (query, whatAction) => {
  const response = await request('http://localhost:4000/', query)
  const data = await response
  store.dispatch({ type: whatAction, payload: data })
}

queryServer(QUERYS.ALL_CATEGORIES, ADD_ALL_CATEGORIES)

export default queryServer
