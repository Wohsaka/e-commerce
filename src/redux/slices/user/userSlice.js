import { createSlice } from '@reduxjs/toolkit'

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    isLogged: false,
    email: '',
  },
  reducers: {
    userLoggedIn: (state, action) => {
      state.isLogged = true
      state.email = action.payload
    },
    userLoggedOut: (state) => {
      state.isLogged = false
      state.email = ''
    },
  },
})

export const { userLoggedIn, userLoggedOut } = userSlice.actions
export default userSlice.reducer
