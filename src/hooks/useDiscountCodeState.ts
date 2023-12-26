import { useSelector } from 'react-redux'
import { RootState } from '../redux/store'

function useDiscountCodeSate() {
    const state = useSelector((state: RootState) => state)
    const discountCodes = state.discountCode.discountCodes
    const code = state.discountCode.code
    const isLoading = state.discountCode.isLoading
    const error = state.discountCode.error

    
  return {
    discountCodes,
    code,
    isLoading,
    error
  }
}

export default useDiscountCodeSate
