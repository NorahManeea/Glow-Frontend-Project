import { useSelector } from 'react-redux'
import { RootState } from '../redux/store'

function useCartState() {
    const state = useSelector((state: RootState) => state)
    const isLoading = state.cart.isLoading
    const error = state.cart.error
    const cartItems = state.cart.cartItems
    const cartLength = state.cart.cartLength
    const totalAfterDiscount = state.cart.totalAfterDiscount
    const savedAmount = state.cart.savedAmount
    const totalPrice = state.cart.totalPrice
    const shipping = state.cart.shipping
    const tax = state.cart.tax



  return {
    isLoading,
    error,
    cartItems,
    cartLength,
    shipping,
    tax,
    totalAfterDiscount,
    totalPrice,
    savedAmount
  }
}

export default useCartState
