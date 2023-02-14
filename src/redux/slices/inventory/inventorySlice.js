import { createAsyncThunk } from '@reduxjs/toolkit'

const initialState = {
  inventory: [],
  status: 'idle',
  error: null,
}

export const fetchInventory = createAsyncThunk(
  'inventory/fetchInventory',
  async () => {
    try {
      const response = await fetch(process.env.REACT_APP_API_URL + '/items')
      const myJson = await response.json()
      return myJson
    } catch (error) {
      console.log(error)
      return require('../../../assets/utils/inventory.json')
    }
  }
)
