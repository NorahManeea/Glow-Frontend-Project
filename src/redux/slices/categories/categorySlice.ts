import { createSlice } from "@reduxjs/toolkit"


export type Category = {
    id: number
    name: string
  }
  export type CategoryState = {
    category: Category[]
    error: null | string
    isLoading: boolean,
  }
  
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
          categorySuccess: (state, action) => {
            state.isLoading = false
            state.category = action.payload
          },
          addCategory: (state, action: { payload: { category: Category } }) => {
            state.category = [action.payload.category, ...state.category]
          },
          removeCategory: (state, action: { payload: { categoryId: number } }) => {
            const filteredItems = state.category.filter((category) => category.id !== action.payload.categoryId)
            state.category = filteredItems
          },
    }
})
export const categoryActions = categorySlice.actions;
export default categorySlice.reducer;