import api from '../../api'
import { AxiosError } from 'axios'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { UserState } from '../../types/types'
import { getDecodedTokenFromStorage } from '../../utils/token'
import UserService from '../../services/users'

const decodedUser = getDecodedTokenFromStorage()

const initialState: UserState = {
  users: [],
  error: null,
  isLoading: false,
  isLoggedIn: false,
  user: null,
  usersCount: 0,
  decodedUser
}
//** Login Async Thunk */
export const loginThunk = createAsyncThunk(
  'auth/login',
  async (credentials: { email: string; password: string }, { rejectWithValue }) => {
    try {
      const res = await UserService.loginApi(credentials)
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
      const res = await UserService.registerApi(credentials)
      return res.data
    } catch (error) {
      if (error instanceof AxiosError) {
        return rejectWithValue(error.response?.data.msg)
      }
    }
  }
)

//** Fetch All Users */
export const fetchUsersThunk = createAsyncThunk(
  'users/fetchUsers',
  async (_, { rejectWithValue }) => {
    try {
      const res = await UserService.fetchAllUsersApi()
      return res.data.payload
    } catch (error) {
      if (error instanceof AxiosError) {
        return rejectWithValue(error.response?.data)
      }
    }
  }
)

//** Delete User */
export const deleteUserThunk = createAsyncThunk(
  'users/deleteUser',
  async (userId: string, { rejectWithValue }) => {
    try {
      await UserService.deleteUserApi(userId)
      return userId
    } catch (error) {
      if (error instanceof AxiosError) {
        return rejectWithValue(error.response?.data)
      }
    }
  }
)

//** Block User */
export const blockUserThunk = createAsyncThunk(
  'users/blockUser',
  async (userId: string, { rejectWithValue }) => {
    try {
      await UserService.blockUserApi(userId)
      return userId
    } catch (error) {
      if (error instanceof AxiosError) {
        return rejectWithValue(error.response?.data)
      }
    }
  }
)
//** Set Profile */
export const setProfileThunk = createAsyncThunk(
  'users/setProfile',
  async (userId: string, { rejectWithValue }) => {
    try {
      const res = await UserService.setUserProfileApi(userId)
      return res.data.payload
    } catch (error) {
      if (error instanceof AxiosError) {
        return rejectWithValue(error.response?.data)
      }
    }
  }
)
//** Update Profile */
export const updateProfileThunk = createAsyncThunk(
  'users/updateProfile',
  async (
    { userId, firstName, lastName }: { userId: string; firstName: string; lastName: string },
    { rejectWithValue }
  ) => {
    try {
      const res = await api.put(`/api/users/profile/${userId}`, { firstName, lastName })
      return res.data.payload
    } catch (error) {
      if (error instanceof AxiosError) {
        return rejectWithValue(error.response?.data)
      }
    }
  }
)
//** Users Count Thunk */
export const fetchUsersCountThunk = createAsyncThunk(
  'users/fetchUsersCount',
  async (_, { rejectWithValue }) => {
    try {
      const res = await UserService.fetchUserCountApi()
      return res.data.payload
    } catch (error) {
      if (error instanceof AxiosError) {
        return rejectWithValue(error.response?.data)
      }
    }
  }
)
//** Change User Role */
export const grantUserRoleThunk = createAsyncThunk(
  'users/grantRole',
  async (userId: string, { rejectWithValue }) => {
    try {
      await api.put(`/api/users/grant-role/${userId}`)
      return userId
    } catch (error) {
      if (error instanceof AxiosError) {
        return rejectWithValue(error.response?.data)
      }
    }
  }
)

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logoutSuccess: (state) => {
      state.isLoggedIn = false
      state.user = null
      state.decodedUser = null
      return state
    }
  },
  extraReducers: (builder) => {
    //** Login Reducer */
    builder
      .addCase(loginThunk.pending, (state) => {
        state.isLoading = true
      })
      .addCase(loginThunk.rejected, (state, action) => {
        const errorMsg = action.payload

        if (typeof errorMsg === 'string') {
          state.error = errorMsg
        }
        state.isLoading = false
        return state
      })
      .addCase(loginThunk.fulfilled, (state, action) => {
        state.user = action.payload.user
        state.decodedUser = decodedUser
        state.isLoading = false
        state.isLoggedIn = true
        return state
      })
      //** Register Reducer */
      .addCase(registerThunk.pending, (state) => {
        state.isLoading = true
      })
      .addCase(registerThunk.fulfilled, (state, action) => {
        state.user = action.payload.user
        state.isLoading = false
      })
      .addCase(registerThunk.rejected, (state, action) => {
        const errorMsg = action.payload
        if (typeof errorMsg === 'string') {
          state.error = errorMsg
        }
        state.isLoading = false
        return state
      })
      //** Fetch All Users Reducers */
      .addCase(fetchUsersThunk.pending, (state) => {
        state.isLoading = true
      })
      .addCase(fetchUsersThunk.fulfilled, (state, action) => {
        state.users = action.payload
        state.isLoading = false
      })
      .addCase(fetchUsersThunk.rejected, (state, action) => {
        const errorMsg = action.payload
        if (typeof errorMsg === 'string') {
          state.error = errorMsg
        }
        state.isLoading = false
        return state
      })
      //** Delete User Reducers */
      .addCase(deleteUserThunk.pending, (state) => {
        state.isLoading = true
      })
      .addCase(deleteUserThunk.fulfilled, (state, action) => {
        const userId = action.payload
        const updateCategory = state.users.filter((user) => user._id !== userId)
        state.users = updateCategory
        state.isLoading = false
      })
      .addCase(deleteUserThunk.rejected, (state, action) => {
        const errorMsg = action.payload
        if (typeof errorMsg === 'string') {
          state.error = errorMsg
        }
        state.isLoading = false
        return state
      })
      //** Block User Reducers */
      .addCase(blockUserThunk.pending, (state) => {
        state.isLoading = true
      })
      .addCase(blockUserThunk.fulfilled, (state, action) => {
        const foundUser = state.users.find((user) => user._id === action.payload)
        if (foundUser) {
          foundUser.isBlocked = !foundUser.isBlocked
        }
      })
      .addCase(blockUserThunk.rejected, (state, action) => {
        const errorMsg = action.payload
        if (typeof errorMsg === 'string') {
          state.error = errorMsg
        }
        state.isLoading = false
        return state
      })
      //** Set Profile Reducer */
      .addCase(setProfileThunk.pending, (state) => {
        state.isLoading = true
      })
      .addCase(setProfileThunk.fulfilled, (state, action) => {
        state.user = action.payload
        state.isLoading = false
      })
      .addCase(setProfileThunk.rejected, (state, action) => {
        const errorMsg = action.payload
        if (typeof errorMsg === 'string') {
          state.error = errorMsg
        }
        state.isLoading = false
        return state
      })
      //** Update Profile Reducers */
      .addCase(updateProfileThunk.pending, (state) => {
        state.isLoading = true
      })
      .addCase(updateProfileThunk.fulfilled, (state, action) => {
        state.user = action.payload
        state.isLoading = false
      })
      .addCase(updateProfileThunk.rejected, (state, action) => {
        const errorMsg = action.payload
        if (typeof errorMsg === 'string') {
          state.error = errorMsg
        }
        state.isLoading = false
        return state
      })
      //** User Count Reducers */
      .addCase(fetchUsersCountThunk.pending, (state) => {
        state.isLoading = true
      })
      .addCase(fetchUsersCountThunk.fulfilled, (state, action) => {
        state.usersCount = action.payload
        state.isLoading = false
      })
      .addCase(fetchUsersCountThunk.rejected, (state, action) => {
        const errorMsg = action.payload
        if (typeof errorMsg === 'string') {
          state.error = errorMsg
        }
        state.isLoading = false
      })
      //** Change User Role Reducers */
      .addCase(grantUserRoleThunk.pending, (state) => {
        state.isLoading = true
      })
      .addCase(grantUserRoleThunk.fulfilled, (state, action) => {
        const userId = action.payload
        state.users = state.users.map((user) => {
          if (user._id === userId) {
            return {
              ...user,
              role: user.role === 'ADMIN' ? 'USER' : 'ADMIN'
            }
          }
          return user
        })

        state.isLoading = false
      })
      .addCase(grantUserRoleThunk.rejected, (state, action) => {
        const errorMsg = action.payload
        if (typeof errorMsg === 'string') {
          state.error = errorMsg
        }
        state.isLoading = false
      })
  }
})

export const userActions = userSlice.actions
export default userSlice.reducer
