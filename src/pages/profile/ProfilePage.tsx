import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import './order.css'
//** Redux */
import { AppDispatch } from '../../redux/store'
import { useDispatch } from 'react-redux'
import { setProfileThunk } from '../../redux/slices/userSlice'
import { fetchOrderHistoryThunk } from '../../redux/slices/orderSlice'
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

  useEffect(() => {
    dispatch(fetchOrderHistoryThunk())
    if (id) {
      dispatch(setProfileThunk(id))
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

          <section>
            <div
              className="rounded-lg border bg-card text-card-foreground shadow-sm"
              data-v0-t="card">
              <div className="flex flex-col space-y-1.5 p-6">
                <h3 className="text-2xl font-semibold leading-none tracking-tighttext-[#32334A]">
                  Order History
                </h3>
              </div>
              <div className="p-6">
                <div className="relative w-full overflow-auto">
                  <table className="w-full caption-bottom text-sm">
                    <thead className="[&_tr]:border-b">
                      <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                        <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                          Order ID
                        </th>
                        <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                          Order Date
                        </th>
                        <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                          Payment Method
                        </th>
                        <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                          Total
                        </th>
                        <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                          Status
                        </th>
                        <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="[&_tr:last-child]:border-0">
                      {orderHistory.map((order) => (
                        <tr
                          key={order._id}
                          className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                          <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0">
                            #{order.uniqueId}
                          </td>
                          <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0">
                            {new Date(order.orderDate).toLocaleDateString()}
                          </td>
                          <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0">
                            {'Master Card'}
                          </td>
                          <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0">{'64'}</td>
                          <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0">
                            <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 w-fit text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent hover:bg-primary/80">
                              <div className={`cellWithStatus ${order.orderStatus}`}>
                                {order.orderStatus}
                              </div>
                            </div>
                          </td>
                          <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0">
                            <button className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 w-10">
                              <Link
                                to=""
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
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </section>
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
