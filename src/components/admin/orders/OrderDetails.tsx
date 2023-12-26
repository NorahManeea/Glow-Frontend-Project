import { Link, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
//** Redux */
import { AppDispatch } from '../../../redux/store'
import { useDispatch } from 'react-redux'
import {
  OrderStatus,
  fetchSingleOrderThunk,
  updateOrderStatusThunk
} from '../../../redux/slices/orderSlice'
//** Custom Hooks */
import useOrderState from '../../../hooks/useOrderState'
//** Components */
import AdminSideBar from '../AdminSideBar'
import CustomLoader from '../../global/CustomLoader'

export default function OrderDetails() {
  const { id } = useParams()
  const dispatch = useDispatch<AppDispatch>()

  //** States */
  const { order, isLoading } = useOrderState()
  const [selectedStatus, setSelectedStatus] = useState<{ [orderId: string]: string }>({})

  //** Order Status Change Handler */
  const handleStatusChange = async (orderId: string, selectedStatus: string) => {
    try {
      setSelectedStatus((prevStatuses) => ({ ...prevStatuses, [orderId]: selectedStatus }))
      dispatch(updateOrderStatusThunk({ orderId, orderStatus: selectedStatus }))
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    if (id) {
      dispatch(fetchSingleOrderThunk(id))
      window.scrollTo(0, 0)
    }
  }, [])

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

  if (!order || (order && order._id !== id)) {
    return (
      <main className="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
        <div className="text-center">
          <h1 className="text-xl font-semibold">404</h1>
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-[#32334A] sm:text-5xl">
            Order not found
          </h1>
          <p className="mt-6 text-base leading-7 text-gray-600">
            Sorry, we couldn’t find the order you’re looking for.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link
              to="/products"
              className="rounded-md bg-[#32334A] hover:bg-[#3f415a] px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2">
              Go back to orders
            </Link>
          </div>
        </div>
      </main>
    )
  }
  return (
    <div className="flex">
      <AdminSideBar />
      <div className="w-4/5 bg-white p-4">
        <div className="flex flex-col p-6 md:p-8 gap-6">
          <div className="flex justify-between items-center">
            <h1 className="text-xl font-bold text-[#32334A]">Order Details</h1>
          </div>
          <div
            className="rounded-lg border bg-card text-card-foreground shadow-sm flex flex-col gap-4"
            data-v0-t="card">
            <div className="flex flex-col space-y-1.5 p-6">
              <h4 className="text-xl font-semibold leading-none tracking-tight text-[#32334A]">
                Order Information
              </h4>
            </div>
            <div className="p-6 grid grid-cols-2 gap-4">
              <p>
                <strong>Order Number:</strong> {order.uniqueId}
              </p>
              <p>
                <strong>Status:</strong>
              </p>
              <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 w-fit text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-primary text-primary-foreground hover:bg-primary/80 ml-2">
                {order.orderStatus}
                <select
                  className="p-2 border border-gray-300 rounded"
                  value={selectedStatus[order._id] || order.orderStatus}
                  onChange={(e) => handleStatusChange(order._id, e.target.value)}>
                  {Object.values(OrderStatus).map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
              </div>
              <p />
              <p>
                <strong>Order Date:</strong> {new Date(order.orderDate).toLocaleDateString()}
              </p>
              <p>
                <strong>Shipping Method:</strong> Standard Delivery
              </p>
            </div>
          </div>
          <div
            className="rounded-lg border bg-card text-card-foreground shadow-sm flex flex-col gap-4"
            data-v0-t="card">
            <div className="flex flex-col space-y-1.5 p-6">
              <h4 className="text-xl font-semibold leading-none tracking-tight text-[#32334A]">
                Customer Details
              </h4>
            </div>
            <div className="p-6 grid grid-cols-2 gap-4">
              <p>
                <strong>Name:</strong> {order.user}
              </p>
              <p>
                <strong>Email:</strong>
                <p>{order.user}</p>
              </p>
            </div>
          </div>
          <div
            className="rounded-lg border bg-card text-card-foreground shadow-sm flex flex-col gap-4"
            data-v0-t="card">
            <div className="flex flex-col space-y-1.5 p-6">
              <h4 className="text-xl font-semibold leading-none tracking-tight text-[#32334A]">
                Item Details
              </h4>
            </div>
          </div>
          <div
            className="rounded-lg border bg-card text-card-foreground shadow-sm flex flex-col gap-4"
            data-v0-t="card">
            <div className="flex flex-col space-y-1.5 p-6">
              <h4 className="text-xl font-semibold leading-none tracking-tight text-[#32334A]">
                Shipping Information
              </h4>
            </div>
            <div className="p-6">
              <p>
                <strong>Country:</strong> {order.shippingInfo.country}
              </p>
              <p>
                <strong>City:</strong> {order.shippingInfo.city}
              </p>
              <p>
                <strong>Address:</strong> {order.shippingInfo.address}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
