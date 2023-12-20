import api from '../api/index'
import { DiscountCode } from '../types/types'

export default {
  //** Fetch All Discount Code Service */
  fetchAllDiscountCodesApi: async () => {
    const res = await api.get('/api/discount-code')
    return res
  },
  //** Create Discount Code Service */
  createDiscountCodeApi: async (discountCodeData: Omit<DiscountCode, '_id'>) => {
    const res = await api.post('/api/discount-code', discountCodeData)
    return res
  },
  //** Delete Discount Code Service */
  deleteDiscountCodeApi: async (discountCodeId: string) => {
    const res = await api.delete(`/api/discount-code/${discountCodeId}`)
    return res
  },
  //** Update Discount Code Service */
  updateDiscountCodeApi: async (updatedCode: DiscountCode) => {
    const res = await api.put(`/api/discount-code/${updatedCode._id}`, updatedCode)
    return res
  }
}
