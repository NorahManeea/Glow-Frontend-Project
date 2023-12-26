import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { AxiosError } from 'axios'
import { WishlistState } from '../../types/types'
import WishlistService from '../../services/wishlist'

const initialState: WishlistState = {
  wishlistItems: [],
  isLoading: false,
  error: null
}

//** Add To Wishlist Thunk */
export const addToWishlistThunk = createAsyncThunk(
  'wishlist/addToWishlist',
  async (productId: string, { rejectWithValue }) => {
    try {
      const res = await WishlistService.addToWishlistApi(productId)
      return res.data
    } catch (error) {
      if (error instanceof AxiosError) {
        return rejectWithValue(error.response?.data)
      }
    }
  }
)

//** Fetch Wishlist Items Thunk */
export const fetchWishlistItemsThunk = createAsyncThunk(
  'wishlist/fetchWishlist',
  async (_, { rejectWithValue }) => {
    try {
      const res = await WishlistService.fetchAllWishlistItemsApi()
      return res.data
    } catch (error) {
      if (error instanceof AxiosError) {
        return rejectWithValue(error.response?.data)
      }
    }
  }
)

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      //** Add to Wishlist Redcers */
      .addCase(addToWishlistThunk.pending, (state) => {
        state.isLoading = true
      })
      .addCase(addToWishlistThunk.fulfilled, (state, action) => {
        state.isLoading = false
      })
      .addCase(addToWishlistThunk.rejected, (state, action) => {
        const errorMsg = action.payload
        if (typeof errorMsg === 'string') {
          state.error = errorMsg
        }
        state.isLoading = false
        return state
      })

      //** Fetch Wishlist Items Reducers */
      .addCase(fetchWishlistItemsThunk.pending, (state) => {
        state.isLoading = true
      })
      .addCase(fetchWishlistItemsThunk.fulfilled, (state, action) => {
        state.isLoading = false
        state.wishlistItems = action.payload.wishlistItems.products
      })
      .addCase(fetchWishlistItemsThunk.rejected, (state, action) => {
        const errorMsg = action.payload
        if (typeof errorMsg === 'string') {
          state.error = errorMsg
        }
        state.isLoading = false
      })
  }
})

export default wishlistSlice.reducer
