import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { AxiosError } from 'axios'
import api from '../../api'
import { WishlistState } from '../../types/types'
import WishListService from '../../services/wishlist'


const initialState: WishlistState = {
  wishlistItem: [],
  error: null,
  isLoading: false
}

//** Fetch Wishlist */
export const fetchWishlistThunk = createAsyncThunk(
  'wishlist/fetchWishlist',
  async (_, { rejectWithValue }) => {
    try {
      const res = await WishListService.fetchAllWishlistItemsApi()    
      return res.data
    } catch (error) {
      if (error instanceof AxiosError) {
        return rejectWithValue(error.response?.data)
      }
    }
  }
)

//** Add to Wishlist */
export const addToWishlistThunk = createAsyncThunk(
  'wishlist/addToWishlist',
  async (productId: string, { rejectWithValue }) => {
    try {
      const res = await WishListService.addToWishlistApi(productId)
      return res.data
    } catch (error) {
      if (error instanceof AxiosError) {
        return rejectWithValue(error.response?.data)
      }
    }
  }
)

export const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {},
  extraReducers(builder) {
    //** Fetch Wishlist Reducers */
    builder
      .addCase(fetchWishlistThunk.pending, (state) => {
        state.isLoading = true
      })
      .addCase(fetchWishlistThunk.fulfilled, (state, action) => {
        state.wishlistItem = action.payload.products
        state.isLoading = false
      })
      .addCase(fetchWishlistThunk.rejected, (state, action) => {})

      //** Add to Wishlist Reducers */
      .addCase(addToWishlistThunk.pending, (state) => {
        state.isLoading = true
      })
      .addCase(addToWishlistThunk.fulfilled, (state) => {
        state.isLoading = false
      })
      .addCase(addToWishlistThunk.rejected, (state) => {})
  }
})

export default wishlistSlice.reducer
