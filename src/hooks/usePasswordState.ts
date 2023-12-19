import { useSelector } from 'react-redux'
import { RootState } from '../redux/store'

function usePasswordResetState() {
    const state = useSelector((state: RootState) => state)
    const isLoading = state.passwordReset.isLoading
    const error = state.passwordReset.error
    const success = state.passwordReset.success


  return {
    isLoading,
    error,
    success
  }
}

export default usePasswordResetState
