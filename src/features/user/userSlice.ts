import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import jwt_decode from 'jwt-decode'
import { getDecodedTokenFromStorage } from '../../utils/token'

enum Role {
  ADMIN = 'ADMIN',
  USER = 'USER'
}

export interface UserState {
  user: User
}
export type DecodedUser = {
  user_id: string
  username: string
  role: Role
}

export type User = {
  id: string
  username: string
  role: Role
}

const initialState: UserState = {
  user: { id: '', username: '', role: Role.USER }
}

export const signUpThunk = createAsyncThunk(
  'user/signup',
  async (user: { username: string; password: string }) => {
    console.log(user)
    const res = await axios.post('http://localhost:8080/api/v1/signup', user)

    console.log('res', res)
    return res.data
  }
)
export const signInThunk = createAsyncThunk(
  'user/signin',
  async (user: { username: string; password: string }) => {
    console.log(user)
    const res = await axios.post('http://localhost:8080/api/v1/signin', user)

    console.log('token', res.data.token)
    return {
      token: res.data.token
    }
  }
)

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loadUserFromStorage: (state) => {
      const user = getDecodedTokenFromStorage()
      if (user) {
        state.user = user
      }
    }
  },
  extraReducers: (builder) => {
    builder.addCase(signUpThunk.fulfilled, (state, action) => {
      console.log(action)
      state.user = action.payload
    })

    builder.addCase(signInThunk.fulfilled, (state, action) => {
      const token = action.payload.token
      const decodedUser = jwt_decode(token) as DecodedUser
      localStorage.setItem('token', token)

      const user: User = {
        username: decodedUser.username,
        id: decodedUser.user_id,
        role: decodedUser.role
      }
      state.user = user
    })
  }
})
export const { loadUserFromStorage } = userSlice.actions

export default userSlice.reducer
