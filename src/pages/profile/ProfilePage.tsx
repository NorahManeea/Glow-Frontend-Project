import { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import { AppDispatch } from '../../redux/store'
import { useDispatch } from 'react-redux'
import { userActions } from '../../redux/slices/userSlice'
import { Link } from 'react-router-dom'
import useUserState from '../../hooks/useUserState'
import { toast } from 'react-toastify'

export default function ProfilePage() {
  const { user } = useUserState()

  const dispatch = useDispatch<AppDispatch>()

  const [updateProfile, setUpdateProfile] = useState(false)
  const [profile, setProfile] = useState({
    firstName: '',
    lastName: ''
  })

  //** Update Profile Handler */
  const handleUpdateProfile = () => {
    setUpdateProfile(true)
  }

  useEffect(() => {
    if (user) {
      setProfile({
        firstName: user.firstName || '',
        lastName: user.lastName || ''
      })
    }
  }, [user])

  //** Inputs Change Handler */
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setProfile((prevUser) => ({
      ...prevUser,
      [name]: value
    }))
  }

  //** Sumbit Handler */
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    const updateUserData = { id: user?._id, ...user }
    dispatch(userActions.editProfile(updateUserData))
    toast.success('Profile edited successfully')
    setUpdateProfile(false)
  }
  return (
    <main className="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
      <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0">
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1 className="text-xl font-bold leading-tight tracking-tight text-[#32334A] md:text-2xl">
            <div className="rounded-t-lg h-32 overflow-hidden">
              <img
                className="object-cover object-top w-full"
                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAElBMVEX39/fa183////y8e329vbp5+E5wcoJAAABFUlEQVR4nO3PgQ3CMBAAsZSQ/VemIGCHe9kbeF3Trevsyc493I/J9mf4nOs3XFMZ9hn2GfYZ9hn2GfYZ9hn2GfYZ9hn2GfYZ9hn2GfYZ9hn2GfYZ9hn2GfYZ9hn2GfYZ9hn2GfYZ9hn2GfYZ9hn2GfYZ9hn2GfYZ9hn2GfYZ9hn2GfYZ9hn2GfYZ9hn2GfYZ9hn2GfYZ9hn2GfYZ9hn2GfYZ9hn2GfYZ9hn2GfYZ9hn2GfYZ9hn2GfYZ9hn2GfYZ9hn2GfYZ9hn2GfYZ9hn2GfYZ9hn2GfYZ9hn2GfYZ9hn2GfYZ9hn2GfYZ9hn2GfYZ9hn2GfYZ9hn2GfYZ9hn2GfYZ9hn2Gfb9h3N9h5O9h2dPdu7hdC/EhSJx45s0SgAAAABJRU5ErkJggg=="
              />
            </div>
            <div className="mx-auto w-32 h-32 relative -mt-16 border-4 border-white rounded-full overflow-hidden">
              <img
                className="object-cover object-center h-32"
                src="https://i.pinimg.com/564x/69/6e/63/696e637f3e3f4ea7c73b260f6db58c26.jpg"
              />
            </div>
            Profile
          </h1>
          <div className="space-y-4 md:space-y-6">
            <p>First Name: {user?.firstName}</p>
            <p>Last Name: {user?.lastName}</p>

            <div className="gap-3">
              <button
                onClick={handleUpdateProfile}
                className="w-full text-white bg-[#32334A] hover:bg-[#3f415a] focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mb-2">
                Edit Profile
              </button>
              <Link to="/orders">
                <button className="w-full text-[#956556] focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                  My Orders
                </button>
              </Link>
              <button className="w-full text-red-600 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                Delete my account
              </button>
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
                    value={profile.firstName}
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
                    value={profile.lastName}
                    onChange={handleChange}
                  />
                </div>

                <button className="w-full text-white bg-[#32334A] hover:bg-[#3f415a] focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
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
