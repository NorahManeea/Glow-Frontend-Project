import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import api from '../../api'
import { AxiosError } from 'axios'
import { CartState } from '../../types/types'
import CartService from '../../services/cart'

const initialState: CartState = {
  cartItems: [],
  totalItems: 0,
  totalPrice: 0,
  error: null,
  isLoading: false,
  cartLength: 0
}
//** Add To Cart Thunks */
export const addToCartThunk = createAsyncThunk(
  'cart/addToCart',
  async ({ productId, quantity }: { productId: string; quantity: number }, { rejectWithValue }) => {
    try {
      const response = await api.post('/api/cart', { productId, quantity })
      return response.data
    } catch (error) {
      if (error instanceof AxiosError) {
        return rejectWithValue(error.response?.data)
      }
    }
  }
)

//** Get Cart Items */
export const getCartItemsThunk = createAsyncThunk(
  'cart/getCartItems',
  async (_, { rejectWithValue }) => {
    try {
      const response = await CartService.fetchAllCartItemsApi()
      return response.data
    } catch (error) {
      if (error instanceof AxiosError) {
        return rejectWithValue(error.response?.data)
      }
    }
  }
)

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    //** Add To Cart Reducers */
    builder
      .addCase(addToCartThunk.pending, (state) => {
        state.isLoading = true
      })
      .addCase(addToCartThunk.fulfilled, (state) => {
        state.isLoading = false
      })
      .addCase(addToCartThunk.rejected, (state, action) => {
        const errorMsg = action.payload
        if (typeof errorMsg === 'string') {
          state.error = errorMsg
        }
        state.isLoading = false
        return state
      })

      //** Get Cart Items Reducers */
      .addCase(getCartItemsThunk.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getCartItemsThunk.fulfilled, (state, action) => {
        state.isLoading = false
        state.cartItems = action.payload.cartItems
        state.totalItems = action.payload.totalItems
        state.totalPrice = action.payload.totalPrice
      })
      .addCase(getCartItemsThunk.rejected, (state, action) => {
        const errorMsg = action.payload
        if (typeof errorMsg === 'string') {
          state.error = errorMsg
        }
        state.isLoading = false
      })
  }
})

export default cartSlice.reducer
