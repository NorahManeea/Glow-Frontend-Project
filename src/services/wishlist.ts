import api from '../api/index'

export default {
  //** Service:- Fetch All Wishlist Items Service */
  fetchAllWishlistItemsApi: async () => {
    const res = await api.get('/api/wishlist')  
    return res
  },

  //** Service:- Add to Cart Api */
  addToWishlistApi: async (productId: string) => {
    const res = await api.post('/api/wishlist', { productId })
    return res
  }
}
