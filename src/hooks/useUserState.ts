import React from 'react'

import { useSelector } from 'react-redux'
import { RootState } from '../redux/store'

function useUserState() {
  const state = useSelector((state: RootState) => state)
  const users = state.users.users
  const error = state.users.error
  const isLoading = state.users.isLoading
  const userData = state.users.userData
  const isLoggedIn = state.users.isLoggedIn

  return {
    users,
    isLoading,
    isLoggedIn,
    error,
    userData
  }
}

export default useUserState
