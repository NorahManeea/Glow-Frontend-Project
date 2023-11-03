import React, { useEffect } from 'react'
import { AppDispatch, RootState } from '../../redux/store'
import { useDispatch, useSelector } from 'react-redux'
import { orderActions } from '../../redux/slices/orders/orderSlice'
import api from '../../api'
import AdminSideBar from './AdminSideBar'
import useOrderState from '../../hooks/useOrderState'

import swal from 'sweetalert'
import DeleteBinLineIcon from 'remixicon-react/DeleteBinLineIcon'
import { toast } from 'react-toastify'
import { useFetchOrders, useFetchProducts, useFetchUsers } from '../../hooks/useDataFetching'
import useUserState from '../../hooks/useUserState'
import useProductState from '../../hooks/useProductState'


export default function OrdersTable() {
  useFetchOrders()
  useFetchUsers()
  useFetchProducts()
  const dispatch = useDispatch<AppDispatch>()
  const {orders,isLoading, error} = useOrderState()
  const {users} = useUserState()
  const {products} = useProductState()


  const handleDeleteBtnClick = (id: number) => {
    swal({
      title: 'Delete',
      text: 'Are you sure you want to delete?',
      icon: 'warning',
      dangerMode: true,
      buttons: ['Cancel', 'Delete'],
    }).then((isOk) => {
      if (isOk) {
        dispatch(orderActions.removeOrder({ orderId: id }))
        toast.success('Order deleted successfully')

      }
    });
  }
  const getUser = (userId: number) => {
    const user = users.find((user) => user.id === userId)
    return user ? user.firstName : 'User Not Found'
  }

  const getProduct = (productId: number) => {
    const product = products.find((product) => product.id === productId)
    return product ? product.name : 'Product Not Found'
  }


  return (
    <div className="flex">
      <AdminSideBar />
      <div className="w-3/4 bg-white p-4">
          {isLoading && <h3> Loading orders...</h3>}
          <div className="flex items-center mb-3">
              <h2 className="text-2xl font-bold text-[#32334A] lg:text-3xl my-4" >Orders Table</h2>
            </div>

          <table className="w-full table-fixed border">
            <thead>
              <tr className="bg-[#F7F7F7]">
                <th className="w-1/7 py-4 px-6 text-left text-gray-600 font-bold">ID</th>
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
                  <td className="py-4 px-6 border-b border-gray-200">{getProduct(item.productId)}</td>
                  <td className="py-4 px-6 border-b border-gray-200">{getUser(item.userId)}</td>
                  <td className="py-4 px-6 border-b border-gray-200">
                  {new Date(item.purchasedAt).toLocaleDateString()}
                  </td>

                  <td className="py-4 px-6 border-b border-gray-200 whitespace">
                    <button
                      onClick={()=> handleDeleteBtnClick(item.id)}
                      className="text-red-600 bg-red-500/10 p-3 rounded-full">
                      <DeleteBinLineIcon/>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
    </div>
  )
}
