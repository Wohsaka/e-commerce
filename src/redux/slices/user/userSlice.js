import { createSlice } from '@reduxjs/toolkit'

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    isLogged: false,
    email: '',
    accessToken: '',
    role: '',
  },
  reducers: {
    userLoggedIn: (state, action) => {
      state.isLogged = true
      state.email = action.payload.email
      state.accessToken = action.payload.accessToken
      state.role = action.payload.role
    },
    userLoggedOut: (state) => {
      state.isLogged = false
      state.email = ''
      state.accessToken = ''
      state.role = ''
    },
  },
})

export const { userLoggedIn, userLoggedOut } = userSlice.actions
export default userSlice.reducer
