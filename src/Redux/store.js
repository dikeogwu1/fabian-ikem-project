import { createStore } from 'redux'
import reducer from './reducer'

const initsialState = {
  endPoint: null,
  amount: 0,
  total: 0,
}

const store = createStore(reducer, initsialState)

export default store
