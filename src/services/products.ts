import api from '../api/index'

export default {
  //** Service:- Fetch Products Service */
  fetchProductsApi: async (params: string) => {
    const res = await api.get(`/api/products?${params}`)
    return res
  },
  //** Service:- Fetch All Products Service */
  fetchAllProductsApi: async () => {
    const res = await api.get(`/api/products`)
    return res
  },
  //** Service:- Fetch single Product Service */
  fetchSingleProductApi: async (productId: string) => {
    const res = await api.get(`/api/products/${productId}`)
    return res
  },
  //** Service:- Fetch Products count Service */
  fetchProductCountApi: async () => {
    const res = await api.get('/api/products/count')
    return res
  },
  //** Service:- Fetch Highest Sold Products Service */
  fetchHighestSoldProductsApi: async () => {
    const res = await api.get('/api/products/highest-sold')
    return res
  },
  //** Service:- Create Product Service */
  createProductApi: async (productData: FormData) => {
    const res = await api.post('/api/products', productData)
    return res
  },
  //** Service:- Update Product Service */
  updateProductApi: async (productId: string, updatedProduct: FormData) => {
    const res = await api.put(`/api/products/${productId}`, updatedProduct)
    return res
  },
  //** Service:- Delete Product Service */
  deleteProductApi: async (productId: string) => {
    const res = await api.delete(`/api/products/${productId}`)
    return res
  },
  //** Service:- Add Review Service */
  addReiewToProductApi: async (productId: string, reviewText: string) => {
    const res = await api.post('/reviews', { productId, reviewText })
    return res
  }
}
