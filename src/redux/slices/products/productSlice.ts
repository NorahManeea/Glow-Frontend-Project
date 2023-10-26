import { PayloadAction, createSlice } from '@reduxjs/toolkit'

export type Product = {
  id: number
  name: string
  image: string
  description: string
  categories: number[]
  variants: string[]
  sizes: string[],
  price: number
}

export type ProductState = {
  items: Product[]
  error: null | string
  isLoading: boolean,
  searchText: string,
  singleProduct: Product,
  cartItems: Product[]; 
  cartLength: number;
}

const initialState: ProductState = {
  items: [],
  error: null,
  isLoading: false,
  searchText: "",
  singleProduct: {} as Product,
  cartItems: [],
  cartLength: 0,
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    findProductById:(state,action)=>{
      const id = action.payload
      const foundProduct = state.items.find((item) => item.id === id)
      if(foundProduct){
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
    searchProduct: (state,action: PayloadAction<string>)=>{
      state.searchText = action.payload
    },
    sortProducts: (state, action: PayloadAction<string>) => {
      const sortCriteria = action.payload;
      if(sortCriteria === 'name'){
        state.items.sort((a,b)=> a.name.localeCompare(b.name))
      }else if(sortCriteria === 'price'){
        state.items.sort((a,b)=> b.price - a.price)
      }
      console.log(sortCriteria)
    },
    addToCart: (state, action) => {
      const product = action.payload;
      state.cartItems.push(product);
      state.cartLength = state.cartItems.length;
    },
    removeFromCart: (state,action : { payload: { productId: number } }) => {
      const filteredItems = state.cartItems.filter((product) => product.id !== action.payload.productId)
      state.cartItems = filteredItems
    }
  }
})
export const { removeProduct, addProduct, productsRequest, productsSuccess, searchProduct,findProductById, sortProducts, addToCart, removeFromCart } = userSlice.actions

export default userSlice.reducer
