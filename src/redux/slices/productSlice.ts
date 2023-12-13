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
export const fetchSingleProductThunk = createAsyncThunk(
  'products/fetchSingleProduct',
  async (productId: string | undefined, { rejectWithValue }) => {
    try {
      const res = await api.get(`/api/products/${productId}`);
      console.log("🚀 ~ file: productSlice.ts:54 ~ res:", res);
      return res.data.payload;
    } catch (error) {
      if (error instanceof AxiosError) {
        return rejectWithValue(error.response?.data);
      }
    }
  }
);
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

export const productSlice = createSlice({
  name: 'product',
  initialState,
  //! @TODO:- Reducers Need fix after completing extra reducers
  reducers: {
    findProductById: (state, action) => {
      const id = action.payload
      const foundProduct = state.items.find((item) => item._id === id)
      if (foundProduct) {
        state.singleProduct = foundProduct
      }
    },
    productsRequest: (state) => {
      state.isLoading = true
    },
    productsSuccess: (state, action) => {
      state.isLoading = false
      state.items = action.payload.payload
    },
    addProduct: (state, action: { payload: { product: Product } }) => {
      state.items = [action.payload.product, ...state.items]
    },
    removeProduct: (state, action: { payload: { productId: string } }) => {
      const filteredItems = state.items.filter(
        (product) => product._id !== action.payload.productId
      )
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
    },
    addToCart: (state, action) => {
      // const product = action.payload;
      // const existingProductIndex = state.cartItems.findIndex(item => item.id === product.id);
      // if (existingProductIndex !== -1) {
      //   const updatedCartItems = [...state.cartItems];
      //   updatedCartItems[existingProductIndex].quantity++;
      //   state.cartItems = updatedCartItems;
      // } else {
      //   state.cartItems.push({ ...product, quantity: 1 });
      // }
      // state.cartLength = state.cartItems.reduce((total, item) => total + item.quantity, 0);
    },
    removeFromCart: (state, action: { payload: { productId: string } }) => {
      const filteredItems = state.cartItems.filter(
        (product) => product._id !== action.payload.productId
      )
      state.cartItems = filteredItems
      state.cartLength = state.cartItems.length
    },
    editProduct: (state, action: { payload: { editedProduct: Product } }) => {
      const editedProduct = action.payload.editedProduct

      state.items = state.items.map((product) =>
        product._id === editedProduct._id ? editedProduct : product
      )
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
    builder
      .addCase(fetchSingleProductThunk.pending, (state) => {
        state.isLoading = true
      })
      .addCase(fetchSingleProductThunk.fulfilled, (state, action) => {
        state.singleProduct = action.payload.payload
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
  removeFromCart
} = productSlice.actions

export default productSlice.reducer
