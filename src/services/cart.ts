import api from '../api/index'


export default {
  //** Service:- Fetch All Cart Items Service */
  fetchAllCartItemsApi: async () => {
    const res = await api.get('/api/cart')
    return res
  },

  //** Service:- Add to Cart Api */
  addToCartApi: async ({ productId, quantity }: { productId: string; quantity: number }) => {
    const res = await api.post('/api/cart', { productId, quantity })
    return res
  },

  //** Service:- Remove from Cart Api */
  removeFromCartApi: async (productId: string) => {
    const res = await api.put(`/api/cart/${productId}`)
    return res
  }
}
