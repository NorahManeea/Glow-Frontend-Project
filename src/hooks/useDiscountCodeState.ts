import { useSelector } from 'react-redux'
import { RootState } from '../redux/store'

function useDiscountCodeSate() {
    const state = useSelector((state: RootState) => state)
    const discountCodes = state.discountCode.discountCodes
    const isLoading = state.discountCode.isLoading
    const error = state.discountCode.error

    
  return {
    discountCodes,
    isLoading,
    error
  }
}

export default useDiscountCodeSate
