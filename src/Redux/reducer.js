import { __esModule } from '@testing-library/jest-dom/dist/matchers'
import {
  ADD_ALL_CATEGORIES,
  ADD_CURRENCIES,
  ADD_TO_CART,
  CALCULATE_CART,
  CLOSE_MINI_CART,
  CLOSE_SWITCHER,
  DECREASE_QUANTITY,
  INCREASE_QUANTITY,
  SWITCH_CURRENCY,
  TOGGLE_MINI_CART,
  TOGGLE_CURRENCY_SWITCHER,
} from './action'

const reducer = (state, action) => {
  switch (action.type) {
    // ***** LOGIC FOR FETCHING ALL CATEGORIES *****
    case ADD_ALL_CATEGORIES:
      return { ...state, categories: action.payload.category.products }

    // ***** LOGIC FOR FETCHING CURRENCY *****
    case ADD_CURRENCIES:
      return { ...state, currencies: action.payload.currencies }

    // ***** LOGIC FOR SWITCHING CURRENCY *****
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

    // ***** LOGIC FOR OPENING / CLOSING CURRENCY SWITCHER *****
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

    // ***** LOGIC FOR CLOSING CURRENCY SWITCHER *****
    case CLOSE_SWITCHER:
      localStorage.setItem(
        'storage',
        JSON.stringify({ ...state, isSwitcherOpen: false })
      )
      return { ...state, isSwitcherOpen: false }

    // ***** LOGIC FOR OPENING / CLOSING OF CART OVERLAY *****
    case TOGGLE_MINI_CART:
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

    // ***** LOGIC FOR CLOSING CART OVERLAY *****
    case CLOSE_MINI_CART:
      localStorage.setItem(
        'storage',
        JSON.stringify({ ...state, isOverlayOpen: false })
      )
      return { ...state, isOverlayOpen: false }

    // ***** LOGIC FOR ADDING PRODUCT TO CART *****
    case ADD_TO_CART:
      let addingVariant
      let addingMoreVariant
      let products = state.categories.find(
        (product) => product.id === action.payload.id
      )

      const simillarProduct = state.cartItems.find(
        (product) => product.id === action.payload.id
      )

      if (!simillarProduct) {
        addingVariant = false
        addingMoreVariant = false
      } else if (simillarProduct && simillarProduct.productVariant.length < 1) {
        if (
          JSON.stringify(simillarProduct.selectedGallery) !==
          JSON.stringify(action.payload.attr.gallery)
        ) {
          addingVariant = true
          addingMoreVariant = false
        } else {
          addingVariant = false
          addingMoreVariant = false
        }
      } else if (
        simillarProduct &&
        simillarProduct.productVariant.length >= 1
      ) {
        const checkForSame = simillarProduct.productVariant.map((item) => {
          if (
            JSON.stringify(item.selectedGallery) ===
            JSON.stringify(action.payload.attr.gallery)
          ) {
            return 'exist'
          }
          return 'notexist'
        })
        if (
          checkForSame.indexOf('exist') === -1 &&
          JSON.stringify(simillarProduct.selectedGallery) !==
            JSON.stringify(action.payload.attr.gallery)
        ) {
          addingMoreVariant = true
          addingVariant = false
        } else {
          addingMoreVariant = false
          addingVariant = false
        }
      } else {
        addingVariant = false
        addingMoreVariant = false
      }

      // adding product based on conditions
      if (!addingVariant && !simillarProduct && !addingMoreVariant) {
        state.cartItems.push({
          ...products,
          attributes: action.payload.attr.productAttr,
          selectedGallery: action.payload.attr.gallery,
          productVariant: [],
          quantity: 1,
        })
      }

      if (addingVariant) {
        state.cartItems.map((product) => {
          if (product.id === action.payload.id) {
            product.productVariant.push({
              ...products,
              attributes: action.payload.attr.productAttr,
              selectedGallery: action.payload.attr.gallery,
              productVariant: [],
              quantity: 1,
            })
          }
          return product
        })
      }

      if (addingMoreVariant && !addingVariant) {
        state.cartItems.map((product) => {
          if (product.id === action.payload.id) {
            product.productVariant.push({
              ...products,
              attributes: action.payload.attr.productAttr,
              selectedGallery: action.payload.attr.gallery,
              productVariant: [],
              quantity: 1,
            })
          }
          return product
        })
      }
      localStorage.setItem('storage', JSON.stringify(state))
      return state

    // ***** LOGIC FOR CALCULATING PRODUCTS IN CART *****
    case CALCULATE_CART:
      let qty = 0
      let amount = 0
      state.cartItems.forEach((product) => {
        const productPrice = product.prices.find(
          (singlePrice) =>
            singlePrice.currency.label === state.currentCurrency.label
        )

        if (product.productVariant.length > 0) {
          product.productVariant.forEach((item) => {
            qty += item.quantity

            const variantPrice = item.prices.find(
              (singlePrice) =>
                singlePrice.currency.label === state.currentCurrency.label
            )

            amount += item.quantity * variantPrice.amount
          })
        }

        qty += product.quantity
        amount += product.quantity * productPrice.amount
      })
      localStorage.setItem(
        'storage',
        JSON.stringify({ ...state, total: amount, inCartQuantity: qty })
      )
      return { ...state, total: amount, inCartQuantity: qty }

    // ***** LOGIC FOR INCREASING PRODUCT QUANTITY *****
    case INCREASE_QUANTITY:
      let isVariant
      let isNotVariant

      let rightProduct = state.cartItems.find(
        (product) => product.id === action.payload.id
      )

      if (
        JSON.stringify(rightProduct.selectedGallery) ===
          JSON.stringify(action.payload.productAttr) ||
        JSON.stringify(action.payload.productAttr) === 'false'
      ) {
        isVariant = false
        isNotVariant = true
      } else {
        isVariant = true
        isNotVariant = false
      }

      const increaseVariant = rightProduct.productVariant.map((product) => {
        if (
          JSON.stringify(product.selectedGallery) ===
          JSON.stringify(action.payload.productAttr)
        ) {
          return { ...product, quantity: product.quantity + 1 }
        }
        return product
      })

      const increase = state.cartItems.map((product) => {
        if (product.id === action.payload.id && !isVariant && isNotVariant) {
          return { ...product, quantity: product.quantity + 1 }
        }
        if (product.id === action.payload.id && isVariant && !isNotVariant) {
          return { ...product, productVariant: increaseVariant }
        }
        return product
      })

      localStorage.setItem(
        'storage',
        JSON.stringify({ ...state, cartItems: increase })
      )
      return { ...state, cartItems: increase }

    // ***** LOGIC FOR DECREASING PRODUCT QUANTITY *****
    case DECREASE_QUANTITY:
      let isProductVariant = true
      let isNotProductVariant = true
      let findProduct = state.cartItems.find(
        (product) => product.id === action.payload.id
      )

      if (
        JSON.stringify(findProduct.selectedGallery) ===
          JSON.stringify(action.payload.productAttr) ||
        JSON.stringify(action.payload.productAttr) === 'false'
      ) {
        isProductVariant = false
        isNotProductVariant = true
      } else {
        isProductVariant = true
        isNotProductVariant = false
      }

      const decreaseVariant = findProduct.productVariant
        .map((product) => {
          if (
            JSON.stringify(product.selectedGallery) ===
            JSON.stringify(action.payload.productAttr)
          ) {
            return { ...product, quantity: product.quantity - 1 }
          }
          return product
        })
        .filter((single) => {
          return single.quantity !== 0
        })

      const decrease = state.cartItems
        .map((product) => {
          if (
            product.id === action.payload.id &&
            !isProductVariant &&
            isNotProductVariant &&
            product.quantity !== 1
          ) {
            return { ...product, quantity: product.quantity - 1 }
          }
          if (
            product.id === action.payload.id &&
            !isProductVariant &&
            isNotProductVariant &&
            product.quantity === 1 &&
            product.productVariant.length < 1
          ) {
            return { ...product, quantity: product.quantity - 1 }
          }
          if (
            product.id === action.payload.id &&
            !isProductVariant &&
            isNotProductVariant &&
            product.quantity === 1 &&
            product.productVariant.length > 0
          ) {
            const slicedVariant = product.productVariant.filter(
              (item, i) => i !== 0
            )
            return {
              ...product.productVariant[0],
              productVariant: slicedVariant,
            }
          }
          if (
            product.id === action.payload.id &&
            isProductVariant &&
            !isNotProductVariant
          ) {
            return { ...product, productVariant: decreaseVariant }
          }
          return product
        })
        .filter((all) => {
          return all.quantity !== 0
        })

      localStorage.setItem(
        'storage',
        JSON.stringify({ ...state, cartItems: decrease })
      )
      return { ...state, cartItems: decrease }

    // ***** ALWAYS RETURN STATE *****
    default:
      return state
  }
}

export default reducer
