import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import api from '../../api'
import { AxiosError } from 'axios'

//** Password Reset */
export const resetPasswordThunk = createAsyncThunk(
  '/resetPassword',
  async (email: string, { rejectWithValue }) => {
    try {
      const res = await api.post('/api/reset-password', { email })
      return res.data
    } catch (error) {
      if (error instanceof AxiosError) {
        return rejectWithValue(error.response?.data)
      }
      return rejectWithValue('Something went wrong')
    }
  }
)

//** Reset Password URL */
export const resetPasswordUrlThunk = createAsyncThunk(
  '/resetPasswordUrl',
  async (
    { userId, token, password }: { userId: string; token: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      const res = await api.post(`/api/reset-password/${userId}/${token}`, { password })
      
      console.log("🚀 ~ file: passwordSlice.ts:31 ~ res:", res)
      return res.data

    } catch (error) {
      if (error instanceof AxiosError) {
        return rejectWithValue(error.response?.data)
      }
      return rejectWithValue('Something went wrong')
    }
  }
)

//** Password Reset Slice */
const passwordResetSlice = createSlice({
  name: 'passwordReset',
  initialState: {
    isLoading: false,
    error: null,
    success: false
  },
  reducers: {},
  extraReducers: (builder) => {
    //** Reset Password */
    builder
      .addCase(resetPasswordThunk.pending, (state) => {
        state.isLoading = true
      })
      .addCase(resetPasswordThunk.fulfilled, (state) => {
        state.isLoading = false
        state.success = true
      })
      .addCase(resetPasswordThunk.rejected, (state, action) => {
        state.isLoading = false
      })

    //** Reset Password Link */
    builder
      .addCase(resetPasswordUrlThunk.pending, (state) => {
        state.isLoading = true
      })
      .addCase(resetPasswordUrlThunk.fulfilled, (state) => {
        state.isLoading = false
        state.success = true
      })
      .addCase(resetPasswordUrlThunk.rejected, (state, action) => {
        state.isLoading = false
      })
  }
})
export const passwordResetActions = passwordResetSlice.actions
export default passwordResetSlice.reducer
