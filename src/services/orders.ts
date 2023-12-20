import api from '../api/index'
import {  Order } from '../types/types'

export default {
  //** Fetch All Orders Service */
  fetchAllOrdersApi: async () => {
    const res = await api.get('/api/orders')
    return res
  },
  //** Create Orders Service */
  createOrderApi: async (orderData: Partial<Order>) => {
    const res = await api.post('/api/orders/checkout', orderData)
    return res
  },
  //** Update Order Status Service */
  updateOrderApi: async ({ orderId, orderStatus }: { orderId: string; orderStatus: string }) => {
    const res = await api.put(`/api/orders/${orderId}/status`, { orderStatus })
    return res
  },
  //** Delete Order Service */
  deleteOrderApi: async (orderId: string) => {
    const res = await api.delete(`/api/orders/${orderId}`)
    return res
  },
  //** Fetch Single Order Service */
  fetchSingleOrderApi: async (orderId: string) => {
    const res = await api.get(`/api/orders/${orderId}`)
    return res
  },
  //** Fetch Orders History Service */
  fetchOrdersHistoryApi: async () => {
    const res = await api.get('/api/orders/history')
    return res
  },
  //** Fetch Orders Count Service */
  fetchOrdersCountApi: async () => {
    const res = await api.get('/api/orders/count')
    return res
  }
}
