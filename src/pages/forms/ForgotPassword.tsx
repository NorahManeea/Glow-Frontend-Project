import { ChangeEvent, FormEvent, useState } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import { AxiosError } from 'axios'
import { resetPasswordThunk } from '../../redux/slices/passwordSlice'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../../redux/store'
import { ThreeDots } from 'react-loader-spinner'

export default function ForgotPassword() {
  const dispatch = useDispatch<AppDispatch>()
  const { error, isLoading } = useSelector((state: RootState) => state.passwordReset)

  //** States */
  const [email, setEmail] = useState('')

  //** Input Change Handler */
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    setEmail(value)
  }

  //** Submit Handler */
  const onSubmitHandler = async (e: FormEvent) => {
    e.preventDefault()
    try {
      dispatch(resetPasswordThunk(email)).then((res) => {
        if (res.meta.requestStatus === 'fulfilled') {
          localStorage.setItem('token', res.payload.token)
          const message = res.payload.message
          toast.success(message)
        }
        if (res.meta.requestStatus === 'rejected') {
          toast.error(error)
        }
      })
    } catch (error) {
      toast.error('Something went wrong')
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

          <form className="space-y-4 md:space-y-6" onSubmit={onSubmitHandler}>
            <div>
              <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">
                Your email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={handleChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                placeholder="name@gmail.com"
              />
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
