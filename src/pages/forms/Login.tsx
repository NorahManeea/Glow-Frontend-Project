import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AppDispatch, RootState } from '../../redux/store'
import { useDispatch, useSelector } from 'react-redux'
import { userActions } from '../../redux/slices/users/userSlice'
import api from '../../api'
import { toast } from 'react-toastify'
import useUserState from '../../hooks/useUserState'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

interface IFormInput {
  email: string
  password: string
}

// yup schema
const schema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().min(5).max(32).required()
})

export default function Login() {
  const dispatch = useDispatch<AppDispatch>()
  const { users } = useUserState()

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<IFormInput>({
    resolver: yupResolver(schema),
    defaultValues: {
      email: '',
      password: ''
    }
  })

  useEffect(() => {
    handleGetUsers()
  }, [])

  const handleGetUsers = async () => {
    dispatch(userActions.userRequest())

    const res = await api.get('/mock/e-commerce/users.json')
    dispatch(userActions.userSuccess(res.data))
    console.log(res.data)
  }
  const navigate = useNavigate()
  const [user, setUser] = useState({
    email: '',
    password: ''
  })
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser((prevState) => {
      return { ...prevState, [e.target.name]: e.target.value }
    })
  }

  const onSubmitHandler = handleSubmit(async (data: IFormInput) => {
    try {
      // Match data with the existing data
      const foundUser = users.find((userData) => userData.email === data.email)
      console.log(foundUser)
      if (!foundUser) {
        console.log('not found')
      }
      if (foundUser?.ban) {
        // Loggedin
        return toast.warn('Sorry, you are banned')
      }
      if (foundUser && foundUser.password === data.password) {
        // Loggedin
        dispatch(userActions.login(foundUser))
        navigate('/')
        return toast.success('You logged in successfully')
      } else {
        console.log('something went wrong')
        return toast.error('Something went wrong')
      }
    } catch (error) {
      console.log(error)
    }
  })
  return (
    <main className="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
      <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 ">
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
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
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                placeholder="name@gmail.com"
                {...register('email')}
              />
              {errors.email && <p className="text-red-500">{errors.email.message}</p>}{' '}
            </div>
            <div>
              <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">
                Password
              </label>
              <input
                type="password"
                id="password"
                placeholder="••••••••"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                {...register('password')}
              />
              {errors.password && <p className="text-red-500">{errors.password.message}</p>}{' '}
            </div>
            <div className="flex items-center justify-between">
              <Link
                to="/"
                className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500">
                Forgot password?
              </Link>
            </div>
            <button className="w-full text-white bg-gray-600 hover:bg-gray-500 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
              Sign in
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
