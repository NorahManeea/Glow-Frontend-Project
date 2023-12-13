import { useSelector } from 'react-redux'
import { RootState } from '../redux/store'

function useUserState() {
  const state = useSelector((state: RootState) => state)
  const users = state.users.users
  const error = state.users.error
  const isLoading = state.users.isLoading
  const user = state.users.user
  const isLoggedIn = state.users.isLoggedIn

  const isAdmin = () => {
    return user && user.role === 'ADMIN';
  };
  
  return {
    users,
    isLoading,
    isLoggedIn,
    error,
    user,
    isAdmin
  }
}

export default useUserState
