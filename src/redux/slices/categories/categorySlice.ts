import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { Category, CategoryState } from '../../../types/types'

const initialState: CategoryState = {
  category: [],
  error: null,
  isLoading: false,
}

export const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
    categoryRequest: (state) => {
      state.isLoading = true
    },
    getError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
    categorySuccess: (state, action) => {
      state.isLoading = false
      state.category = action.payload
    },
    addCategory: (state, action) => {
      state.category = [action.payload.category, ...state.category]
    },
    removeCategory: (state, action: { payload: { categoryId: number } }) => {
      const filteredItems = state.category.filter(
        (category) => category.id !== action.payload.categoryId
      )
      state.category = filteredItems
    },
    editCategory: (state, action: { payload: { editCategory: Category } }) => {
      const filteredItems = state.category.filter(
        (product) => product.id !== action.payload.editCategory.id
      )
      state.category = filteredItems
      state.category = [action.payload.editCategory, ...state.category]
    }
  }
})
export const categoryActions = categorySlice.actions
export default categorySlice.reducer
