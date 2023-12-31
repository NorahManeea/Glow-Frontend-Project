import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AxiosError } from 'axios'
import { useForm } from 'react-hook-form'
import { ThreeDots } from 'react-loader-spinner'
//** Redux */
import { useDispatch } from 'react-redux'
import { AppDispatch } from '../../redux/store'
import { registerThunk } from '../../redux/slices/userSlice'
//** Validation */
import { zodResolver } from '@hookform/resolvers/zod'
import { RegisterFormInput } from '../../types/types'
import { registerSchema } from '../../schema/zodSchema'
//** Custom Hooks */
import useUserState from '../../hooks/useUserState'
import { showToast } from '../../helpers/Toastify'

export default function Register() {
  const navigate = useNavigate()
  const dispatch = useDispatch<AppDispatch>()
  const { isLoading } = useUserState()

  //** States */
  const [user, setUser] = useState<RegisterFormInput>({
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  })
  //** Zod Resolver */
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<RegisterFormInput>({
    resolver: zodResolver(registerSchema),
    defaultValues: {}
  })

  //** Input change Handler */
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser((prevState) => {
      return { ...prevState, [e.target.name]: e.target.value }
    })
  }
  //** Submit Handler */
  const onSubmitHandler = async (data: RegisterFormInput) => {
    try {
      const res = await dispatch(registerThunk(data)).unwrap()
      localStorage.setItem('token', res.payload.token)
      const message = res.payload.message
      showToast(message, 'success')
      navigate('/login')
    } catch (error) {
      let errorMessage
      if (error instanceof AxiosError) {
        errorMessage = error.response?.data.msg
        return showToast(errorMessage, 'error')
      }
      showToast(String(error), 'error')
    }
  }

  return (
    <main className="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
      <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 ">
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1 className="text-xl font-bold leading-tight tracking-tight text-[#32334A] md:text-2xl">
            Create an account
          </h1>
          <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit(onSubmitHandler)}>
            <div>
              <label htmlFor="fname" className="block mb-2 text-sm font-medium text-gray-900">
                First Name
              </label>
              <input
                type="text"
                {...register('firstName')}
                id="firstName"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                placeholder="First Name"
                onChange={handleInputChange}
              />
              {errors.firstName && <p className="text-red-500">{errors.firstName.message}</p>}
            </div>
            <div>
              <label htmlFor="lname" className="block mb-2 text-sm font-medium text-gray-900">
                Last Name
              </label>
              <input
                type="text"
                {...register('lastName')}
                id="lastName"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                placeholder="Last Name"
                onChange={handleInputChange}
              />
              {errors.lastName && <p className="text-red-500">{errors.lastName.message}</p>}
            </div>

            <div>
              <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">
                Your email
              </label>
              <input
                type="email"
                {...register('email')}
                id="email"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                placeholder="name@gmail.com"
                onChange={handleInputChange}
              />
              {errors.email && <p className="text-red-500">{errors.email.message}</p>}
            </div>
            <div>
              <label htmlFor="password" className="blockmb-2 text-sm font-medium text-gray-900">
                Password
              </label>
              <input
                type="password"
                {...register('password')}
                id="password"
                placeholder="••••••••"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                onChange={handleInputChange}
              />
              {errors.password && <p className="text-red-500">{errors.password.message}</p>}
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
                'Register'
              )}
            </button>
            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
              Already have an account?
              <Link to="/login" className="font-medium text-gray-600 ml-2 hover:underline">
                Sign in
              </Link>
            </p>
          </form>
        </div>
      </div>
    </main>
  )
}
