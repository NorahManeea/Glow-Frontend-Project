import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import swal from 'sweetalert'
import { toast } from 'react-toastify'
import '../../../pages/profile/order.css'
//** Redux */
import { AppDispatch } from '../../../redux/store'
import { useDispatch } from 'react-redux'
import { deleteOrderThunk, fetchOrdersThunk } from '../../../redux/slices/orderSlice'
import { fetchUsersThunk } from '../../../redux/slices/userSlice'
//** Custom Hooks */
import useOrderState from '../../../hooks/useOrderState'
import useUserState from '../../../hooks/useUserState'
import CustomLoader from '../../global/CustomLoader'
//** Components */
import AdminSideBar from '../AdminSideBar'

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

  useEffect(() => {
    dispatch(fetchUsersThunk())
    dispatch(fetchOrdersThunk())
  }, [])

  //** Get User Email */
  const getUserEmail = (userId: string) => {
    const user = users.find((user) => user._id === userId)
    return user ? user.email : 'User Not Found'
  }

  if (isLoading) {
    return (
      <section className="text-gray-700 body-font overflow-hidden bg-white mx-auto my-56">
        <div className="container px-5 py-20 mx-auto">
          <div className="text-center">
            <CustomLoader />
          </div>
        </div>
      </section>
    )
  }

  return (
    <div className="flex">
      <AdminSideBar />
      <div className="w-4/5 bg-white p-4">
        <div className="flex items-center mt-5">
          <h3 className="text-2xl font-semibold leading-none tracking-tight flex-grow text-[#32334A]">
            Orders Table
          </h3>
        </div>
        <div className="flex flex-1 items-center justify-center pb-4"></div>
        <div className="p-6">
          <div className="relative w-full overflow-auto">
            <table className="w-full caption-bottom text-sm border">
              <thead className="[&_tr]:border-b">
                <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                  <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground w-[60px]">
                    #
                  </th>
                  <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground w-[100px]">
                    Order ID
                  </th>
                  <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                    Email
                  </th>
                  <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                    Status
                  </th>
                  <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                    Order Date
                  </th>
                  <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground w-[100px]">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="[&_tr:last-child]:border-0">
                {orders.map((item, index) => (
                  <tr
                    key={item._id}
                    className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                    <td className="p-4 align-middle">{index + 1}</td>
                    <td className="p-4 align-middle">{item.uniqueId}</td>
                    <td className="p-4 align-middle">{getUserEmail(item.user)}</td>
                    <td className="p-4 align-middle">
                      <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 w-fit text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent hover:bg-primary/80">
                        <div className={`cellWithStatus ${item.orderStatus}`}>
                          {item.orderStatus}
                        </div>
                      </div>
                    </td>
                    <td className="p-4 align-middle">
                      {new Date(item.orderDate).toLocaleDateString()}
                    </td>
                    <td className="p-4 align-middle">
                      <div className="flex gap-2">
                        <Link
                          to={`/admin-dashboard/orders/${item._id}`}
                          className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 w-10">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width={24}
                            height={24}
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth={2}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="h-4 w-4">
                            <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
                            <circle cx={12} cy={12} r={3} />
                          </svg>
                          <span className="sr-only">View Details</span>
                        </Link>
                        <button
                          onClick={() => handleDeleteBtnClick(item._id)}
                          className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 w-10 text-red-500">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width={24}
                            height={24}
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth={2}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="w-4 h-4">
                            <path d="M3 6h18" />
                            <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                            <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                          </svg>
                          <span className="sr-only">Delete</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
