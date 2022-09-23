import { configureStore } from '@reduxjs/toolkit'
import cartReducer from './slices/cart/cartSlice'
import userReducer from './slices/user/userSlice'

export default configureStore({
  reducer: {
    cart: cartReducer,
    user: userReducer,
  },
})
