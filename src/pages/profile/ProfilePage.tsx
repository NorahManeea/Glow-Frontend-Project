import React, { ChangeEvent, FormEvent, useState } from 'react'
import { AppDispatch, RootState } from '../../redux/store'
import { useDispatch, useSelector } from 'react-redux'
import { userActions } from '../../redux/slices/users/userSlice'
import { Link } from 'react-router-dom'
import useUserState from '../../hooks/useUserState'

export default function ProfilePage() {
  const {userData} = useUserState();

  const dispatch = useDispatch<AppDispatch>()

  const [updateProfile, setUpdateProfile] = useState(false)
  const [user, setUser] = useState({
    firstName: '',
    lastName: ''
  })

  const handleUpdateProfile = () => {
    setUpdateProfile(true)
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUser((prevUser) => {
      return { ...prevUser, [e.target.name]: e.target.value }
    })
  }
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    const updateUserData = { id: userData?.id, ...user }
    dispatch(userActions.editProfile(updateUserData))
    setUpdateProfile(false)
    console.log(user)
  }
  return (
    <main className="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
      <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 ">
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
            Profile
          </h1>
          <div className="space-y-4 md:space-y-6">
            <p>First Name: {userData?.firstName}</p>
            <p>Last Name: {userData?.lastName}</p>

            <div className="gap-3">
              <button
                onClick={handleUpdateProfile}
                className="w-full text-white bg-gray-600 hover:bg-gray-500 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mb-2">
                Edit Profile
              </button>
              <Link to="/orders">
                <button className="w-full text-white bg-gray-600 hover:bg-gray-500 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                  My Orders
                </button>
              </Link>
            </div>

            {updateProfile && (
              <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                <div>
                  <label
                    htmlFor="firstName"
                    className="block mb-2 text-sm font-medium text-gray-900">
                    First Name
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    id="firstName"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    placeholder="First Name"
                    value={userData?.firstName}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label
                    htmlFor="lastName"
                    className="block mb-2 text-sm font-medium text-gray-900">
                    Last Name
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    id="lastName"
                    placeholder="Last Name"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    value={userData?.lastName}
                    onChange={handleChange}
                  />
                </div>

                <button className="w-full text-white bg-gray-600 hover:bg-gray-500 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                  Save
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </main>
  )
}
