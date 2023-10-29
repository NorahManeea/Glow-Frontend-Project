import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { AppDispatch, RootState } from '../../redux/store'
import { userActions } from '../../redux/slices/users/userSlice'
import { User } from '../../types/types'
import api from '../../api'
import useUserState from '../../hooks/useUserState'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

interface IFormInput {
  firstName: string
  lastName: string
  email: string
  password: string
}

const schema = yup.object().shape({
  firstName: yup.string().required("First Name is required"),
  lastName: yup.string().required("Last Name is required"),
  email: yup.string().email().required("Email is required"),
  password: yup.string().min(5).max(32).required()
})

export default function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<IFormInput>({
    resolver: yupResolver(schema),
    defaultValues: {}
  })

  const [user, setUser] = useState<IFormInput>({
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  })

  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()
  const { users } = useUserState()

  useEffect(() => {
    handleGetUsers()
  }, [])

  const isEmailRegistered = () => {
    return users.find((userData) => userData.email === user.email) !== undefined
  }

  const handleGetUsers = async () => {
    dispatch(userActions.userRequest())
    const res = await api.get('/mock/e-commerce/users.json')
    dispatch(userActions.userSuccess(res.data))
    console.log(res.data)
  }
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser((prevState) => {
      return { ...prevState, [e.target.name]: e.target.value }
    })
  }
  const onSubmitHandler = async (data: IFormInput) => {
    const newUser = {
      id: new Date().getTime(),
      ...data,
      role: 'visitor',
      ban: false
    }
    try {
      if (!isEmailRegistered()) {
        dispatch(userActions.addUser(newUser))
        console.log(data)
        navigate('/')
      } else {
        toast.error('Email already registered.')
      }
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <main className="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
      <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 ">
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
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
              <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">
                Password
              </label>
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
              className="w-full text-white bg-gray-600 hover:bg-gray-500 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
              Sign up
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
