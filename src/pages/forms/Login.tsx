import { ChangeEvent, FormEvent, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { ROLES } from '../../constant/constants'
import { ThreeDots } from 'react-loader-spinner'
//** Redux */
import { AppDispatch } from '../../redux/store'
import { useDispatch } from 'react-redux'
import { loginThunk } from '../../redux/slices/userSlice'
//** Custom Hooks */
import useUserState from '../../hooks/useUserState'

export default function Login() {
  const navigate = useNavigate()

  const dispatch = useDispatch<AppDispatch>()
  const { isLoading } = useUserState()

  //** States */
  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  })

  //** Input Change Handler */
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setCredentials({
      ...credentials,
      [name]: value
    })
  }

  //** Submit Handler */
  const onSubmitHandler = async (e: FormEvent) => {
    e.preventDefault()
    try {
      const res = await dispatch(loginThunk(credentials))

      if (res.meta.requestStatus === 'fulfilled') {
        const token = res.payload.token
        const user = res.payload.user
        localStorage.setItem('token', token)
        if (user.role === ROLES.ADMIN) {
          navigate('/admin-dashboard')
        }
        if (user.role === ROLES.USER) {
          navigate('/')
        }
      } else if (res.meta.requestStatus === 'rejected') {
        toast.error(res.payload)
      }
    } catch (error) {
      toast.error('Something went wrong')
    }
  }

  return (
    <main className="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
      <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 ">
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1 className="text-xl font-bold leading-tight tracking-tight text-[#32334A] md:text-2xl">
            Sign in
          </h1>
          <form className="space-y-4 md:space-y-6" onSubmit={onSubmitHandler}>
            <div>
              <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">
                Your email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                placeholder="name@gmail.com"
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="••••••••"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                onChange={handleInputChange}
              />
            </div>
            <div className="flex items-center justify-between">
              <Link
                to="/reset-password"
                className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500">
                Forgot password?
              </Link>
            </div>
            <button
              type="submit"
              className="w-full text-white bg-[#32334A] hover:bg-[#3f415a] focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 flex items-center justify-center"
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
                'Sign In'
              )}
            </button>
            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
              Don’t have an account?
              <Link to="/register" className="font-medium text-gray-600 ml-2 hover:underline">
                Register
              </Link>
            </p>
          </form>
        </div>
      </div>
    </main>
  )
}
