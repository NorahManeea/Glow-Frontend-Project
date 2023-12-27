import { useSelector } from 'react-redux'
import { RootState } from '../redux/store'

function useReviewState() {
    const state = useSelector((state: RootState) => state)
    const reviews = state.review.reviews
    const isLoading = state.review.isLoading
    const error = state.review.error

  return {
    reviews,
    isLoading,
    error
  }
}

export default useReviewState
