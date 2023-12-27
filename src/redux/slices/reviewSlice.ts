import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { ReviewState } from '../../types/types'
import { AxiosError } from 'axios'
import api from '../../api'

const initialState: ReviewState = {
  reviews: [],
  error: null,
  isLoading: false
}

// ** Fetch All Reviews */
export const fetchReviewsThunk = createAsyncThunk(
  'reviews/fetchReviews',
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get('/api/reviews')
      return res.data
    } catch (error) {
      if (error instanceof AxiosError) {
        return rejectWithValue(error.response?.data)
      }
    }
  }
)

export const reviewSlice = createSlice({
  name: 'review',
  initialState,
  reducers: {},
  extraReducers(builder) {
    //** Fetch All Reviews Reducers */
    builder
      .addCase(fetchReviewsThunk.pending, (state) => {
        state.isLoading = true
      })
      .addCase(fetchReviewsThunk.fulfilled, (state, action) => {
        state.reviews = action.payload
        state.isLoading = false
      })
      .addCase(fetchReviewsThunk.rejected, (state, action) => {
        const errorMsg = action.payload
        if (typeof errorMsg === 'string') {
          state.error = errorMsg
        }
        state.isLoading = false
        return state
      })
  }
})

export default reviewSlice.reducer

