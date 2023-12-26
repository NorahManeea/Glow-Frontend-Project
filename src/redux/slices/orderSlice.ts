import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { Order, OrderState } from '../../types/types'
import { AxiosError } from 'axios'
import OrderService from '../../services/orders'


export enum OrderStatus {
  PENDING = 'Pending',
  PROCESSING = 'Processing',
  SHIPPED = 'Shipped',
  DELIVERED = 'Delivered',
  RETURNED = 'Returned',
  CANCELED = 'Canceled'
}

const initialState: OrderState = {
  orders: [],
  singleOrder: {} as Order,
  error: null,
  isLoading: false,
  orderCount: 0,
  orderHistory: []
}

//** Fetch All Orders */
export const fetchOrdersThunk = createAsyncThunk(
  'orders/fetchOrders',
  async (_, { rejectWithValue }) => {
    try {
      const res = await OrderService.fetchAllOrdersApi()
      return res.data.payload
    } catch (error) {
      if (error instanceof AxiosError) {
        return rejectWithValue(error.response?.data)
      }
    }
  }
)

//** Delete Order */
export const deleteOrderThunk = createAsyncThunk(
  'orders/deleteOrder',
  async (orderId: string, { rejectWithValue }) => {
    try {
      await OrderService.deleteOrderApi(orderId)
      return orderId
    } catch (error) {
      if (error instanceof AxiosError) {
        return rejectWithValue(error.response?.data)
      }
    }
  }
)

//** Fetch Sign Order Thunk */
export const fetchSingleOrderThunk = createAsyncThunk(
  'orders/fetchSingleOrder',
  async (orderId: string, { rejectWithValue }) => {
    try {
      const res = await OrderService.fetchSingleOrderApi(orderId)
      return res.data.payload
    } catch (error) {
      if (error instanceof AxiosError) {
        return rejectWithValue(error.response?.data)
      }
    }
  }
)

//** Create Order Thunk */
export const createOrderThunk = createAsyncThunk(
  'orders/createOrder',
  async (orderData: Partial<Order>, { rejectWithValue }) => {
    try {
      const res = await OrderService.createOrderApi(orderData)
      return res.data.payload
    } catch (error) {
      if (error instanceof AxiosError) {
        return rejectWithValue(error.response?.data)
      }
      throw error
    }
  }
)

//** Order History Thunk */
export const fetchOrderHistoryThunk = createAsyncThunk(
  'orderHistory/fetchOrderHistory',
  async (_, { rejectWithValue }) => {
    try {
      const res = await OrderService.fetchOrdersHistoryApi()
      return res.data
    } catch (error) {
      if (error instanceof AxiosError) {
        return rejectWithValue(error.response?.data)
      }
    }
  }
)

//** Update Order Status Thunk */
export const updateOrderStatusThunk = createAsyncThunk(
  'order/updateOrderStatus',
  async ({ orderId, orderStatus }: { orderId: string; orderStatus: string }, { rejectWithValue }) => {
    try {
      const res = await OrderService.updateOrderApi({orderId,orderStatus})
      return res.data
    } catch (error) {
      if (error instanceof AxiosError) {
        return rejectWithValue(error.response?.data)
      }
      throw error
    }
  }
)

//** Orders Count Thunk */
export const fetchOrdersCountThunk = createAsyncThunk(
  'users/fetchUsersCount',
  async (_, { rejectWithValue }) => {
    try {
      const res = await OrderService.fetchOrdersCountApi()
      return res.data.payload
    } catch (error) {
      if (error instanceof AxiosError) {
        return rejectWithValue(error.response?.data)
      }
    }
  }
)

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
  },
  extraReducers(builder) {
    //** Fetch All Orders Reducers */
    builder
      .addCase(fetchOrdersThunk.pending, (state) => {
        state.isLoading = true
      })
      .addCase(fetchOrdersThunk.fulfilled, (state, action) => {
        state.orders = action.payload
        state.isLoading = false
      })
      .addCase(fetchOrdersThunk.rejected, (state, action) => {
        const errorMsg = action.payload
        if (typeof errorMsg === 'string') {
          state.error = errorMsg
        }
        state.isLoading = false
        return state
      })

      //** Fetch Single Order Reducers */
      .addCase(fetchSingleOrderThunk.pending, (state) => {
        state.isLoading = true
      })
      .addCase(fetchSingleOrderThunk.fulfilled, (state, action) => {
        state.singleOrder = action.payload
        state.isLoading = false
      })
      .addCase(fetchSingleOrderThunk.rejected, (state, action) => {
        const errorMsg = action.payload
        if (typeof errorMsg === 'string') {
          state.error = errorMsg
        }
        state.isLoading = false
        return state
      })

      //** Delete Order Reducers */
      .addCase(deleteOrderThunk.pending, (state) => {
        state.isLoading = true
      })
      .addCase(deleteOrderThunk.fulfilled, (state, action) => {
        const orderId = action.payload
        const updatedOrder = state.orders.filter((order) => order._id !== orderId)        
        state.orders = updatedOrder
        state.isLoading = false
      })
      .addCase(deleteOrderThunk.rejected, (state, action) => {
        const errorMsg = action.payload
        if (typeof errorMsg === 'string') {
          state.error = errorMsg
        }
        state.isLoading = false
        return state
      })

      //** Create Order Reducer */
      .addCase(createOrderThunk.pending, (state) => {
        state.isLoading = true
      })
      .addCase(createOrderThunk.fulfilled, (state, action) => {
        const newOrder = action.payload
        state.orders = [newOrder, ...state.orders]
        state.isLoading = false
        state.error = null
      })
      .addCase(createOrderThunk.rejected, (state, action) => {
        const errorMsg = action.payload
        if (typeof errorMsg === 'string') {
          state.error = errorMsg
        }
        state.isLoading = false
      })

      //** Order History Reducers */
      .addCase(fetchOrderHistoryThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      });
      builder.addCase(fetchOrderHistoryThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orderHistory = action.payload.payload;
      })
      .addCase(fetchOrderHistoryThunk.rejected, (state, action) => {
        const errorMsg = action.payload
        if (typeof errorMsg === 'string') {
          state.error = errorMsg
        }
        state.isLoading = false
      })

      //** Update Order Status Reducers */
      .addCase(updateOrderStatusThunk.pending, (state) => {
        state.isLoading = true
      })
      .addCase(updateOrderStatusThunk.fulfilled, (state, action) => {
        const {id, orderStatus} = action.payload        
        const foundOrder = state.orders.find((order) => order._id === id)
        if (foundOrder) {
          foundOrder.orderStatus = orderStatus
        }
      })
      .addCase(updateOrderStatusThunk.rejected, (state, action) => {
        const errorMsg = action.payload
        if (typeof errorMsg === 'string') {
          state.error = errorMsg
        }
        state.isLoading = false
      })

      //** Order Count Reducers */
      .addCase(fetchOrdersCountThunk.pending, (state) => {
        state.isLoading = true
      })
      .addCase(fetchOrdersCountThunk.fulfilled, (state, action) => {
        state.orderCount = action.payload
        state.isLoading = false
      })
      .addCase(fetchOrdersCountThunk.rejected, (state, action) => {
        const errorMsg = action.payload
        if (typeof errorMsg === 'string') {
          state.error = errorMsg
        }
        state.isLoading = false
      })
  }
})
export default orderSlice.reducer
