import { ChangeEvent, FormEvent, useState } from 'react'
import { GoogleLogin } from '@react-oauth/google'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { ThreeDots } from 'react-loader-spinner'
import { ROLES } from '../../constant/constants'
//** Redux */
import { AppDispatch } from '../../redux/store'
import { useDispatch } from 'react-redux'
import { loginThunk, loginWithGoogleThunk } from '../../redux/slices/userSlice'
//** Custom Hooks */
import useUserState from '../../hooks/useUserState'
import { showToast } from '../../helpers/Toastify'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { loginSchema } from '../../schema/zodSchema'
import { LoginFormInput } from '../../types/types'

export default function Login() {
  //** Zod Validation */
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<LoginFormInput>({
    resolver: zodResolver(loginSchema),
    defaultValues: {}
  })
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
  const onSubmitHandler = async (data: LoginFormInput) => {
    try {
      const res = await dispatch(loginThunk(data))

      if (loginThunk.fulfilled.match(res)) {
        const { user } = res.payload?.data
        if (user.role === ROLES.ADMIN) {
          navigate('/admin-dashboard')
        }
        if (user.role === ROLES.USER) {
          navigate('/')
        }
      } else if (res.meta.requestStatus === 'rejected') {
      }
    } catch (error) {
      showToast('Something went wrong', 'error')
    }
  }

  //** Handle Google Login */
  const handleGoogleOnSuccess = async (response: any) => {
    const idToken: string = response.tokenId
    try {
      await dispatch(loginWithGoogleThunk(idToken))
    } catch (error) {
      console.error('Google login failed:', error)
    }
  }

  return (
    <main className="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
      <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 ">
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1 className="text-xl font-bold leading-tight tracking-tight text-[#32334A] md:text-2xl">
            Sign in
          </h1>
          <div className="w-full">
            <div className="w-full">
              <GoogleLogin
                onSuccess={(credentialResponse) => {
                  console.log(credentialResponse)
                }}
                onError={() => {
                  console.log('Login Failed')
                }}
              />
            </div>
          </div>
          <div className="my-12 border-b text-center">
            <div className="leading-none px-2 inline-block text-sm text-gray-600 tracking-wide font-medium bg-white transform translate-y-1/2">
              Or sign In with Cartesian E-mail
            </div>
          </div>
          <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit(onSubmitHandler)}>
            <div>
              <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">
                Your email
              </label>
              <input
                type="email"
                id="email"
                {...register('email')}
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                placeholder="name@gmail.com"
                onChange={handleInputChange}
              />
              {errors.email && <p className="text-red-500">{errors.email.message}</p>}
            </div>
            <div>
              <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">
                Password
              </label>
              <input
                type="password"
                id="password"
                {...register('password')}
                placeholder="••••••••"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                onChange={handleInputChange}
              />
              {errors.password && <p className="text-red-500">{errors.password.message}</p>}
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
