import {
  ADD_ALL_CATEGORIES,
  ADD_CURRENCIES,
  ADD_TO_CART,
  CALCULATE_CART,
  CLOSE_CART_OVERLAY,
  CLOSE_SWITCHER,
  DECREASE_QUANTITY,
  INCREASE_QUANTITY,
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

    // Logic for Opening / closing currency switcher
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

    // Logic for Opening / closing the cart overlay
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

    // Logic for Adding product to cart
    case ADD_TO_CART:
      let addingVariant
      let products = state.categories.find(
        (product) => product.id === action.payload.id
      )

      const simillarProduct = state.cartItems.find(
        (product) => product.id === action.payload.id
      )

      if (simillarProduct) {
        for (
          let index = 0;
          index < simillarProduct.attributes.length;
          index++
        ) {
          if (
            simillarProduct.attributes[index].selectedAtt !==
            action.payload.attr.productAttr[index].selectedAtt
          ) {
            addingVariant = true
          } else {
            addingVariant = false
          }
        }
      }

      if (!simillarProduct) {
        addingVariant = false
      }

      if (!addingVariant && !simillarProduct) {
        state.cartItems.push({
          ...products,
          attributes: action.payload.attr.productAttr,
          selectedGallery: action.payload.attr.gallery,
          productVariant: [],
          quantity: 1,
        })
        localStorage.setItem('storage', JSON.stringify(state))
        return state
      }

      if (
        addingVariant &&
        simillarProduct &&
        simillarProduct.productVariant.length < 1
      ) {
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
        localStorage.setItem('storage', JSON.stringify(state))
        return state
      }

      if (
        addingVariant &&
        simillarProduct &&
        simillarProduct.productVariant.length > 0
      ) {
        simillarProduct.productVariant.forEach((item) => {
          for (let index = 0; index < item.attributes.length; index++) {
            if (
              simillarProduct.attributes[index].selectedAtt !==
                action.payload.attr.productAttr[index].selectedAtt &&
              item.attributes[index].selectedAtt !==
                action.payload.attr.productAttr[index].selectedAtt
            ) {
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
              localStorage.setItem('storage', JSON.stringify(state))
              return state
            }
          }
        })
      }

      localStorage.setItem('storage', JSON.stringify(state))
      return state

    // Logic for Calculating products in cart
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

    // Logic for decreasing product quantity
    case INCREASE_QUANTITY:
      let isVariant = true
      let rightProduct = state.cartItems.find(
        (product) => product.id === action.payload.id
      )

      for (let index = 0; index < rightProduct.attributes.length; index++) {
        if (
          rightProduct.attributes[index].selectedAtt ===
          action.payload.productAttr[index]
        ) {
          isVariant = false
        }
      }

      if (rightProduct.attributes.length < 1) {
        isVariant = false
      }

      const increaseVariant = rightProduct.productVariant.map((product) => {
        for (let index = 0; index < product.attributes.length; index++) {
          if (
            product.attributes[index].selectedAtt ===
            action.payload.productAttr[index]
          ) {
            return { ...product, quantity: product.quantity + 1 }
          }
        }
        return product
      })

      const increase = state.cartItems.map((product) => {
        if (product.id === action.payload.id && !isVariant) {
          return { ...product, quantity: product.quantity + 1 }
        }
        if (product.id === action.payload.id && isVariant) {
          return { ...product, productVariant: increaseVariant }
        }
        return product
      })

      localStorage.setItem(
        'storage',
        JSON.stringify({ ...state, cartItems: increase })
      )
      return { ...state, cartItems: increase }

    // Logic for decreasing product quantity
    case DECREASE_QUANTITY:
      let isProductVariant = true
      let findProduct = state.cartItems.find(
        (product) => product.id === action.payload.id
      )

      for (let index = 0; index < findProduct.attributes.length; index++) {
        if (
          findProduct.attributes[index].selectedAtt ===
          action.payload.productAttr[index]
        ) {
          isProductVariant = false
        }
      }

      if (findProduct.attributes.length < 1) {
        isProductVariant = false
      }

      const decreaseVariant = findProduct.productVariant.map((product) => {
        for (let index = 0; index < product.attributes.length; index++) {
          if (
            product.attributes[index].selectedAtt ===
              action.payload.productAttr[index] &&
            product.quantity !== 1
          ) {
            return { ...product, quantity: product.quantity - 1 }
          }
        }
        return product
      })

      const decrease = state.cartItems.map((product) => {
        if (
          product.id === action.payload.id &&
          !isProductVariant &&
          product.quantity !== 1
        ) {
          return { ...product, quantity: product.quantity - 1 }
        }
        if (product.id === action.payload.id && isProductVariant) {
          return { ...product, productVariant: decreaseVariant }
        }
        return product
      })

      localStorage.setItem(
        'storage',
        JSON.stringify({ ...state, cartItems: decrease })
      )
      return { ...state, cartItems: decrease }

    // Always return state
    default:
      return state
  }
}

export default reducer
