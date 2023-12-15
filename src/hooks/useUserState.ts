import { useSelector } from 'react-redux'
import { RootState } from '../redux/store'
import { ROLES } from '../types/types'

function useUserState() {
  const state = useSelector((state: RootState) => state)
  const users = state.users.users
  const error = state.users.error
  const isLoading = state.users.isLoading
  const user = state.users.user
  const isLoggedIn = state.users.isLoggedIn
  const usersCount = state.users.usersCount

  const isAdmin = () => {
return user && user.role === ROLES.ADMIN
  };
  
  return {
    users,
    isLoading,
    isLoggedIn,
    error,
    user,
    usersCount,
    isAdmin
  }
}

export default useUserState
