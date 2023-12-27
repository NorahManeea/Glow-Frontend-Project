import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { Product, ProductState } from '../../types/types'
import { AxiosError } from 'axios'
import ProductService from '../../services/products'

const initialState: ProductState = {
  items: [],
  error: null,
  isLoading: false,
  searchText: '',
  singleProduct: {} as Product,
  cartItems: [],
  productCount: 0,
  totalPages: 0
}

//** Fetch All Products Thunk */
export const fetchProductsThunk = createAsyncThunk(
  'products/fetchProducts',
  async (
    {
      searchText = '',
      category = '',
      sortBy = '',
      currentPage
    }: {
      searchText?: string
      category?: string
      sortBy?: string
      currentPage: number
    },
    { rejectWithValue }
  ) => {
    try {
      const queryParams = new URLSearchParams()
      queryParams.append('pageNumber', String(currentPage))
      searchText && queryParams.append('searchText', searchText)
      category && queryParams.append('categories', category)
      sortBy && queryParams.append('sortBy', sortBy)

      const response = await ProductService.fetchProductsApi(queryParams.toString())

      return response.data
    } catch (error) {
      if (error instanceof AxiosError) {
        return rejectWithValue(error.response?.data.msg)
      }
    }
  }
)

//** Fetch All Products Without Pagination Thunk */
export const fetchAllProductsThunk = createAsyncThunk(
  'products/fetchAllProducts',
  async (_, { rejectWithValue }) => {
    try {
      const res = await ProductService.fetchAllProductsApi()
      return res.data
    } catch (error) {
      if (error instanceof AxiosError) {
        return rejectWithValue(error.response?.data)
      }
    }
  }
)
//** Add Review */
export const addReviewThunk = createAsyncThunk(
  'reviews/addReview',
  async (
    { productId, reviewText }: { productId: string; reviewText: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await ProductService.addReiewToProductApi(productId, reviewText)
      return response.data.payload
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
      const res = await ProductService.fetchSingleProductApi(productId)
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
      const res = await ProductService.fetchProductCountApi()
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
      const res = await ProductService.fetchHighestSoldProductsApi()
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
      const response = await ProductService.createProductApi(productData)
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
      const response = await ProductService.updateProductApi(productId, updatedProduct)
      return response.data.payload
    } catch (error) {
      if (error instanceof AxiosError) {
        return rejectWithValue(error.response?.data)
      }
    }
  }
)
//** Delete Product Thunk */
export const deleteProductThunk = createAsyncThunk(
  'products/deleteProduct',
  async (productId: string, { rejectWithValue }) => {
    try {
      await ProductService.deleteProductApi(productId)
      return productId
    } catch (error) {
      if (error instanceof AxiosError) {
        return rejectWithValue(error.response?.data)
      }
    }
  }
)

//** Back-In-Stock Notification Thunk */ 
export const notifyBackInStockThunk = createAsyncThunk(
  'products/notifyBackInStock',
  async (productId: string, { rejectWithValue }) => {
    try {
      const res = await ProductService.notifyBackInStockApi(productId);
      return res.data.payload;
    } catch (error) {
      if (error instanceof AxiosError) {
        return rejectWithValue(error.response?.data)
      }
    }
  }
);

export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    //** Fetch All Products Reducers */
    builder
      .addCase(fetchProductsThunk.pending, (state) => {
        state.isLoading = true
      })
      .addCase(fetchProductsThunk.fulfilled, (state, action) => {
        state.items = action.payload.payload
        state.totalPages = action.payload.totalPages
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
      //** Fetch All Products without Pagination */
      .addCase(fetchAllProductsThunk.pending, (state) => {
        state.isLoading = true
      })
      .addCase(fetchAllProductsThunk.fulfilled, (state, action) => {
        state.items = action.payload.payload
        state.isLoading = false
      })
      .addCase(fetchAllProductsThunk.rejected, (state, action) => {
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

      //** Delete Product Reducers */
      .addCase(deleteProductThunk.pending, (state) => {
        state.isLoading = true
      })
      .addCase(deleteProductThunk.fulfilled, (state, action) => {
        const productId = action.payload
        const updateProduct = state.items.filter((product) => product._id !== productId)
        state.items = updateProduct
        state.isLoading = false
      })
      .addCase(deleteProductThunk.rejected, (state, action) => {
        const errorMsg = action.payload
        if (typeof errorMsg === 'string') {
          state.error = errorMsg
        }
        state.isLoading = false
        return state
      })
      //** Add Review To Product */
      .addCase(addReviewThunk.pending, (state) => {
        state.isLoading = true
      })
      .addCase(addReviewThunk.fulfilled, (state, action) => {
        state.singleProduct.reviews.push(action.payload)
      })
      .addCase(addReviewThunk.rejected, (state, action) => {
        const errorMsg = action.payload
        if (typeof errorMsg === 'string') {
          state.error = errorMsg
        }
        state.isLoading = false
        return state
      })
      //** Back-In-Stock Notification Reducer */
      builder.addCase(notifyBackInStockThunk.pending, (state) => {
        state.isLoading = true;
      });
    
      builder.addCase(notifyBackInStockThunk.fulfilled, (state, action) => {
        state.isLoading = false;
      });
    
      builder.addCase(notifyBackInStockThunk.rejected, (state, action) => {
        const errorMsg = action.payload
        if (typeof errorMsg === 'string') {
          state.error = errorMsg
        }
        state.isLoading = false
        return state
      });
  }
})
export default productSlice.reducer
