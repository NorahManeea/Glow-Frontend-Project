import React, { useEffect } from 'react'
import { AppDispatch, RootState } from '../../redux/store'
import { useDispatch, useSelector } from 'react-redux'
import { orderActions } from '../../redux/slices/orders/orderSlice'
import api from '../../api'
import AdminSideBar from './AdminSideBar'

export default function OrdersTable() {
  const dispatch = useDispatch<AppDispatch>()
  const state = useSelector((state: RootState) => state)
  const orders = state.orders.orders
  const isLoading = state.orders.isLoading
  const error = state.orders.error

  useEffect(() => {
    handleGetProducts()
  }, [])

  const handleGetProducts = async () => {
    dispatch(orderActions.orderRequest())

    const res = await api.get('/mock/e-commerce/orders.json')
    dispatch(orderActions.orderSuccess(res.data))
    console.log(res.data)
  }

  return (
    <div className="flex">
      <AdminSideBar />
      <div className="w-3/4 bg-white p-4">
        <div className=" rounded-lg overflow-hidden mx-4 md:mx-10">
          {isLoading && <h3> Loading orders...</h3>}
          <div className="flex items-center mb-3">
              <h2 className="text-2xl font-bold text-gray-800 lg:text-3xl">Orders Table</h2>
            </div>

          <table className="w-full table-fixed border">
            <thead>
              <tr className="bg-gray-100">
                <th className="w-1/7 py-4 px-6 text-left text-gray-600 font-bold">Count</th>
                <th className="w-1/5 py-4 px-6 text-left text-gray-600 font-bold">Product Id</th>
                <th className="w-1/5 py-4 px-6 text-left text-gray-600 font-bold">User Id</th>
                <th className="w-1/4 py-4 px-6 text-left text-gray-600 font-bold">Created At</th>
                <th className="w-1/4 py-4 px-6 text-left text-gray-600 font-bold">Action</th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {orders.map((item, index) => (
                <tr key={item.id}>
                  <td className="py-4 px-6 border-b border-gray-200">{index + 1}</td>
                  <td className="py-4 px-6 border-b border-gray-200">{item.productId}</td>
                  <td className="py-4 px-6 border-b border-gray-200">{item.userId}</td>
                  <td className="py-4 px-6 border-b border-gray-200">
                    {item.purchasedAt.toString()}
                  </td>

                  <td className="py-4 px-6 border-b border-gray-200 whitespace">
                    <button
                      onClick={() => dispatch(orderActions.removeOrder({ orderId: item.id }))}
                      className="text-white bg-red-600 rounded-md hover:bg-red-500 focus:outline-none focus:shadow-outline-blue active:bg-red-600 py-2 px-4 font-small">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
