import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { Product, ProductState } from '../../types/types'
import api from '../../api'
import { AxiosError } from 'axios'

const initialState: ProductState = {
  items: [],
  error: null,
  isLoading: false,
  searchText: '',
  singleProduct: {} as Product,
  cartItems: [],
  cartLength: 0,
  productCount: 0
}

//** Fetch All Products Thunk */
export const fetchProductsThunk = createAsyncThunk(
  'products/fetchProducts',
  async (
    {
      category,
      sortBy,
      currentPage,
      searchText
    }: { category: string; sortBy: string; currentPage: number; searchText: string },
    { rejectWithValue }
  ) => {
    try {
      //** Search Params */
      const params = new URLSearchParams()

      category && params.append('category', category)
      sortBy && params.append('sortBy', sortBy)
      currentPage && params.append('pageNumber', currentPage.toString())
      searchText && params.append('searchText', searchText.toString())

      const res = await api.get(`/api/products?${params.toString()}`)
      return res.data
    } catch (error) {
      if (error instanceof AxiosError) {
        return rejectWithValue(error.response?.data)
      }
    }
  }
)
//** Fetch Sign Product Thunk */
export const fetchSingleProductThunk = createAsyncThunk(
  'products/fetchSingleProduct',
  async (productId: string, { rejectWithValue }) => {
    try {
      const res = await api.get(`/api/products/${productId}`)
      return res.data.payload
    } catch (error) {
      if (error instanceof AxiosError) {
        return rejectWithValue(error.response?.data)
      }
    }
  }
)
//** Products Count Thunk */
export const fetchProductsCountThunk = createAsyncThunk(
  'products/fetchProductsCount',
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get('/api/products/count')
      return res.data.payload
    } catch (error) {
      if (error instanceof AxiosError) {
        return rejectWithValue(error.response?.data)
      }
    }
  }
)
//** Fetch Best Seller Products */
export const fetchHighestSoldProductsThunk = createAsyncThunk(
  'products/fetchHighestSoldProducts',
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get('/api/products/highest-sold')
      return res.data.payload
    } catch (error) {
      if (error instanceof AxiosError) {
        return rejectWithValue(error.response?.data)
      }
    }
  }
)

//** Create New Product Thunk */
export const createProductThunk = createAsyncThunk(
  'products/createProduct',
  async (productData: FormData, { rejectWithValue }) => {
    try {
      const response = await api.post('/api/products', productData)
      return response.data.payload
    } catch (error) {
      if (error instanceof AxiosError) {
        return rejectWithValue(error.response?.data)
      }
    }
  }
)

//** Update Product Thunk */
export const updateProductThunk = createAsyncThunk(
  'products/updateProduct',
  async (
    { productId, updatedProduct }: { productId: string; updatedProduct: FormData },
    { rejectWithValue }
  ) => {
    try {
      const response = await api.put(`/api/products/${productId}`, updatedProduct)
      return response.data.payload
    } catch (error) {
      if (error instanceof AxiosError) {
        return rejectWithValue(error.response?.data)
      }
    }
  }
)

export const productSlice = createSlice({
  name: 'product',
  initialState,
  //! @TODO:- I'll fix redcers after completing extra reducers
  reducers: {
    // addToCart: (state, action) => {
    //   // const product = action.payload;
    //   // const existingProductIndex = state.cartItems.findIndex(item => item.id === product.id);
    //   // if (existingProductIndex !== -1) {
    //   //   const updatedCartItems = [...state.cartItems];
    //   //   updatedCartItems[existingProductIndex].quantity++;
    //   //   state.cartItems = updatedCartItems;
    //   // } else {
    //   //   state.cartItems.push({ ...product, quantity: 1 });
    //   // }
    //   // state.cartLength = state.cartItems.reduce((total, item) => total + item.quantity, 0);
    // },
    removeFromCart: (state, action: { payload: { productId: string } }) => {
      const filteredItems = state.cartItems.filter(
        (product) => product._id !== action.payload.productId
      )
      state.cartItems = filteredItems
      state.cartLength = state.cartItems.length
    }
  },
  extraReducers: (builder) => {
    //** Fetch All Products Reducers */
    builder
      .addCase(fetchProductsThunk.pending, (state) => {
        state.isLoading = true
      })
      .addCase(fetchProductsThunk.fulfilled, (state, action) => {
        state.items = action.payload.payload
        state.isLoading = false
      })
      .addCase(fetchProductsThunk.rejected, (state, action) => {
        const errorMsg = action.payload
        if (typeof errorMsg === 'string') {
          state.error = errorMsg
        }
        state.isLoading = false
        return state
      })

      //** Fetch Single Product Reducers */
      .addCase(fetchSingleProductThunk.pending, (state) => {
        state.isLoading = true
      })
      .addCase(fetchSingleProductThunk.fulfilled, (state, action) => {
        state.singleProduct = action.payload
        state.isLoading = false
      })
      .addCase(fetchSingleProductThunk.rejected, (state, action) => {
        const errorMsg = action.payload
        if (typeof errorMsg === 'string') {
          state.error = errorMsg
        }
        state.isLoading = false
        return state
      })

      //** Product Count Reducers */
      .addCase(fetchProductsCountThunk.pending, (state) => {
        state.isLoading = true
      })
      .addCase(fetchProductsCountThunk.fulfilled, (state, action: PayloadAction<number>) => {
        state.productCount = action.payload
        state.isLoading = false
      })
      .addCase(fetchProductsCountThunk.rejected, (state, action) => {
        const errorMsg = action.payload
        if (typeof errorMsg === 'string') {
          state.error = errorMsg
        }
        state.isLoading = false
      })

      //** Fetch Highest Sold Products Reducers */
      .addCase(fetchHighestSoldProductsThunk.pending, (state) => {
        state.isLoading = true
      })
      .addCase(fetchHighestSoldProductsThunk.fulfilled, (state, action) => {
        state.items = action.payload.highestSoldProducts
        state.isLoading = false
      })
      .addCase(fetchHighestSoldProductsThunk.rejected, (state, action) => {
        const errorMsg = action.payload
        if (typeof errorMsg === 'string') {
          state.error = errorMsg
        }
        state.isLoading = false
        return state
      })

      //** Create Product Reducers */
      .addCase(createProductThunk.pending, (state) => {
        state.isLoading = true
      })
      .addCase(createProductThunk.fulfilled, (state, action) => {
        state.items = [...state.items, action.payload]
        state.isLoading = false
      })
      .addCase(createProductThunk.rejected, (state, action) => {
        const errorMsg = action.payload
        if (typeof errorMsg === 'string') {
          state.error = errorMsg
        }
        state.isLoading = false
        return state
      })

      //** Update Product Reducers */
      .addCase(updateProductThunk.pending, (state) => {
        state.isLoading = true
      })
      .addCase(updateProductThunk.fulfilled, (state, action) => {
        const updatedProduct = action.payload
        state.items = state.items.map((product) =>
          product._id === updatedProduct._id ? updatedProduct : product
        )
        state.isLoading = false
      })
      .addCase(updateProductThunk.rejected, (state, action) => {
        const errorMsg = action.payload
        if (typeof errorMsg === 'string') {
          state.error = errorMsg
        }
        state.isLoading = false
      })
  }
})
export const { removeFromCart } = productSlice.actions

export default productSlice.reducer
