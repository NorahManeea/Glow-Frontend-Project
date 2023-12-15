import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { AxiosError } from 'axios'
import api from '../../api'
import { DiscountCode, DiscountState } from '../../types/types'

const initialState: DiscountState = {
  discountCodes: [],
  error: null,
  isLoading: false
}

//** Fetch All Discount Codes */
export const fetchDiscountCodesThunk = createAsyncThunk(
  'discountCodes/fetchDiscountCodes',
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get('/api/discount-code')
      return res.data.payload
    } catch (error) {
      if (error instanceof AxiosError) {
        return rejectWithValue(error.response?.data)
      }
    }
  }
)

//**  Add Discount Code */
export const createDiscountCodeThunk = createAsyncThunk(
  'discountCodes/addDiscountCode',
  async (discountCodeData: Omit<DiscountCode, '_id'>, { rejectWithValue }) => {
    try {
      const res = await api.post('/api/discount-code', discountCodeData)
      return res.data.payload
    } catch (error) {
      if (error instanceof AxiosError) {
        return rejectWithValue(error.response?.data)
      }
    }
  }
)

//** Delete Discount Code */
export const deleteDiscountCodeThunk = createAsyncThunk(
  'discountCodes/deleteDiscountCode',
  async (discountCodeId: string, { rejectWithValue }) => {
    try {
      await api.delete(`/api/discount-code/${discountCodeId}`)
      return discountCodeId
    } catch (error) {
      if (error instanceof AxiosError) {
        return rejectWithValue(error.response?.data)
      }
    }
  }
)

export const discountCodeSlice = createSlice({
  name: 'discountCode',
  initialState,
  reducers: {},
  extraReducers(builder) {
    //** Fetch All Discount Codes Reducers */
    builder
      .addCase(fetchDiscountCodesThunk.pending, (state) => {
        state.isLoading = true
      })
      .addCase(fetchDiscountCodesThunk.fulfilled, (state, action) => {
        state.discountCodes = action.payload
        state.isLoading = false
      })
      .addCase(fetchDiscountCodesThunk.rejected, (state, action) => {
        const errorMsg = action.payload
        if (typeof errorMsg === 'string') {
          state.error = errorMsg
        }
        state.isLoading = false
        return state
      })

      //** Add Discount Code Reducers */
      .addCase(createDiscountCodeThunk.pending, (state) => {
        state.isLoading = true
      })
      .addCase(createDiscountCodeThunk.fulfilled, (state, action) => {
        const newCode = action.payload
        state.discountCodes = [newCode, ...state.discountCodes]
        state.isLoading = false
      })
      .addCase(createDiscountCodeThunk.rejected, (state, action) => {
        const errorMsg = action.payload
        if (typeof errorMsg === 'string') {
          state.error = errorMsg
        }
        state.isLoading = false
        return state
      })

      //** Delete Discount Code Reducers */
      .addCase(deleteDiscountCodeThunk.pending, (state) => {
        state.isLoading = true
      })
      .addCase(deleteDiscountCodeThunk.fulfilled, (state, action) => {
        const codeId = action.payload
        const updatedCodes = state.discountCodes.filter((code) => code._id !== codeId)
        state.discountCodes = updatedCodes
        state.isLoading = false
      })
      .addCase(deleteDiscountCodeThunk.rejected, (state, action) => {
        const errorMsg = action.payload
        if (typeof errorMsg === 'string') {
          state.error = errorMsg
        }
        state.isLoading = false
      })
  }
})

export default discountCodeSlice.reducer
