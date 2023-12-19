import { useSelector } from 'react-redux'
import { RootState } from '../redux/store'
import { ROLES } from '../constant/constants'

function useUserState() {
  const state = useSelector((state: RootState) => state)
  const users = state.users.users
  const error = state.users.error
  const isLoading = state.users.isLoading
  const user = state.users.user
  const isLoggedIn = state.users.isLoggedIn
  const decodedUser = state.users.decodedUser
  const usersCount = state.users.usersCount

  const isAdmin = () => {
return decodedUser && decodedUser.role === ROLES.ADMIN
  };
  
  return {
    users,
    isLoading,
    isLoggedIn,
    error,
    user,
    usersCount,
    decodedUser,
    isAdmin
  }
}

export default useUserState
