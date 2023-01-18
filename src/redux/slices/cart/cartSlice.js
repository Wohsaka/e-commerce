import { createSlice } from '@reduxjs/toolkit'

export const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: {},
    total: 0,
  },
  reducers: {
    addToCart: (state, action) => {
      if (state.items[action.payload.productName] !== undefined) {
        const newAmount =
          state.items[action.payload.productName].amount +
          action.payload.quantity
        state.items = {
          ...state.items,
          [action.payload.productName]: {
            ...state.items[action.payload.productName],
            amount: newAmount,
            subTotal:
              parseFloat(action.payload.productPrice) * parseFloat(newAmount),
          },
        }
        state.total +=
          parseFloat(action.payload.productPrice) *
          parseFloat(action.payload.quantity)
      } else {
        state.items = {
          ...state.items,
          [action.payload.productName]: {
            name: action.payload.productName,
            img: action.payload.productImg,
            price: parseFloat(action.payload.productPrice),
            amount: parseInt(action.payload.quantity),
            subTotal:
              parseFloat(action.payload.productPrice) *
              parseFloat(action.payload.quantity),
          },
        }
        state.total +=
          parseFloat(action.payload.productPrice) *
          parseFloat(action.payload.quantity)
      }
    },
    addOne: (state, action) => {
      state.items[action.payload.name].amount += 1
      state.items[action.payload.name].subTotal += action.payload.price
      state.total += action.payload.price
    },
    minusOne: (state, action) => {
      state.items[action.payload.name].amount -= 1
      state.items[action.payload.name].subTotal -= action.payload.price
      state.total -= action.payload.price
      if (state.items[action.payload.name].amount === 0) {
        delete state.items[action.payload.name]
      }
    },
    resetCart: (state) => {
      state.items = {}
      state.total = 0.0
    },
  },
})

export const { addToCart, addOne, minusOne, resetCart } = cartSlice.actions
export default cartSlice.reducer
