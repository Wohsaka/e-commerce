import { createAsyncThunk } from '@reduxjs/toolkit'

const url = 'https://pug-store-api.onrender.com/api/items'

const initialState = {
  inventory: [],
  status: 'idle',
  error: null,
}

export const fetchInventory = createAsyncThunk(
  'inventory/fetchInventory',
  async () => {
    try {
      const response = await fetch(url)
      const myJson = await response.json()
      return myJson
    } catch (error) {
      console.log(error)
      return require('../../../assets/utils/inventory.json')
    }
  }
)
