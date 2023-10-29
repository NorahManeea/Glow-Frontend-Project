import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { Product, ProductState } from '../../../types/types'

const initialState: ProductState = {
  items: [],
  error: null,
  isLoading: false,
  searchText: '',
  singleProduct: {} as Product,
  cartItems: [],
  cartLength: 0,
  currentPage: 1
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    findProductById: (state, action) => {
      const id = action.payload
      const foundProduct = state.items.find((item) => item.id === id)
      if (foundProduct) {
        state.singleProduct = foundProduct
      }
    },
    productsRequest: (state) => {
      state.isLoading = true
    },
    productsSuccess: (state, action) => {
      state.isLoading = false
      state.items = action.payload
    },
    addProduct: (state, action: { payload: { product: Product } }) => {
      // let's append the new product to the beginning of the array
      state.items = [action.payload.product, ...state.items]
    },
    removeProduct: (state, action: { payload: { productId: number } }) => {
      const filteredItems = state.items.filter((product) => product.id !== action.payload.productId)
      state.items = filteredItems
    },
    searchProduct: (state, action: PayloadAction<string>) => {
      state.searchText = action.payload
    },
    sortProducts: (state, action: PayloadAction<string>) => {
      const sortCriteria = action.payload
      if (sortCriteria === 'name') {
        state.items.sort((a, b) => a.name.localeCompare(b.name))
      } else if (sortCriteria === 'highestPrice') {
        state.items.sort((a, b) => b.price - a.price)
      } else if (sortCriteria === 'lowestPrice') {
        state.items.sort((a, b) => a.price - b.price)
      }
      console.log(sortCriteria)
    },
    addToCart: (state, action) => {
      const product = action.payload
      state.cartItems.push(product)
      state.cartLength = state.cartItems.length
    },
    removeFromCart: (state, action: { payload: { productId: number } }) => {
      const filteredItems = state.cartItems.filter(
        (product) => product.id !== action.payload.productId
      )
      state.cartItems = filteredItems
      state.cartLength = state.cartItems.length
    },
    editProduct: (state, action: { payload: { editedProduct: Product } }) => {
      const editedProduct = action.payload.editedProduct

      state.items = state.items.map((product) =>
        product.id === editedProduct.id ? editedProduct : product
      )
    },
    setPage: (state, action) => {
      state.currentPage = action.payload
    },
   
  }
})
export const {
  removeProduct,
  addProduct,
  editProduct,
  productsRequest,
  productsSuccess,
  searchProduct,
  findProductById,
  sortProducts,
  addToCart,
  removeFromCart,
  setPage,
} = userSlice.actions

export default userSlice.reducer
