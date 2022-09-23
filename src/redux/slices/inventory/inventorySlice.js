import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const url = 'https://mocki.io/v1/a3f6a898-081a-439f-8bbf-c83bff112ec5'

const initialState = {
  inventory: [],
  status: 'idle',
  error: null,
}

export const fetchInventory = createAsyncThunk(
  'inventory/fetchInventory',
  async () => {
    const response = await fetch(url)
    const myJson = await response.json()
    return myJson
  }
)
