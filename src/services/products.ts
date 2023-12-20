import api from '../api/index'

export default {
  //** Fetch Products Service */
  fetchProductsApi: async (params: string) => {
    const res = await api.get(`/api/products?${params}`)
    return res
  },
  //** Fetch All Products Service */
  fetchAllProductsApi: async () => {
    const res = await api.get(`/api/products`)
    return res
  },
  //** Fetch single Product Service */
  fetchSingleProductApi: async (productId: string) => {
    const res = await api.get(`/api/products/${productId}`)
    return res
  },
  //** Fetch Products count Service */
  fetchProductCountApi: async () => {
    const res = await api.get('/api/products/count')
    return res
  },
  //** Fetch Highest Sold Products Service */
  fetchHighestSoldProductsApi: async () => {
    const res = await api.get('/api/products/highest-sold')
    return res
  },
  //** Create Product Service */
  createProductApi: async (productData: FormData) => {
    const res = await api.post('/api/products', productData)
    return res
  },
  //** Update Product Service */
  updateProductApi: async (productId: string, updatedProduct: FormData) => {
    const res = await api.put(`/api/products/${productId}`, updatedProduct)
    return res
  },
  //** Delete Product Service */
  deleteProductApi: async (productId: string) => {
    const res = await api.delete(`/api/products/${productId}`)
    return res
  }
}
