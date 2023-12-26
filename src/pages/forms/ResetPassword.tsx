import { ChangeEvent, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { ThreeDots } from 'react-loader-spinner'
//** Redux */
import { AppDispatch } from '../../redux/store'
import { resetPasswordUrlThunk } from '../../redux/slices/passwordSlice'
import { useDispatch } from 'react-redux'
//** Custom Hooks */
import usePasswordResetState from '../../hooks/usePasswordState'
import { showToast } from '../../helpers/Toastify'
import { useForm } from 'react-hook-form'
import { resetPasswordSchema } from '../../schema/zodSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import { ResetPasswordFormInput } from '../../types/types'

export default function ResetPassword() {
  //** Zod Resolver */
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<ResetPasswordFormInput>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {}
  })
  const dispatch = useDispatch<AppDispatch>()
  const { error, isLoading } = usePasswordResetState()
  const navigate = useNavigate()

  const { userId = '', token = '' } = useParams<{ userId: string; token: string }>()

  //** States */
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  //** Input Change Handler */
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    setPassword(value)
  }

  //** Submit Handler */
  const onSubmitHandler = (e: ResetPasswordFormInput) => {
    try {
      dispatch(resetPasswordUrlThunk({ userId, token, password })).then((res) => {
        if (res.meta.requestStatus === 'fulfilled') {
          const message = res.payload.message
          showToast(message, 'success')
          navigate('/login')
        } else if (res.meta.requestStatus === 'rejected') {
          showToast(res.payload, 'error')
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
            Password Reset
          </h1>
          <p>Enter your new password for your Glow account.</p>

          <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit(onSubmitHandler)}>
            <div>
              <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">
                Password
              </label>
              <input
                type="password"
                id="password"
                {...register('password')}
                onChange={handleInputChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                placeholder="••••••••"
              />
              {errors.password && <p className="text-red-500">{errors.password.message}</p>}
            </div>

            <div>
              <label
                htmlFor="confirmPassword"
                className="block mb-2 text-sm font-medium text-gray-900">
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                {...register('confirmPassword')}
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                placeholder="••••••••"
              />
              {errors.confirmPassword && (
                <p className="text-red-500">{errors.confirmPassword.message}</p>
              )}
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
                'Change my password'
              )}
            </button>
          </form>
        </div>
      </div>
    </main>
  )
}
