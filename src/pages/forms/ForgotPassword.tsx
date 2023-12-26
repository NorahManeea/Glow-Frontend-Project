import { ChangeEvent, useState } from 'react'
import { Link } from 'react-router-dom'
import { ThreeDots } from 'react-loader-spinner'
//** Redux */
import { resetPasswordThunk } from '../../redux/slices/passwordSlice'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '../../redux/store'
//** Custom Hook */
import usePasswordResetState from '../../hooks/usePasswordState'
import { showToast } from '../../helpers/Toastify'
import { useForm } from 'react-hook-form'
import { ForgotPasswordFormInput } from '../../types/types'
import { zodResolver } from '@hookform/resolvers/zod'
import { forgotPasswordSchema } from '../../schema/zodSchema'

export default function ForgotPassword() {
  //** Zod Validation */
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<ForgotPasswordFormInput>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {}
  })
  const dispatch = useDispatch<AppDispatch>()
  const { error, isLoading } = usePasswordResetState()

  //** States */
  const [email, setEmail] = useState('')

  //** Input Change Handler */
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    setEmail(value)
  }

  //** Submit Handler */
  const onSubmitHandler = async (data: ForgotPasswordFormInput) => {
    try {
      dispatch(resetPasswordThunk(email)).then((res) => {
        if (res.meta.requestStatus === 'fulfilled') {
          localStorage.setItem('token', res.payload.token)
          const message = res.payload.message
          showToast(message, 'success')
        } else if (res.meta.requestStatus === 'rejected') {
          showToast(res.payload.msg, 'error')
        }
      })
    } catch (error) {
      showToast('Something went wrong', 'error')
    }
  }
  return (
    <main className="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
      <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 ">
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1 className="text-xl font-bold leading-tight tracking-tight text-[#32334A] md:text-2xl">
            Forgot Password
          </h1>
          <p>Enter your email we'll send you a link to reset your password</p>

          <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit(onSubmitHandler)}>
            <div>
              <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">
                Your email
              </label>
              <input
                type="email"
                id="email"
                {...register('email')}
                value={email}
                onChange={handleInputChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                placeholder="name@gmail.com"
              />
              {errors.email && <p className="text-red-500">{errors.email.message}</p>}
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
                'Send'
              )}
            </button>

            <Link to="/login" className="font-medium text-gray-600 ml-2 hover:underline">
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">Back to login</p>
            </Link>
          </form>
        </div>
      </div>
    </main>
  )
}
