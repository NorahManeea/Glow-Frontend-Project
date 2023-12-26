import { ChangeEvent, FormEvent, useState } from 'react'
import { toast } from 'react-toastify'
import { ThreeDots } from 'react-loader-spinner'
//** Redux */
import { useDispatch } from 'react-redux'
import { AppDispatch } from '../../redux/store'
import { updateProfileThunk } from '../../redux/slices/userSlice'
//** Custom Hooks */
import useUserState from '../../hooks/useUserState'
//** Types */
import { ProfileModalProps, User } from '../../types/types'

export default function ProfileModal(prop: ProfileModalProps) {
  const { user, isLoading } = useUserState()
  const dispatch = useDispatch<AppDispatch>()

  //** States */
  const [profile, setProfile] = useState<User>(prop.user)

  //** Input Change Hanlder */
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setProfile((prevUser) => ({
      ...prevUser,
      [name]: value
    }))
  }
  //** Close Edit Profile Modal */
  const handleCloseModal = () => {
    prop.setIsModalOpen(false)
  }

  //** Submit Handler */
  const onSubmitHandler = (e: FormEvent) => {
    e.preventDefault()
    try {
      if (user) {
        dispatch(updateProfileThunk({ userId: user._id, ...profile }))
        toast.success('Profile edited successfully')
      }
    } catch (error) {}
    prop.setIsModalOpen(false)
  }

  return (
    <div className="fixed inset-0 overflow-y-auto">
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity">
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>
        <span className="hidden sm:inline-block sm:align-middle sm:h-screen"></span>
        <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
          <div className="flex justify-end">
            <button className="text-gray-500 p-2" onClick={handleCloseModal}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <form onSubmit={onSubmitHandler}>
            <div>
              <div className="mb-4">
                <label
                  htmlFor="firstName"
                  className="block text-sm font-medium leading-6 text-gray-900">
                  First Name
                </label>
                <input
                  id="firstName"
                  name="firstName"
                  className="w-full rounded-md border border-gray-300 bg-white py-2 pl-3 pr-3 leading-5 placeholder-gray-500 focus:border-gray-500 focus:placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-500 sm:text-sm"
                  type="text"
                  value={profile.firstName}
                  onChange={handleInputChange}
                />
              </div>

              <div className="mt-4">
                <label
                  htmlFor="lastName"
                  className="block text-sm font-medium leading-6 text-gray-900">
                  Last Name
                </label>
                <input
                  id="lastName"
                  name="lastName"
                  className="w-full rounded-md border border-gray-300 bg-white py-2 pl-3 pr-3 leading-5 placeholder-gray-500 focus:border-gray-500 focus:placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-500 sm:text-sm"
                  type="text"
                  value={profile.lastName}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className="mt-6 flex items-center justify-end gap-x-6">
              <button
                type="submit"
                className="inline-flex items-center justify-center w-full rounded-md border border-transparent bg-[#32334A] hover:bg-[#3f415a] px-4 py-2 font-medium text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 sm:w-auto sm:text-sm"
                disabled={isLoading}>
                {isLoading ? (
                  <div className="mx-2">
                    <ThreeDots
                      height={20}
                      width={20}
                      color="#fff"
                      visible={true}
                      ariaLabel="threedots-loading"
                    />
                  </div>
                ) : (
                  'Update Profile'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
