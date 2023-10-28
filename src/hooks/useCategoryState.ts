import { useSelector } from 'react-redux'
import { RootState } from '../redux/store'

function useCategoryState() {
    const state = useSelector((state: RootState) => state)
    const categories = state.category.category
    const isLoading = state.category.isLoading
    const error = state.category.error

  return {
    categories,
    isLoading,
    error
  }
}

export default useCategoryState
