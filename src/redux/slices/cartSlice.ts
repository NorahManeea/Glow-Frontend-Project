import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import api from '../../api'
import { AxiosError } from 'axios'
import { CartState, DiscountCode } from '../../types/types'
import CartService from '../../services/cart'

const initialState: CartState = {
  cartItems: [],
  totalPrice: 0,
  savedAmount: 0,
  tax: 0,
  shipping:24,
  totalAfterDiscount: 0,
  error: null,
  isLoading: false,
  cartLength: 0
}
//** Add To Cart Thunks */
export const addToCartThunk = createAsyncThunk(
  'cart/addToCart',
  async ({ productId, quantity }: { productId: string; quantity: number }, { rejectWithValue }) => {
    try {
      const res = await api.post('/api/cart', { productId, quantity })
      return res.data
    } catch (error) {
      if (error instanceof AxiosError) {
        return rejectWithValue(error.response?.data)
      }
    }
  }
)

//** Get Cart Items */
export const fetchCartItemsThunk = createAsyncThunk(
  'cart/getCartItems',
  async (_, { rejectWithValue }) => {
    try {
      const res = await CartService.fetchAllCartItemsApi()
      return res.data
    } catch (error) {
      if (error instanceof AxiosError) {
        return rejectWithValue(error.response?.data)
      }
    }
  }
)

//** Update Cart Quantity */
export const updateCartItemsThunk = createAsyncThunk(
  'cart/updateCartItems',
  async ({ _id, quantity }: { _id: string; quantity: number }, { rejectWithValue }) => {
    try {
      const res = await api.put('/api/cart', { _id, quantity })
      return res.data
    } catch (error) {
      if (error instanceof AxiosError) {
        return rejectWithValue(error.response?.data)
      }
    }
  }
)
//** Delete Item from Cart  */

export const removeFromCartThunk = createAsyncThunk(
  'cart/removeFromCart',
  async (id: string, { rejectWithValue }) => {
    try {
      const res = await CartService.removeFromCartApi(id)
      return res.data
    } catch (error) {
      if (error instanceof AxiosError) {
        return rejectWithValue(error.response?.data)
      }
    }
  }
)

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    calculateTotalPrice(state) {
        state.totalPrice = state.cartItems.reduce(
          (total, item) => total + item.product.price * item.quantity,
          0
        )
        state.tax = Number((state.totalPrice * 0.15).toFixed())
        state.totalAfterDiscount = state.totalPrice + Number(state.tax) + state.shipping
      },
      applyDiscount(state, action: { payload: { discount: DiscountCode } }) {
        const { discount } = action.payload;
      
        if (discount.expirationDate < new Date()) {
          state.error = 'Discount code is expired';
        } else {
          const discountAmount = (state.totalPrice * discount.discountPercentage) / 100;
          state.savedAmount = discountAmount;
          state.totalAfterDiscount = state.totalPrice - discountAmount;
        }
      },
    
    
    updateShipping(state, action: { payload: { shipping: number } }) {
      state.shipping = action.payload.shipping;
    },
    
  },
  extraReducers: (builder) => {
    //** Add To Cart Reducers */
    builder
      .addCase(addToCartThunk.pending, (state) => {
        state.isLoading = true
      })
      .addCase(addToCartThunk.fulfilled, (state, action) => {
        state.isLoading = false
        state.cartLength = action.payload.cartLength
      })
      .addCase(addToCartThunk.rejected, (state, action) => {
        const errorMsg = action.payload
        if (typeof errorMsg === 'string') {
          state.error = errorMsg
        }
        state.isLoading = false
        return state
      })

      //** Get Cart Items Reducers */
      .addCase(fetchCartItemsThunk.pending, (state) => {
        state.isLoading = true
      })
      .addCase(fetchCartItemsThunk.fulfilled, (state, action) => {
        state.isLoading = false
        state.cartItems = action.payload.cartItems.products
        state.cartLength = action.payload.itemsCount
      })
      .addCase(fetchCartItemsThunk.rejected, (state, action) => {
        const errorMsg = action.payload
        if (typeof errorMsg === 'string') {
          state.error = errorMsg
        }
        state.isLoading = false
      })
      //** Update Cart Items Reducers */
      .addCase(updateCartItemsThunk.pending, (state) => {
        state.isLoading = true
      })
      .addCase(updateCartItemsThunk.fulfilled, (state, action) => {
        const { id, quantity } = action.payload
        const cart = state.cartItems.find((item) => item._id === id)
        if (cart) {
          cart.quantity = quantity
        }
      })
      .addCase(updateCartItemsThunk.rejected, (state, action) => {
        const errorMsg = action.payload
        if (typeof errorMsg === 'string') {
          state.error = errorMsg
        }
        state.isLoading = false
      })

      //** Remove From Wishlist Reducers */
      .addCase(removeFromCartThunk.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(removeFromCartThunk.fulfilled, (state, action) => {
        const productId = action.payload
        const updateItems = state.cartItems.filter((item) => item._id !== productId)
        state.cartItems = updateItems
        state.isLoading = false
        return state

      })
      .addCase(removeFromCartThunk.rejected, (state, action) => {
        const errorMsg = action.payload
        if (typeof errorMsg === 'string') {
          state.error = errorMsg
        }
        state.isLoading = false
      })
  }
})
export const cartActions = cartSlice.actions

export default cartSlice.reducer
