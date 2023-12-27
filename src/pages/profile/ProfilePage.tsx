import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import './order.css'
//** Redux */
import { AppDispatch } from '../../redux/store'
import { useDispatch } from 'react-redux'
import { setProfileThunk } from '../../redux/slices/userSlice'
import {
  OrderStatus,
  cancelOrderThunk,
  fetchOrderHistoryThunk,
  returnOrderThunk
} from '../../redux/slices/orderSlice'
//** Custom Hooks */
import useUserState from '../../hooks/useUserState'
import useOrderState from '../../hooks/useOrderState'
//** Components */
import ProfileModal from './ProfileModal'
import CustomLoader from '../../components/global/CustomLoader'

export default function ProfilePage() {
  const dispatch = useDispatch<AppDispatch>()
  const { id } = useParams()

  const { user, isLoading } = useUserState()
  const { orderHistory } = useOrderState()

  //** States */
  const [updateProfile, setUpdateProfile] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)

  //** Open Edit Profile Modal */
  const openEditProfileModal = () => {
    setIsModalOpen(true)
  }
  //** Close Edit Profile Modal */
  const closeEditProfileModal = () => {
    setIsModalOpen(false)
  }
  //**  Return Order Handler */
  const handleReturnOrder = (orderId: string) => {
    dispatch(returnOrderThunk(orderId))
  }

  useEffect(() => {
    dispatch(fetchOrderHistoryThunk())
    if (id) {
      dispatch(setProfileThunk(id))
      window.scrollTo(0, 0)
    }
  }, [])

  //** Order Cancelation Handler */

  const handleCancelOrder = (orderId: string) => {
    dispatch(cancelOrderThunk(orderId))
  }
  //** Check If Order Can be Returned or not */
  const canOrderBeReturned = (orderDate: Date) => {
    const returnDeadline = new Date(orderDate)
    returnDeadline.setDate(returnDeadline.getDate() + 7)
    const currentDate = new Date()
    return currentDate <= returnDeadline
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
    <section className="text-gray-700 body-font overflow-hidden bg-white mx-auto gap-2">
      <div className="container px-5 py-24 mx-auto">
        <div className="grid md:grid-cols-[280px_1fr] gap-6">
          <aside>
            {/* PROFILE INFO */}
            <div
              className="rounded-lg border bg-card text-card-foreground shadow-sm"
              data-v0-t="card">
              <div className="flex flex-col space-y-1.5 p-6">
                <h3 className="text-2xl font-semibold leading-none tracking-tight">Profile</h3>
              </div>
              <div className="p-6">
                <div className="flex items-center gap-3">
                  <div className="grid gap-0.5 text-xs">
                    <div className="font-medium">
                      {user?.firstName} {user?.lastName}
                    </div>
                    <div className="text-gray-500">{user?.email}</div>
                  </div>
                </div>
                <button
                  onClick={openEditProfileModal}
                  className=" bg-[#32334A] text-white inline-flex items-center justify-center rounded-md text-xs font-small h-10 px-4 py-2 mt-4">
                  Edit Profile
                </button>
              </div>
            </div>
            {/* POINTS */}
            <div
              className="rounded-lg border bg-card text-card-foreground shadow-sm mt-4"
              data-v0-t="card">
              <div className="flex flex-col space-y-1.5 p-6">
                <h3 className="text-2xl font-semibold leading-none tracking-tighttext-[#32334A]">
                  Points
                </h3>
              </div>
              <div className="p-6">
                <div className="flex items-center gap-3">
                  <div className="relative flex items-center justify-center overflow-hidden rounded-full h-12 w-12 bg-primary text-[#32334A]">
                    <p className="text-lg font-semibold text-[#956556]">{user?.points}</p>
                  </div>
                  <div className="text-gray-500 text-xs">
                    Earn points for every order you make! Accumulate points to unlock special
                    discounts.
                  </div>
                </div>
              </div>
            </div>
          </aside>

          <div className="bg-white px-8">
            <div className="flex items-center space-x-2 mb-6">
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
                className="h-6 w-6">
                <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
                <path d="M3 6h18" />
                <path d="M16 10a4 4 0 0 1-8 0" />
              </svg>
              <h3 className="text-2xl font-semibold leading-none tracking-tight">My Orders</h3>
            </div>

            <div className="space-y-8">
              {orderHistory.map((order) => (
                <div key={order._id} className="border rounded-md p-5 ">
                  <div className="mb-4 flex justify-between items-center">
                    <h2 className="text-lg font-semibold">Order No.: # {order.uniqueId}</h2>
                    <div className="inline-flex items-center rounded-full border py-0.5 w-fit text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent hover:bg-primary/80">
                      <div className={`cellWithStatus ${order.orderStatus}`}>
                        {order.orderStatus}
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="flex items-center flex-wrap">
                        {order.products.slice(0, 3).map((product, index) => (
                          <div
                            key={product.product._id}
                            className={`relative mb-2 mr-2 ${index > 0 ? 'mr-2' : ''}`}>
                            <img
                              src={product.product.image}
                              alt={product.product.name}
                              className="w-24 h-24 object-cover rounded-md"
                              width={100}
                              height={100}
                              style={{ aspectRatio: '100 / 100', objectFit: 'cover' }}
                            />
                            {index === 2 && order.products.length > 3 && (
                              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-75 text-white font-bold">
                                +{order.products.length - 3}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                      <div className="mt-4">
                        <p className="text-sm">
                          Order Date: {new Date(order.orderDate).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <p className="text-sm">Estimated delivery Thursday 24th Jan 2024</p>
                    <div className="flex space-x-2">
                      {order.orderStatus === OrderStatus.SHIPPED && (
                        <button className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 mb-2">
                          Track Parcel
                        </button>
                      )}
                      {order.orderStatus === OrderStatus.PENDING && (
                        <button onClick={() => handleCancelOrder(order._id)}
                        className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 mb-2">
                          Cancel Order
                        </button>
                      )}
                      {order.orderStatus === OrderStatus.DELIVERED && canOrderBeReturned(order.orderDate) && (
                        
                        <button  onClick={() => handleReturnOrder(order._id)} className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 mb-2">
                          Return Order
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        {isModalOpen && user && (
          <ProfileModal
            setIsModalOpen={closeEditProfileModal}
            isModalOpen={isModalOpen}
            user={user}
          />
        )}
      </div>
    </section>
  )
}
