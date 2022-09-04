import {
  ADD_ALL_CATEGORIES,
  ADD_CURRENCIES,
  CLOSE_SWITCHER,
  SWITCH_CURRENCY,
  TOGGLE_CART_OVERLAY,
  TOGGLE_CURRENCY_SWITCHER,
} from './action'

const reducer = (state, action) => {
  switch (action.type) {
    case ADD_CURRENCIES:
      return { ...state, currencies: action.payload.currencies }

    case SWITCH_CURRENCY:
      if (state.currencies.length > 1) {
        const newCurrency = state.currencies.find(
          (currency, index) => index === action.payload
        )
        localStorage.setItem(
          'storage',
          JSON.stringify({
            ...state,
            currentCurrency: newCurrency,
            isSwitcherOpen: false,
          })
        )
        return { ...state, currentCurrency: newCurrency, isSwitcherOpen: false }
      }

    case TOGGLE_CURRENCY_SWITCHER:
      if (state.isSwitcherOpen) {
        localStorage.setItem(
          'storage',
          JSON.stringify({ ...state, isSwitcherOpen: false })
        )
        return { ...state, isSwitcherOpen: false }
      } else {
        localStorage.setItem(
          'storage',
          JSON.stringify({ ...state, isSwitcherOpen: true })
        )
        return { ...state, isSwitcherOpen: true }
      }

    case CLOSE_SWITCHER:
      localStorage.setItem(
        'storage',
        JSON.stringify({ ...state, isSwitcherOpen: false })
      )
      return { ...state, isSwitcherOpen: false }

    case TOGGLE_CART_OVERLAY:
      if (state.isOverlayOpen) {
        localStorage.setItem(
          'storage',
          JSON.stringify({ ...state, isOverlayOpen: false })
        )
        return { ...state, isOverlayOpen: false }
      } else {
        localStorage.setItem(
          'storage',
          JSON.stringify({ ...state, isOverlayOpen: true })
        )
        return { ...state, isOverlayOpen: true }
      }

    default:
      return state
  }
}

export default reducer
