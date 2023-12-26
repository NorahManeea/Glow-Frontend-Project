import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { AxiosError } from 'axios'
import { DiscountCode, DiscountState } from '../../types/types'
import DiscountCodeService from '../../services/discountCodes'

const initialState: DiscountState = {
  discountCodes: [],
  code: null,
  error: null,
  isLoading: false
}

//** Fetch All Discount Codes */
export const fetchDiscountCodesThunk = createAsyncThunk(
  'discountCodes/fetchDiscountCodes',
  async (_, { rejectWithValue }) => {
    try {
      const res = await DiscountCodeService.fetchAllDiscountCodesApi()
      return res.data.payload
    } catch (error) {
      if (error instanceof AxiosError) {
        return rejectWithValue(error.response?.data)
      }
    }
  }
)
//** Fetch Single Discount Codes */
export const fetchSingleDiscountCodeThunk = createAsyncThunk(
  'discountCode/fetchSingleDiscountCodeThunk',
  async (discountCode: string, { rejectWithValue }) => {
    try {
      const res = await DiscountCodeService.fetchSingleDiscountCodesApi(discountCode);
      return res.data.discountCode; 
    } catch (error) {
      if (error instanceof AxiosError) {
        return rejectWithValue(error.response?.data.msg);
      }
    }
  }
)

//**  Add Discount Code */
export const createDiscountCodeThunk = createAsyncThunk(
  'discountCodes/addDiscountCode',
  async (discountCodeData: Omit<DiscountCode, '_id'>, { rejectWithValue }) => {
    try {
      const res = await DiscountCodeService.createDiscountCodeApi(discountCodeData)
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
      await DiscountCodeService.deleteDiscountCodeApi(discountCodeId)
      return discountCodeId
    } catch (error) {
      if (error instanceof AxiosError) {
        return rejectWithValue(error.response?.data)
      }
    }
  }
)
//** Update Discount Code */
export const updateDiscountCodeThunk = createAsyncThunk(
  'discountCodes/updateDiscountCode',
  async (updatedCode: DiscountCode, { rejectWithValue }) => {
    try {
      const res = await DiscountCodeService.updateDiscountCodeApi(updatedCode)
      return res.data.payload
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

      //** Fetch Single Discount Code */
      .addCase(fetchSingleDiscountCodeThunk.pending, (state) => {
        state.isLoading = true
      })
      .addCase(fetchSingleDiscountCodeThunk.fulfilled, (state, action) => {
        state.code = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchSingleDiscountCodeThunk.rejected, (state, action) => {
        const errorMessage = action.payload
        if (typeof errorMessage === 'string') {
          state.error = errorMessage
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

      //** Update Discount Code Reducers */
      .addCase(updateDiscountCodeThunk.pending, (state) => {
        state.isLoading = true
      })
      .addCase(updateDiscountCodeThunk.fulfilled, (state, action) => {
        state.discountCodes = state.discountCodes.filter(
          (discountCode) => discountCode._id !== action.payload._id
        )
        state.discountCodes = [action.payload, ...state.discountCodes]
        state.isLoading = false
      })
      .addCase(updateDiscountCodeThunk.rejected, (state, action) => {
        const errorMsg = action.payload
        if (typeof errorMsg === 'string') {
          state.error = errorMsg
        }
        state.isLoading = false
        return state
      })
  }
})

export default discountCodeSlice.reducer
