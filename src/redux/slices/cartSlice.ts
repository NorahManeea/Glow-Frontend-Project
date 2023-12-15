import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import api from '../../api'

const initialState = {
  cartItems: [],
  totalItems: 0,
  totalPrice: 0,
  error: null,
  isLoading: false
}


export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
  }
})

export default cartSlice.reducer
