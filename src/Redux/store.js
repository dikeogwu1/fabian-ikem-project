import { createStore } from 'redux'
import reducer from './reducer'

const getLocalStorage = () => {
  let initsialState = localStorage.getItem('storage')
  if (initsialState) {
    return (initsialState = JSON.parse(localStorage.getItem('storage')))
  } else {
    return {
      currencies: [{ label: '', symbol: '' }],
      currentCurrency: { label: 'USD', symbol: '$' },
      cartItems: [],
      isOverlayOpen: false,
      isSwitcherOpen: false,
      inCartQuantity: 0,
      categories: [],
      amount: 0,
      total: 0,
    }
  }
}

const store = createStore(reducer, getLocalStorage())

export default store
