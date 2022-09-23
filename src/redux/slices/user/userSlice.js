import { createSlice } from '@reduxjs/toolkit'

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    isLogged: false,
  },
  reducers: {
    userLoggedIn: (state) => {
      state.isLogged = true
    },
    userLoggedOut: (state) => {
      state.isLogged = false
    },
  },
})

export const { userLoggedIn, userLoggedOut } = userSlice.actions
export default userSlice.reducer
