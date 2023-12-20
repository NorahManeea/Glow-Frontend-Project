import api from '../api/index'
import { Category } from '../types/types'

export default {
  //** Fetch All Categories Service */
  fetchAllCategoriesApi: async () => {
    const res = await api.get('/api/categories')
    return res
  },

  //** Create Category Service */
  createCategoryApi: async (category: Omit<Category, '_id'>) => {
    const res = await api.post(`/api/categories/`, category)
    return res
  },
  //** Update Category Service */
  updateCategoryApi: async (updatedCategory: Category) => {
    const res = await api.put(`/api/categories/${updatedCategory._id}`, updatedCategory)
    return res
  },
  //** Delete Category Service */
  deleteCategoryApi: async (categoryId: string) => {
    const res = await api.delete(`/api/categories/${categoryId}`)
    return res
  }
}
