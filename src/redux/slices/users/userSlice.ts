import { createSlice } from '@reduxjs/toolkit'
import { User, UserState } from '../../../types/types'

// Set data in localstorage
const data = localStorage.getItem("userInfo") !== null ? JSON.parse(String(localStorage.getItem("userInfo"))) : []

const initialState: UserState = {
  users: [],
  error: null,
  isLoading: false,
  isLoggedIn: data.isLoggedIn,
  userData: data.userData
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action) => {
      state.isLoggedIn = true
      state.userData = action.payload
      localStorage.setItem(
        'userInfo',
        JSON.stringify({
          isLoggedIn: state.isLoggedIn,
          userData: state.userData
        })
      )
    },
    logout: (state) => {
      state.isLoggedIn = false
      state.userData = null
      localStorage.removeItem(
        'userInfo')
    },
    userRequest: (state) => {
      state.isLoading = true
    },
    userSuccess: (state, action) => {
      state.isLoading = false
      state.users = action.payload
    },
    addUser: (state, action) => {
      state.users = [action.payload.user, ...state.users]
      state.isLoggedIn = true
      localStorage.setItem(
        'userInfo',
        JSON.stringify({
          isLoggedIn: state.isLoggedIn,
          userData: state.userData
        })
      )
    },
    removeUser: (state, action: { payload: { userId: number } }) => {
      const filteredUsers = state.users.filter((user) => user.id !== action.payload.userId)
      state.users = filteredUsers
    },
    editProfile: (state, action) => {
      const {id, firstName, lastName} = action.payload;
      const foundUser = state.users.find((user) => user.id === id);
      if(foundUser){
        foundUser.firstName = firstName;
        foundUser.lastName = lastName;
        state.userData = foundUser
        localStorage.setItem(
          'userInfo',
          JSON.stringify({
            isLoggedIn: state.isLoggedIn,
            userData: state.userData
          })
        )
      }
   },
   setProfile(state, action) {
    state.userData = action.payload;
  },
  banUser:(state,action:  { payload: { userId: number } }) => {
    const foundUser = state.users.find((user) => user.id === action.payload.userId);
    if(foundUser){
      foundUser.ban = !foundUser.ban
    }

  }
  }
})

export const userActions = userSlice.actions
export default userSlice.reducer
