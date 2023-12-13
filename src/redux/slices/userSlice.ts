import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { UserState } from '../../types/types'
import { AxiosError } from 'axios'
import api from '../../api'

const initialState: UserState = {
  users: [],
  error: null,
  isLoading: false,
  isLoggedIn: false,
  user: null
}

//** Login Async Thunk */
export const loginThunk = createAsyncThunk(
  'auth/login',
  async (credentials: { email: string; password: string }, { rejectWithValue }) => {
    try {
      const res = await api.post('/api/auth/login', credentials)
      return res.data
    } catch (error) {
      if (error instanceof AxiosError) {
        return rejectWithValue(error.response?.data.msg)
      }
    }
  }
)

//** Register Async Thunk */
export const registerThunk = createAsyncThunk(
  'auth/register',
  async (
    credentials: { email: string; password: string; firstName: string; lastName: string },
    { rejectWithValue }
  ) => {
    try {
      const res = await api.post('/api/auth/register', credentials)
      return res.data
    } catch (error) {
      console.log(error)
      if (error instanceof AxiosError) {
        return rejectWithValue(error.response?.data.msg)
      }
    }
  }
)

export const userSlice = createSlice({
  name: 'user',
  initialState,
  //! TODO: NEED FIX after completeing extra reducers
  reducers: {
    loginSuccess: (state, action) => {
      state.user = action.payload
      state.isLoggedIn = true
    },
    logoutSuccess: (state) => {
      state.isLoggedIn = false
      state.user = null
    },
    userRequest: (state) => {
      state.isLoading = true
    },

    addUser: (state, action) => {
      state.users = [action.payload.user, ...state.users]
      state.isLoggedIn = true
    },
    removeUser: (state, action: { payload: { userId: string } }) => {
      const filteredUsers = state.users.filter((user) => user._id !== action.payload.userId)
      state.users = filteredUsers
    },
    editProfile: (state, action) => {
      const { id, firstName, lastName } = action.payload
      const foundUser = state.users.find((user) => user._id === id)

      if (foundUser) {
        foundUser.firstName = firstName
        foundUser.lastName = lastName
        state.user = foundUser
      }
    },
    setProfile(state, action) {
      state.user = action.payload
    },
    blockUser: (state, action: { payload: { userId: string } }) => {
      const foundUser = state.users.find((user) => user._id === action.payload.userId)
      if (foundUser) {
        foundUser.isBlocked = !foundUser.isBlocked
      }
    }
  },
  extraReducers: (builder) => {
    //** Login */
    builder.addCase(loginThunk.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(loginThunk.rejected, (state, action) => {
      const errorMsg = action.payload

      if (typeof errorMsg === 'string') {
        state.error = errorMsg
      }
      state.isLoading = false

      return state
    })
    builder.addCase(loginThunk.fulfilled, (state, action) => {
      state.user = action.payload.user
      state.isLoading = true
      return state
    })

    //** Register */
    builder.addCase(registerThunk.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(registerThunk.fulfilled, (state, action) => {
      state.user = action.payload.user
      state.isLoading = false
      return state
    })
    builder.addCase(registerThunk.rejected, (state, action) => {
      const errorMsg = action.payload
      if (typeof errorMsg === 'string') {
        state.error = errorMsg
      }
      state.isLoading = false
      return state
    })
  }
})

export const userActions = userSlice.actions
export default userSlice.reducer
