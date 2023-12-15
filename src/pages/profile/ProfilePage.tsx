import { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
//** Redux */
import { AppDispatch, RootState } from '../../redux/store'
import { useDispatch, useSelector } from 'react-redux'
import { setProfileThunk, updateProfileThunk } from '../../redux/slices/userSlice'
import useUserState from '../../hooks/useUserState'

export default function ProfilePage() {
  const dispatch = useDispatch<AppDispatch>()
  const { id } = useParams()

  //** States */
  const { user } = useUserState()
  const [updateProfile, setUpdateProfile] = useState(false)
  const [profile, setProfile] = useState({
    firstName: '',
    lastName: ''
  })

  //** Update Profile Handler */
  const handleUpdateProfile = () => {
    setUpdateProfile(true)
  }

  //** Inputs Change Handler */
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setProfile((prevUser) => ({
      ...prevUser,
      [name]: value
    }))
  }

  //** Sumbit Handler */
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    try {
      if (user) {
        await dispatch(updateProfileThunk({ userId: user._id, ...profile }))
        toast.success('Profile edited successfully')
        setUpdateProfile(false)
      }
    } catch (error) {
      console.error('Error updating profile:', error)
    }
  }
  useEffect(() => {
    if (id) {
      dispatch(setProfileThunk(id))
      window.scrollTo(0, 0)
    }
  }, [id])

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
          </div>
        </div>
      </div>
    </main>
  )
}
