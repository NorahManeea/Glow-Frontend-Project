import { useSelector } from 'react-redux'
import { RootState } from '../redux/store'

function useOrderState() {
    const state = useSelector((state: RootState) => state)
    const orders = state.orders.orders
    const isLoading = state.orders.isLoading
    const error = state.orders.error
  return {
    orders,
    isLoading,
    error
  }
}

export default useOrderState
