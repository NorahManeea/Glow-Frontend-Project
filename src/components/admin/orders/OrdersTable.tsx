import { useEffect } from 'react'
import swal from 'sweetalert'
import { toast } from 'react-toastify'
//** Redux */
import { AppDispatch } from '../../../redux/store'
import { useDispatch } from 'react-redux'
import { deleteOrderThunk, fetchOrdersThunk } from '../../../redux/slices/orderSlice'
import AdminSideBar from '../AdminSideBar'
import DeleteBinLineIcon from 'remixicon-react/DeleteBinLineIcon'
import useOrderState from '../../../hooks/useOrderState'
import useUserState from '../../../hooks/useUserState'


export default function OrdersTable() {
  const dispatch = useDispatch<AppDispatch>()
  //** Custom Hook */
  const { orders, isLoading } = useOrderState()
  const { users } = useUserState()

  //** Delete Handler */
  const handleDeleteBtnClick = (id: string) => {
    swal({
      title: 'Delete',
      text: 'Are you sure you want to delete?',
      icon: 'warning',
      dangerMode: true,
      buttons: ['Cancel', 'Delete']
    }).then((isOk) => {
      if (isOk) {
        dispatch(deleteOrderThunk(id))
        toast.success('Order has been deleted successfully')
      }
    })
  }

  //** Get User Email */
  const getUserEmail = (userId: string) => {
    const user = users.find((user) => user._id === userId)
    return user ? user.email : 'User Not Found'
  }

  useEffect(() => {
    dispatch(fetchOrdersThunk())
  }, [])

  return (
    <div className="flex">
      <AdminSideBar />
      <div className="w-3/4 bg-white p-4">
        {isLoading && <h3> Loading orders...</h3>}
        <div className="flex items-center mb-3">
          <h2 className="text-2xl font-bold text-[#32334A] lg:text-3xl my-4">Orders Table</h2>
        </div>

        <table className="w-full table-fixed border">
          <thead>
            <tr className="bg-[#F7F7F7]">
              <th className="w-1/9 py-4 px-6 text-left text-gray-600 font-bold">-</th>
              <th className="w-1/8 py-4 px-6 text-left text-gray-600 font-bold">Order ID</th>
              <th className="w-1/5 py-4 px-6 text-left text-gray-600 font-bold">User Email</th>
              <th className="w-1/7 py-4 px-6 text-left text-gray-600 font-bold">Created At</th>
              <th className="w-1/7 py-4 px-6 text-left text-gray-600 font-bold">Status</th>
              <th className="w-1/7 py-4 px-6 text-left text-gray-600 font-bold">Action</th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {orders.map((item, index) => (
              <tr key={item._id}>
                <td className="py-4 px-6 border-b border-gray-200">{index + 1}</td>
                <td className="py-4 px-6 border-b border-gray-200">{item.uniqueId}</td>
                <td className="py-4 px-6 border-b border-gray-200">{getUserEmail(item.user)}</td>
                <td className="py-4 px-6 border-b border-gray-200">
                  {new Date(item.orderDate).toLocaleDateString()}
                </td>

                <td className="py-4 px-6 border-b border-gray-200">{item.orderStatus}</td>

                <td className="py-4 px-6 border-b border-gray-200 whitespace">
                  <button
                    onClick={() => handleDeleteBtnClick(item._id)}
                    className="text-red-600 bg-red-500/10 p-3 rounded-full">
                    <DeleteBinLineIcon />
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
