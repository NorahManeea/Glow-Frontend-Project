import api from '../api/index'
import {  Order } from '../types/types'

export default {
  //** Service:- Fetch All Orders Service */
  fetchAllOrdersApi: async () => {
    const res = await api.get('/api/orders')
    return res
  },
  //** Service:- Create Orders Service */
  createOrderApi: async (orderData: Partial<Order>) => {
    const res = await api.post('/api/orders/checkout', orderData)
    return res
  },
  //** Service:- Update Order Status Service */
  updateOrderApi: async ({ orderId, orderStatus }: { orderId: string; orderStatus: string }) => {
    const res = await api.put(`/api/orders/${orderId}/status`, { orderStatus })
    return res
  },
  //** Service:- Delete Order Service */
  deleteOrderApi: async (orderId: string) => {
    const res = await api.delete(`/api/orders/${orderId}`)
    return res
  },
  //** Service:- Fetch Single Order Service */
  fetchSingleOrderApi: async (orderId: string) => {
    const res = await api.get(`/api/orders/${orderId}`)
    return res
  },
  //** Service:- Fetch Orders History Service */
  fetchOrdersHistoryApi: async () => {
    const res = await api.get('/api/orders/history')
    return res
  },
  //** Service:- Fetch Orders Count Service */
  fetchOrdersCountApi: async () => {
    const res = await api.get('/api/orders/count')
    return res
  }
}
