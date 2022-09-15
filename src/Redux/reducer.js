import {
  ADD_ALL_CATEGORIES,
  ADD_CURRENCIES,
  ADD_TO_CART,
  ADD_VARIANT,
  CALCULATE_CART,
  CLOSE_CART_OVERLAY,
  CLOSE_SWITCHER,
  SWITCH_CURRENCY,
  TOGGLE_CART_OVERLAY,
  TOGGLE_CURRENCY_SWITCHER,
} from './action'

const reducer = (state, action) => {
  switch (action.type) {
    // Logic to fetch all categories
    case ADD_ALL_CATEGORIES:
      return { ...state, categories: action.payload.category.products }

    // Logic to fetch currency
    case ADD_CURRENCIES:
      return { ...state, currencies: action.payload.currencies }

    // Logic for switching currency
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

    // Open or close currency switcher
    case TOGGLE_CURRENCY_SWITCHER:
      if (state.isSwitcherOpen) {
        localStorage.setItem(
          'storage',
          JSON.stringify({ ...state, isSwitcherOpen: false })
        )
        return { ...state, isOverlayOpen: false, isSwitcherOpen: false }
      } else {
        localStorage.setItem(
          'storage',
          JSON.stringify({ ...state, isSwitcherOpen: true })
        )
        return { ...state, isOverlayOpen: false, isSwitcherOpen: true }
      }

    // Logic for closing currency switcher
    case CLOSE_SWITCHER:
      localStorage.setItem(
        'storage',
        JSON.stringify({ ...state, isSwitcherOpen: false })
      )
      return { ...state, isSwitcherOpen: false }

    // Open or close the cart overlay
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

    // Logic for closing cart overlay
    case CLOSE_CART_OVERLAY:
      localStorage.setItem(
        'storage',
        JSON.stringify({ ...state, isOverlayOpen: false })
      )
      return { ...state, isOverlayOpen: false }

    // Add a product to cart
    case ADD_TO_CART:
      const products = state.categories.find(
        (product) => product.id === action.payload.id
      )
      state.cartItems.push({
        ...products,
        quantity: 1,
        selectedAtt: action.payload.attr,
      })
      localStorage.setItem('storage', JSON.stringify(state))
      return state

    // Add a product to cart as product variant
    case ADD_VARIANT:
      const variant = state.categories.find(
        (product) => product.id === action.payload.id
      )

      const addVariant = state.cartItems.map((items) => {
        if (items.id === action.payload.id && !items.productVariant) {
          console.log(items.productVariant)
          return {
            ...items,
            productVariant: [
              { ...variant, quantity: 1, selectedAtt: action.payload.attr },
            ],
          }
        }
        if (
          items.id === action.payload.id &&
          items.productVariant &&
          items.productVariant.selectedAtt.productAttr !==
            action.payload.attr.productAttr
        ) {
          console.log(items.productVariant)
          return items.productVariant.push({
            ...variant,
            quantity: 1,
            selectedAtt: action.payload.attr,
          })
        }

        return items
      })

      localStorage.setItem(
        'storage',
        JSON.stringify({ ...state, cartItems: addVariant })
      )
      return { ...state, cartItems: addVariant }

    // Calculate products in cart
    case CALCULATE_CART:
      let qty = 0
      let amount = 0
      state.cartItems.forEach((product) => {
        const productPrice = product.prices.find(
          (singlePrice) =>
            singlePrice.currency.label === state.currentCurrency.label
        )

        if (product.productVariant) {
          product.productVariant.forEach((item) => {
            qty = qty + product.quantity + item.quantity

            const variantPrice = item.prices.find(
              (singlePrice) =>
                singlePrice.currency.label === state.currentCurrency.label
            )

            amount +=
              product.quantity * productPrice.amount +
              item.quantity * variantPrice.amount
          })
        } else {
          qty += product.quantity
          amount += product.quantity * productPrice.amount
        }
      })
      localStorage.setItem(
        'storage',
        JSON.stringify({ ...state, total: amount, inCartQuantity: qty })
      )
      return { ...state, total: amount, inCartQuantity: qty }

    // Always return state
    default:
      return state
  }
}

export default reducer
