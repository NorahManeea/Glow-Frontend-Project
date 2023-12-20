import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { AppDispatch } from '../../redux/store'
import { ChangeEvent, FormEvent, useState } from 'react'
import useCartState from '../../hooks/useCartState'
import { createOrderThunk } from '../../redux/slices/orderSlice'
import { ThreeDots } from 'react-loader-spinner'

export default function CheckoutPage() {
  const navigate = useNavigate()

  const dispatch = useDispatch<AppDispatch>()
  const { cartItems, isLoading } = useCartState()

  //** States */
  const [shippingInfoOpen, setShippingInfoOpen] = useState(true)
  const [step, setStep] = useState(1)
  const [deliveryAddress, setDeliveryAddress] = useState({
    country: '',
    city: '',
    address: ''
  })

  const toggleShippingInfo = () => {
    setShippingInfoOpen(!shippingInfoOpen)
  }

  //** Shipping Info Inputs Handler */
  const handleDeliveryAddressChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setDeliveryAddress((prevAddress) => ({ ...prevAddress, [name]: value }))
  }
  //** Sumbit Handler */
  const onSubmitHandler = async (e: FormEvent) => {
    e.preventDefault()
    await dispatch(
      createOrderThunk({
        shippingInfo: deliveryAddress,
        products: cartItems.map((product) => ({
          product: product.product._id,
          quantity: product.quantity
        }))
      })
    )

    navigate('/')
  }
  return (
    <div className="w-full md:w-3/4 lg:w-1/2 mx-auto p-4 mb-">
      <div className="bg-gray-50 py-12 sm:py-16 lg:py-20 xl:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <section className="bg-gray-50 ">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="text-center">
                <h2 className="mt-6 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl lg:text-5xl">
                  Checkout
                </h2>
                <p className="mx-auto mt-4 max-w-2xl text-lg font-normal text-gray-700 lg:text-xl lg:leading-8">
                  Create your own order
                </p>
              </div>
              <ul className="mx-auto mt-12 grid max-w-md grid-cols-1 gap-10 sm:mt-16 lg:mt-20 lg:max-w-5xl lg:grid-cols-3 ml-20">
                <li className="flex-start group relative flex lg:flex-col">
                  <span
                    className="absolute left-[18px] top-14 h-[calc(100%_-_32px)] w-px bg-gray-300 lg:right-0 lg:left-auto lg:top-[18px] lg:h-px lg:w-[calc(100%_-_72px)]"
                    aria-hidden="true"
                  />
                  <div className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-gray-300 bg-gray-50 transition-all duration-200 group-hover:border-gray-900 group-hover:bg-gray-900">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-gray-600 group-hover:text-white">
                      <path
                        d="M21 12C21 13.6569 16.9706 15 12 15C7.02944 15 3 13.6569 3 12M21 5C21 6.65685 16.9706 8 12 8C7.02944 8 3 6.65685 3 5M21 5C21 3.34315 16.9706 2 12 2C7.02944 2 3 3.34315 3 5M21 5V19C21 20.6569 16.9706 22 12 22C7.02944 22 3 20.6569 3 19V5"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <div className="ml-6 lg:ml-0 lg:mt-10">
                    <h3 className="text-xl font-bold text-gray-900 before:mb-2 before:block before:font-mono before:text-sm before:text-gray-500">
                      Personal Information
                    </h3>
                  </div>
                </li>
                <li className="flex-start group relative flex lg:flex-col">
                  <span
                    className="absolute left-[18px] top-14 h-[calc(100%_-_32px)] w-px bg-gray-300 lg:right-0 lg:left-auto lg:top-[18px] lg:h-px lg:w-[calc(100%_-_72px)]"
                    aria-hidden="true"
                  />
                  <div className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-gray-300 bg-gray-50 transition-all duration-200 group-hover:border-gray-900 group-hover:bg-gray-900">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-gray-600 group-hover:text-white">
                      <path
                        d="M2 3L2 21M22 3V21M11.8 20H12.2C13.8802 20 14.7202 20 15.362 19.673C15.9265 19.3854 16.3854 18.9265 16.673 18.362C17 17.7202 17 16.8802 17 15.2V8.8C17 7.11984 17 6.27976 16.673 5.63803C16.3854 5.07354 15.9265 4.6146 15.362 4.32698C14.7202 4 13.8802 4 12.2 4H11.8C10.1198 4 9.27976 4 8.63803 4.32698C8.07354 4.6146 7.6146 5.07354 7.32698 5.63803C7 6.27976 7 7.11984 7 8.8V15.2C7 16.8802 7 17.7202 7.32698 18.362C7.6146 18.9265 8.07354 19.3854 8.63803 19.673C9.27976 20 10.1198 20 11.8 20Z"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <div className="ml-6 lg:ml-0 lg:mt-10">
                    <h3 className="text-xl font-bold text-gray-900 before:mb-2 before:block before:font-mono before:text-sm before:text-gray-500">
                      Payment Information
                    </h3>
                  </div>
                </li>
                <li className="flex-start group relative flex lg:flex-col">
                  <div className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-gray-300 bg-gray-50 transition-all duration-200 group-hover:border-gray-900 group-hover:bg-gray-900">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-gray-600 group-hover:text-white">
                      <path
                        d="M5.50049 10.5L2.00049 7.9999L3.07849 6.92193C3.964 6.03644 4.40676 5.5937 4.9307 5.31387C5.39454 5.06614 5.90267 4.91229 6.42603 4.86114C7.01719 4.80336 7.63117 4.92617 8.85913 5.17177L10.5 5.49997M18.4999 13.5L18.8284 15.1408C19.0742 16.3689 19.1971 16.983 19.1394 17.5743C19.0883 18.0977 18.9344 18.6059 18.6867 19.0699C18.4068 19.5939 17.964 20.0367 17.0783 20.9224L16.0007 22L13.5007 18.5M7 16.9998L8.99985 15M17.0024 8.99951C17.0024 10.1041 16.107 10.9995 15.0024 10.9995C13.8979 10.9995 13.0024 10.1041 13.0024 8.99951C13.0024 7.89494 13.8979 6.99951 15.0024 6.99951C16.107 6.99951 17.0024 7.89494 17.0024 8.99951ZM17.1991 2H16.6503C15.6718 2 15.1826 2 14.7223 2.11053C14.3141 2.20853 13.9239 2.37016 13.566 2.5895C13.1623 2.83689 12.8164 3.18282 12.1246 3.87469L6.99969 9C5.90927 10.0905 5.36406 10.6358 5.07261 11.2239C4.5181 12.343 4.51812 13.6569 5.07268 14.776C5.36415 15.3642 5.90938 15.9094 6.99984 16.9998V16.9998C8.09038 18.0904 8.63565 18.6357 9.22386 18.9271C10.343 19.4817 11.6569 19.4817 12.7761 18.9271C13.3643 18.6356 13.9095 18.0903 15 16.9997L20.1248 11.8745C20.8165 11.1827 21.1624 10.8368 21.4098 10.4331C21.6291 10.0753 21.7907 9.6851 21.8886 9.27697C21.9991 8.81664 21.9991 8.32749 21.9991 7.34918V6.8C21.9991 5.11984 21.9991 4.27976 21.6722 3.63803C21.3845 3.07354 20.9256 2.6146 20.3611 2.32698C19.7194 2 18.8793 2 17.1991 2Z"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <div className="ml-6 lg:ml-0 lg:mt-10">
                    <h3 className="text-xl font-bold text-gray-900 before:mb-2 before:block before:font-mono before:text-sm before:text-gray-500">
                      Order Confirmation
                    </h3>
                  </div>
                </li>
              </ul>
            </div>
          </section>
        </div>
      </div>

      {/* CHECKOUT FORM */}
      <div>
        <div className="rounded-lg border bg-card text-card-foreground shadow-sm mt-5">
          <div className="flex flex-col space-y-1.5 p-6">
            <div className="flex justify-end cursor-pointer" onClick={toggleShippingInfo}>
              <span>{shippingInfoOpen ? '^' : '▼'}</span>
            </div>
            <h3 className="text-2xl font-semibold leading-none tracking-tight">
              Shipping Information
            </h3>
          </div>
          {shippingInfoOpen && (
            <div className="p-6">
              <form className="space-y-4" onSubmit={onSubmitHandler}>
                <div className="space-y-2">
                  <label
                    htmlFor="country"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    Country
                  </label>
                  <input
                    type="text"
                    id="country"
                    name="country"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    placeholder="Enter your country"
                    value={deliveryAddress.country}
                    onChange={handleDeliveryAddressChange}
                  />
                </div>
                <div className="space-y-2">
                  <label
                    htmlFor="address"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    Address
                  </label>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    placeholder="Enter your address"
                    value={deliveryAddress.address}
                    onChange={handleDeliveryAddressChange}
                  />
                </div>
                <div className="space-y-2">
                  <label
                    htmlFor="city"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    City
                  </label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    placeholder="Enter your city"
                    value={deliveryAddress.city}
                    onChange={handleDeliveryAddressChange}
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
                    'Buy Now'
                  )}
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
