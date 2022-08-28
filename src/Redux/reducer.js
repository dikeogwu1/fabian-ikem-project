import { ADD_ALL_CATEGORIES } from './action'

const reducer = (state, action) => {
  switch (action.type) {
    case ADD_ALL_CATEGORIES:
      return { ...state, categories: action.payload.categories }

    default:
      return state
  }
}

export default reducer
