import { createSlice } from '@reduxjs/toolkit'

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    isLogged: false,
    email: '',
    accessToken: '',
  },
  reducers: {
    userLoggedIn: (state, action) => {
      state.isLogged = true
      state.email = action.payload.email
      state.accessToken = action.payload.accessToken
    },
    userLoggedOut: (state) => {
      state.isLogged = false
      state.email = ''
      state.accessToken = ''
    },
  },
})

export const { userLoggedIn, userLoggedOut } = userSlice.actions
export default userSlice.reducer
