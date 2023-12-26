import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { Category, CategoryState } from '../../types/types'
import api from '../../api'
import { AxiosError } from 'axios'
import CategoryService from '../../services/categories'

const initialState: CategoryState = {
  category: [],
  error: null,
  isLoading: false
}

// ** Fetch All Categories */
export const fetchCategoriesThunk = createAsyncThunk(
  'categories/fetchCategories',
  async (_, { signal, rejectWithValue }) => {
    const controller = new AbortController();
    try {
      const res = await CategoryService.fetchAllCategoriesApi(controller.signal as AbortSignal);
      return res.data.payload;
    } catch (error) {
      if (error instanceof AxiosError) {
        return rejectWithValue(error.response?.data);
      }
      throw error;
    } finally {
      controller.abort();
    }
  }
);
//** Create Category */
export const createCategoryThunk = createAsyncThunk(
  'categories/createCategory',
  async (category: Omit<Category, '_id' | 'createdAt'>, { rejectWithValue }) => {
    try {
      const res = await CategoryService.createCategoryApi(category)
      return res.data.payload
    } catch (error) {
      if (error instanceof AxiosError) {
        return rejectWithValue(error.response?.data)
      }
    }
  }
)
//** Update Category */
export const updateCategoryThunk = createAsyncThunk(
  'categories/updateCategory',
  async (updatedCategory: Category, { rejectWithValue }) => {
    try {
      const res = await CategoryService.updateCategoryApi(updatedCategory)
      return res.data.payload
    } catch (error) {
      if (error instanceof AxiosError) {
        return rejectWithValue(error.response?.data)
      }
    }
  }
)
//** Delete Category */
export const deleteCategoryThunk = createAsyncThunk(
  'categories/deleteCategory',
  async (categoryId: string, { rejectWithValue }) => {
    try {
      await CategoryService.deleteCategoryApi(categoryId)
      return categoryId
    } catch (error) {
      if (error instanceof AxiosError) {
        return rejectWithValue(error.response?.data)
      }
    }
  }
)

export const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {},
  extraReducers(builder) {
    //** Fetch All Categories Reducers */
    builder
      .addCase(fetchCategoriesThunk.pending, (state) => {
        state.isLoading = true
      })
      .addCase(fetchCategoriesThunk.fulfilled, (state, action) => {
        state.category = action.payload
        state.isLoading = false
      })
      .addCase(fetchCategoriesThunk.rejected, (state, action) => {
        const errorMsg = action.payload
        if (typeof errorMsg === 'string') {
          state.error = errorMsg
        }
        state.isLoading = false
        return state
      })

      //** Create Category Reducers */
      .addCase(createCategoryThunk.pending, (state) => {
        state.isLoading = true
      })
      .addCase(createCategoryThunk.fulfilled, (state, action) => {
        state.category.push(action.payload)
        state.isLoading = false
      })
      .addCase(createCategoryThunk.rejected, (state, action) => {
        const errorMsg = action.payload
        if (typeof errorMsg === 'string') {
          state.error = errorMsg
        }
        state.isLoading = false
        return state
      })

      //** Delete Category Reducers */
      .addCase(deleteCategoryThunk.pending, (state) => {
        state.isLoading = true
      })
      .addCase(deleteCategoryThunk.fulfilled, (state, action) => {
        const categoryId = action.payload
        const updateCategory = state.category.filter((category) => category._id !== categoryId)
        state.category = updateCategory
        state.isLoading = false
      })
      .addCase(deleteCategoryThunk.rejected, (state, action) => {
        const errorMsg = action.payload
        if (typeof errorMsg === 'string') {
          state.error = errorMsg
        }
        state.isLoading = false
        return state
      })

      //** Update Category Reducers */
      .addCase(updateCategoryThunk.pending, (state) => {
        state.isLoading = true
      })
      .addCase(updateCategoryThunk.fulfilled, (state, action) => {
        state.category = state.category.filter((catecory) => catecory._id !== action.payload._id)
        state.category = [action.payload, ...state.category]
        state.isLoading = false
      })
      .addCase(updateCategoryThunk.rejected, (state, action) => {
        const errorMsg = action.payload
        if (typeof errorMsg === 'string') {
          state.error = errorMsg
        }
        state.isLoading = false
        return state
      })
  }
})
export default categorySlice.reducer
