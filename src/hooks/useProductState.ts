import { useSelector } from 'react-redux'
import { RootState } from '../redux/store'

export default function useProductState() {
  const state = useSelector((state: RootState) => state)
  const products = state.products.items
  const error = state.products.error
  const searchText = state.products.searchText
  const product = state.products.singleProduct
  const isLoading = state.products.isLoading
  const totalPages = state.products.totalPages
  const productCount = state.products.productCount

  return {
    products,
    error,
    searchText,
    product,
    isLoading,
    totalPages,
    productCount
  }
}
