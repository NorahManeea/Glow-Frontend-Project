import { AxiosRequestConfig } from 'axios';
import api from '../api/index'
import { Category } from '../types/types'

export default {
  //** Service:- Fetch All Categories Service */
  fetchAllCategoriesApi: async (signal: AbortSignal) => {
    const res = await api.get('/api/categories', { signal });
    return res;
  },
  
  //** Service:- Create Category Service */
  createCategoryApi: async (category: Omit<Category, '_id' | 'createdAt'>) => {
    const res = await api.post(`/api/categories/`, category)
    return res
  },
  //** Service:- Update Category Service */
  updateCategoryApi: async (updatedCategory: Category) => {
    const res = await api.put(`/api/categories/${updatedCategory._id}`, updatedCategory)
    return res
  },
  //** Service:- Delete Category Service */
  deleteCategoryApi: async (categoryId: string) => {
    const res = await api.delete(`/api/categories/${categoryId}`)
    return res
  }
}
