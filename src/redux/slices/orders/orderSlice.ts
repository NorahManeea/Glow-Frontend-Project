import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Order, OrderState } from "../../../types/types";


const initialState: OrderState = {
    orders: [],
    error: null,
    isLoading: false,
  }
export const orderSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {
        orderRequest: (state) => {
            state.isLoading = true
          },
          orderSuccess: (state, action) => {
            state.isLoading = false
            state.orders = action.payload
          },
          addOrder: (state, action: { payload: { order: Order } }) => {
            state.orders = [action.payload.order, ...state.orders]
          },
          removeOrder: (state, action: { payload: { orderId: number } }) => {
            const filteredOrders = state.orders.filter((order) => order.id !== action.payload.orderId)
            state.orders = filteredOrders
          },
    }
})
export const orderActions = orderSlice.actions;
export default orderSlice.reducer;