import { useSelector } from 'react-redux'
import { RootState } from '../redux/store'

function useCartState() {
    const state = useSelector((state: RootState) => state)
    const isLoading = state.cart.isLoading
    const error = state.cart.error
    const cartItems = state.cart.cartItems
    const cartLength = state.cart.cartLength
    const totalItems = state.cart.totalItems
    const totalPrice = state.cart.totalPrice

  return {
    isLoading,
    error,
    cartItems,
    cartLength,
    totalItems,
    totalPrice
  }
}

export default useCartState
