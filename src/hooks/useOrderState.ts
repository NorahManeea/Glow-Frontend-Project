import { useSelector } from 'react-redux'
import { RootState } from '../redux/store'

function useOrderState() {
    const state = useSelector((state: RootState) => state)
    const orders = state.orders.orders
    const isLoading = state.orders.isLoading
    const error = state.orders.error
    const orderCount = state.orders.orderCount
    const order = state.orders.singleOrder
    
  return {
    orders,
    isLoading,
    error,
    orderCount,
    order
  }
}

export default useOrderState
