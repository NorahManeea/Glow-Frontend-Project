import api from '../api/index'

export default {
  //** Fetch All Cart Items Service */
  fetchAllCartItemsApi: async () => {
    const res = await api.get('/api/cart')
    return res
  },

  //** Add to Cart Api */
  addToCartApi: async ({ productId, quantity }: { productId: string; quantity: number }) => {
    const res = await api.post('/api/cart', { productId, quantity })
    return res
  }
}
