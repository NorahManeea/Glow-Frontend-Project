import { useSelector } from 'react-redux'
import { RootState } from '../redux/store'

export default function useProductState() {
  const state = useSelector((state: RootState) => state)
  const products = state.products.items
  const searchText = state.products.searchText
  const product = state.products.singleProduct
  const isLoading = state.products.isLoading
  const cartLength = state.products.cartLength
  const cartItems = state.products.cartItems

  const total = state.products.cartItems.reduce((i, product) => {
    return i + product.price
  }, 0)

  return {
    products,
    searchText,
    product,
    isLoading,
    cartLength,
    cartItems,
    total,
  }
}
