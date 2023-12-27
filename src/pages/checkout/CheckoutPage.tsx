import React, { ChangeEvent, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ThreeDots } from 'react-loader-spinner'
//** Redux */
import { createOrderThunk } from '../../redux/slices/orderSlice'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '../../redux/store'
import { fetchSingleDiscountCodeThunk } from '../../redux/slices/discountCode'
import { cartActions } from '../../redux/slices/cartSlice'
//** Custom Hooks */
import useCartState from '../../hooks/useCartState'
//** Components */
import CustomLoader from '../../components/global/CustomLoader'
import Stepper from '../../components/stepper/Stepper'
import useDiscountCodeSate from '../../hooks/useDiscountCodeState'

export default function CheckoutPage() {
  const navigate = useNavigate()
  const dispatch = useDispatch<AppDispatch>()
  const { code } = useDiscountCodeSate()
  const { error } = useDiscountCodeSate()

  const steps = ['Shipping Address', 'Payment Information', 'Confirmation']

  const { isLoading, cartItems, totalPrice, savedAmount, totalAfterDiscount, shipping } =
    useCartState()

  //** States */
  const [selectedDeliveryMethod, setSelectedDeliveryMethod] = useState('')
  const [isShippingInfoOpen, setIsShippingInfoOpen] = useState(true)
  const [isPaymentInfoOpen, setIsPaymentInfoOpen] = useState(true)
  const [discountCode, setDiscountCode] = useState('')
  const [currentStep, setCurrentStep] = useState(0)
  const [deliveryAddress, setDeliveryAddress] = useState({
    country: '',
    city: '',
    address: '',
    province: '',
    postalCode: 0
  })
  const [paymentInfo, setPaymentInfo] = useState({
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: ''
  })

  useEffect(() => {
    dispatch(cartActions.calculateTotalPrice())
  }, [cartItems])

  //** Discount Code Input Change Handler  */
  const handleDiscountCodeChange = (e: ChangeEvent<HTMLInputElement>) => {
    setDiscountCode(e.target.value)
  }
  //** Apply Discount Code  */
  const handleApplyDiscount = () => {
    dispatch(fetchSingleDiscountCodeThunk(discountCode))
    code && dispatch(cartActions.applyDiscount({ discount: code }))
  }

  //** Delivery Method Handler  */
  const handleDeliveryMethodClick = (method: string) => {
    setSelectedDeliveryMethod(method)
  }

  //** Delivery Address Change Handler  */
  const handleDeliveryAddressChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    const parsedValue = name === 'postalCode' ? parseInt(value, 10) : value
    setDeliveryAddress((prevAddress) => ({ ...prevAddress, [name]: parsedValue }))

    if (isValidShippingInfo()) {
      setCurrentStep(1)
    } else {
      setCurrentStep(0)
    }
  }

  const isValidShippingInfo = () => {
    const { country, city, address, province, postalCode } = deliveryAddress
    return country && city && address && province && postalCode
  }
  const isValidPaymentInfo = () => {
    const { cardNumber, cardName, expiryDate, cvv } = paymentInfo
    return cardNumber && cardName && expiryDate && cvv
  }

  //** Payment Change Handler  */
  const handlePaymentInfoChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setPaymentInfo((prevPaymentInfo) => ({ ...prevPaymentInfo, [name]: value }))

    if (isValidPaymentInfo()) {
      setCurrentStep(2)
    } else {
      setCurrentStep(1)
    }
  }

  const placeOrderHandler = async () => {
    await dispatch(
      createOrderThunk({
        shippingInfo: deliveryAddress,
        products: cartItems.map((product) => ({
          product: product.product,
          quantity: product.quantity
        }))
      })
    )

    navigate('/order-success')
  }

  //** Sumbit Handler */
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    await placeOrderHandler()
  }

  if (isLoading) {
    return (
      <section className="text-gray-700 body-font overflow-hidden bg-white mx-auto my-56">
        <div className="container px-5 py-20 mx-auto">
          <div className="text-center">
            <CustomLoader />
          </div>
        </div>
      </section>
    )
  }
  return (
    <div className=" mx-auto bg-gray-100 w-full">
      <div className="flex mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <div className="flex-1 flex flex-col mr-4">
          <div className="bg-white px-6 py-6 mb-8">
            <div className="md:col-span-2">
              <div>
                <h2 className="text-lg leading-6 font-medium text-gray-900">Checkout</h2>
                <p className="mt-1 text-sm text-gray-600">Create your order</p>
                <Stepper currentStep={currentStep} steps={steps} />
              </div>

              <form onSubmit={handleSubmit}>
                <div className="mt-6">
                  <div
                    className="flex justify-between cursor-pointer"
                    onClick={() => setIsShippingInfoOpen(!isShippingInfoOpen)}>
                    <h3 className="text-lg leading-6 font-medium text-gray-900 mb-3">
                      Shipping Info
                    </h3>
                    <div className="text-blue-500">
                      {isShippingInfoOpen ? (
                        '˅'
                      ) : (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="1024"
                          height="1024"
                          viewBox="0 0 1024 1024">
                          <path
                            fill="currentColor"
                            d="M8.2 751.4c0 8.6 3.4 17.401 10 24.001c13.2 13.2 34.8 13.2 48 0l451.8-451.8l445.2 445.2c13.2 13.2 34.8 13.2 48 0s13.2-34.8 0-48L542 251.401c-13.2-13.2-34.8-13.2-48 0l-475.8 475.8c-6.8 6.8-10 15.4-10 24.2z"
                          />
                        </svg>
                      )}
                    </div>
                  </div>
                  {isShippingInfoOpen && (
                    <div>
                      <div className="grid grid-cols-1 gap-y-4 gap-x-4 sm:grid-cols-2">
                        <input
                          type="text"
                          id="country"
                          name="country"
                          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                          placeholder="Country"
                          onChange={handleDeliveryAddressChange}
                        />
                        <input
                          type="text"
                          id="address"
                          name="address"
                          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                          placeholder="Address"
                          onChange={handleDeliveryAddressChange}
                        />

                        <input
                          type="text"
                          id="city"
                          name="city"
                          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                          placeholder="City"
                          onChange={handleDeliveryAddressChange}
                        />
                        <input
                          type="text"
                          id="province"
                          name="province"
                          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                          placeholder="Province"
                          onChange={handleDeliveryAddressChange}
                        />

                        <input
                          type="number"
                          id="postalCode"
                          name="postalCode"
                          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                          placeholder="Postal code"
                          onChange={handleDeliveryAddressChange}
                        />
                      </div>
                      <div className="mt-4">
                        <h3 className="text-lg leading-6 font-medium text-gray-900 mb-3">
                          Delivery Method
                        </h3>
                        <div className="grid grid-cols-2 gap-4 mb-6">
                          <div
                            className={`border rounded-lg p-4 flex justify-between items-center ${
                              selectedDeliveryMethod === 'Standard'
                                ? 'bg-[#F2ACAA]/10 border-[#F2ACAA]'
                                : ''
                            }`}
                            onClick={() => handleDeliveryMethodClick('Standard')}>
                            <div>
                              <h3 className="text-md font-semibold">Standard</h3>
                              <p className="text-sm text-gray-600">4–10 business days</p>
                            </div>
                            <div>
                              <p className="text-md font-semibold">18.00 SAR</p>
                            </div>
                            {selectedDeliveryMethod === 'Standard' && (
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width={24}
                                height={24}
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth={2}
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="text-[#F2ACAA]">
                                <polyline points="20 6 9 17 4 12" />
                              </svg>
                            )}
                          </div>
                          <div
                            className={`border rounded-lg p-4 flex justify-between items-center ${
                              selectedDeliveryMethod === 'Express'
                                ? 'bg-[#F2ACAA]/10 border-[#F2ACAA]'
                                : ''
                            }`}
                            onClick={() => handleDeliveryMethodClick('Express')}>
                            <div>
                              <h3 className="text-md font-semibold">Express</h3>
                              <p className="text-sm text-gray-600">2–5 business days</p>
                            </div>
                            <div>
                              <p className="text-md font-semibold">30.00 SAR</p>
                            </div>
                            {selectedDeliveryMethod === 'Express' && (
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width={24}
                                height={24}
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth={2}
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="text-[#F2ACAA]">
                                <polyline points="20 6 9 17 4 12" />
                              </svg>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <div className="mt-4">
                  <div
                    className="flex justify-between cursor-pointer"
                    onClick={() => setIsPaymentInfoOpen(!isPaymentInfoOpen)}>
                    <h3 className="text-lg leading-6 font-medium text-gray-900 mb-3">
                      Payment information
                    </h3>
                    <div className="text-gray-500">{isPaymentInfoOpen ? '˅' : '˄'}</div>
                  </div>
                  {isPaymentInfoOpen && (
                    <div className="grid grid-cols-1 gap-y-4 gap-x-4">
                      <div>
                        <div className="flex items-center mb-4 mt-4">
                          <input
                            id="credit-card"
                            className="text-[#F2ACAA] focus:ring-[#F2ACAA] border-gray-300"
                            type="radio"
                            name="payment"
                          />
                          <label htmlFor="credit-card" className="ml-2">
                            Credit card
                          </label>
                          <input
                            id="paypal"
                            className="ml-6 text-[#F2ACAA] focus:ring-[#F2ACAA] border-gray-300"
                            type="radio"
                            name="payment"
                          />
                          <label htmlFor="paypal" className="ml-2">
                            PayPal
                          </label>
                        </div>
                      </div>

                      <div className="mt-4 grid grid-cols-1 gap-y-4 gap-x-4 sm:grid-cols-2">
                        <input
                          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                          placeholder="Card Name"
                          type="text"
                          id="card-name"
                          name="cardName"
                          onChange={handlePaymentInfoChange}
                        />
                        <input
                          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                          placeholder="Card Number"
                          type="number"
                          id="card-number"
                          name="cardNumber"
                          onChange={handlePaymentInfoChange}
                        />
                        <input
                          type="date"
                          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                          placeholder="Expiry at"
                          id="expiryDate"
                          name="expiryDate"
                          onChange={handlePaymentInfoChange}
                        />
                        <input
                          type="text"
                          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                          placeholder="CVV"
                          id="cvv"
                          name="cvv"
                          onChange={handlePaymentInfoChange}
                        />
                      </div>
                    </div>
                  )}
                  <div className="mt-6 flex items-center justify-end gap-x-6">
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="inline-flex items-center justify-center w-full rounded-md border border-transparent bg-[#32334A] hover:bg-[#3f415a] px-4 py-2 font-medium text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 sm:w-auto sm:text-sm">
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
                        'Place your Order'
                      )}
                    </button>
                  </div>
                </div>
              </form>

              <div className="flex items-center space-x-4 bg-white p-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 256 83">
                  <defs>
                    <linearGradient
                      id="logosVisa0"
                      x1="45.974%"
                      x2="54.877%"
                      y1="-2.006%"
                      y2="100%">
                      <stop offset="0%" stop-color="#222357" />
                      <stop offset="100%" stop-color="#254AA5" />
                    </linearGradient>
                  </defs>
                  <path
                    fill="url(#logosVisa0)"
                    d="M132.397 56.24c-.146-11.516 10.263-17.942 18.104-21.763c8.056-3.92 10.762-6.434 10.73-9.94c-.06-5.365-6.426-7.733-12.383-7.825c-10.393-.161-16.436 2.806-21.24 5.05l-3.744-17.519c4.82-2.221 13.745-4.158 23-4.243c21.725 0 35.938 10.724 36.015 27.351c.085 21.102-29.188 22.27-28.988 31.702c.069 2.86 2.798 5.912 8.778 6.688c2.96.392 11.131.692 20.395-3.574l3.636 16.95c-4.982 1.814-11.385 3.551-19.357 3.551c-20.448 0-34.83-10.87-34.946-26.428m89.241 24.968c-3.967 0-7.31-2.314-8.802-5.865L181.803 1.245h21.709l4.32 11.939h26.528l2.506-11.939H256l-16.697 79.963zm3.037-21.601l6.265-30.027h-17.158zm-118.599 21.6L88.964 1.246h20.687l17.104 79.963zm-30.603 0L53.941 26.782l-8.71 46.277c-1.022 5.166-5.058 8.149-9.54 8.149H.493L0 78.886c7.226-1.568 15.436-4.097 20.41-6.803c3.044-1.653 3.912-3.098 4.912-7.026L41.819 1.245H63.68l33.516 79.963z"
                    transform="matrix(1 0 0 -1 0 82.668)"
                  />
                </svg>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="30"
                  height="30"
                  viewBox="0 0 512 211">
                  <path d="M93.552 27.103c-6 7.1-15.602 12.702-25.203 11.901c-1.2-9.6 3.5-19.802 9.001-26.103C83.35 5.601 93.852.4 102.353 0c1 10.001-2.9 19.802-8.8 27.103m8.701 13.802c-13.902-.8-25.803 7.9-32.404 7.9c-6.7 0-16.802-7.5-27.803-7.3c-14.301.2-27.603 8.3-34.904 21.202c-15.002 25.803-3.9 64.008 10.601 85.01c7.101 10.401 15.602 21.802 26.803 21.402c10.602-.4 14.802-6.9 27.604-6.9c12.901 0 16.602 6.9 27.803 6.7c11.601-.2 18.902-10.4 26.003-20.802c8.1-11.801 11.401-23.303 11.601-23.903c-.2-.2-22.402-8.7-22.602-34.304c-.2-21.402 17.502-31.603 18.302-32.203c-10.002-14.802-25.603-16.402-31.004-16.802m80.31-29.004V167.82h24.202v-53.306h33.504c30.603 0 52.106-21.002 52.106-51.406c0-30.403-21.103-51.206-51.306-51.206zm24.202 20.403h27.903c21.003 0 33.004 11.201 33.004 30.903c0 19.702-12.001 31.004-33.104 31.004h-27.803zM336.58 169.019c15.202 0 29.303-7.7 35.704-19.902h.5v18.702h22.403V90.21c0-22.502-18.002-37.004-45.706-37.004c-25.703 0-44.705 14.702-45.405 34.904h21.803c1.8-9.601 10.7-15.902 22.902-15.902c14.802 0 23.103 6.901 23.103 19.603v8.6l-30.204 1.8c-28.103 1.7-43.304 13.202-43.304 33.205c0 20.202 15.701 33.603 38.204 33.603m6.5-18.502c-12.9 0-21.102-6.2-21.102-15.702c0-9.8 7.901-15.501 23.003-16.401l26.903-1.7v8.8c0 14.602-12.401 25.003-28.803 25.003m82.01 59.707c23.603 0 34.704-9 44.405-36.304L512 54.706h-24.603l-28.503 92.11h-.5l-28.503-92.11h-25.303l41.004 113.513l-2.2 6.901c-3.7 11.701-9.701 16.202-20.402 16.202c-1.9 0-5.6-.2-7.101-.4v18.702c1.4.4 7.4.6 9.201.6" />
                </svg>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="30"
                  height="30"
                  viewBox="0 0 256 199">
                  <path d="M46.54 198.011V184.84c0-5.05-3.074-8.342-8.343-8.342c-2.634 0-5.488.878-7.464 3.732c-1.536-2.415-3.731-3.732-7.024-3.732c-2.196 0-4.39.658-6.147 3.073v-2.634h-4.61v21.074h4.61v-11.635c0-3.731 1.976-5.488 5.05-5.488c3.072 0 4.61 1.976 4.61 5.488v11.635h4.61v-11.635c0-3.731 2.194-5.488 5.048-5.488c3.074 0 4.61 1.976 4.61 5.488v11.635zm68.271-21.074h-7.463v-6.366h-4.61v6.366h-4.171v4.17h4.17v9.66c0 4.83 1.976 7.683 7.245 7.683c1.976 0 4.17-.658 5.708-1.536l-1.318-3.952c-1.317.878-2.853 1.098-3.951 1.098c-2.195 0-3.073-1.317-3.073-3.513v-9.44h7.463zm39.076-.44c-2.634 0-4.39 1.318-5.488 3.074v-2.634h-4.61v21.074h4.61v-11.854c0-3.512 1.536-5.488 4.39-5.488c.878 0 1.976.22 2.854.439l1.317-4.39c-.878-.22-2.195-.22-3.073-.22m-59.052 2.196c-2.196-1.537-5.269-2.195-8.562-2.195c-5.268 0-8.78 2.634-8.78 6.805c0 3.513 2.634 5.488 7.244 6.147l2.195.22c2.415.438 3.732 1.097 3.732 2.195c0 1.536-1.756 2.634-4.83 2.634c-3.073 0-5.488-1.098-7.025-2.195l-2.195 3.512c2.415 1.756 5.708 2.634 9 2.634c6.147 0 9.66-2.853 9.66-6.805c0-3.732-2.854-5.708-7.245-6.366l-2.195-.22c-1.976-.22-3.512-.658-3.512-1.975c0-1.537 1.536-2.415 3.951-2.415c2.635 0 5.269 1.097 6.586 1.756zm122.495-2.195c-2.635 0-4.391 1.317-5.489 3.073v-2.634h-4.61v21.074h4.61v-11.854c0-3.512 1.537-5.488 4.39-5.488c.879 0 1.977.22 2.855.439l1.317-4.39c-.878-.22-2.195-.22-3.073-.22m-58.833 10.976c0 6.366 4.39 10.976 11.196 10.976c3.073 0 5.268-.658 7.463-2.414l-2.195-3.732c-1.756 1.317-3.512 1.975-5.488 1.975c-3.732 0-6.366-2.634-6.366-6.805c0-3.951 2.634-6.586 6.366-6.805c1.976 0 3.732.658 5.488 1.976l2.195-3.732c-2.195-1.757-4.39-2.415-7.463-2.415c-6.806 0-11.196 4.61-11.196 10.976m42.588 0v-10.537h-4.61v2.634c-1.537-1.975-3.732-3.073-6.586-3.073c-5.927 0-10.537 4.61-10.537 10.976c0 6.366 4.61 10.976 10.537 10.976c3.073 0 5.269-1.097 6.586-3.073v2.634h4.61zm-16.904 0c0-3.732 2.415-6.805 6.366-6.805c3.732 0 6.367 2.854 6.367 6.805c0 3.732-2.635 6.805-6.367 6.805c-3.951-.22-6.366-3.073-6.366-6.805m-55.1-10.976c-6.147 0-10.538 4.39-10.538 10.976c0 6.586 4.39 10.976 10.757 10.976c3.073 0 6.147-.878 8.562-2.853l-2.196-3.293c-1.756 1.317-3.951 2.195-6.146 2.195c-2.854 0-5.708-1.317-6.367-5.05h15.587v-1.755c.22-6.806-3.732-11.196-9.66-11.196m0 3.951c2.853 0 4.83 1.757 5.268 5.05h-10.976c.439-2.854 2.415-5.05 5.708-5.05m114.372 7.025v-18.879h-4.61v10.976c-1.537-1.975-3.732-3.073-6.586-3.073c-5.927 0-10.537 4.61-10.537 10.976c0 6.366 4.61 10.976 10.537 10.976c3.074 0 5.269-1.097 6.586-3.073v2.634h4.61zm-16.903 0c0-3.732 2.414-6.805 6.366-6.805c3.732 0 6.366 2.854 6.366 6.805c0 3.732-2.634 6.805-6.366 6.805c-3.952-.22-6.366-3.073-6.366-6.805m-154.107 0v-10.537h-4.61v2.634c-1.537-1.975-3.732-3.073-6.586-3.073c-5.927 0-10.537 4.61-10.537 10.976c0 6.366 4.61 10.976 10.537 10.976c3.074 0 5.269-1.097 6.586-3.073v2.634h4.61zm-17.123 0c0-3.732 2.415-6.805 6.366-6.805c3.732 0 6.367 2.854 6.367 6.805c0 3.732-2.635 6.805-6.367 6.805c-3.951-.22-6.366-3.073-6.366-6.805" />
                  <path fill="#FF5F00" d="M93.298 16.903h69.15v124.251h-69.15z" />
                  <path
                    fill="#EB001B"
                    d="M97.689 79.029c0-25.245 11.854-47.637 30.074-62.126C114.373 6.366 97.47 0 79.03 0C35.343 0 0 35.343 0 79.029c0 43.685 35.343 79.029 79.029 79.029c18.44 0 35.343-6.366 48.734-16.904c-18.22-14.269-30.074-36.88-30.074-62.125"
                  />
                  <path
                    fill="#F79E1B"
                    d="M255.746 79.029c0 43.685-35.343 79.029-79.029 79.029c-18.44 0-35.343-6.366-48.734-16.904c18.44-14.488 30.075-36.88 30.075-62.125c0-25.245-11.855-47.637-30.075-62.126C141.373 6.366 158.277 0 176.717 0c43.686 0 79.03 35.563 79.03 79.029"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Right side - Order Summary */}
        <div id="order-summary" className="w-1/4 px-8 py-10 bg-white max-h-[550px] ">
          <h1 className="font-semibold text-2xl mb-4">Order Summary</h1>
          <div className="max-h-48 overflow-y-auto overflow-x-hidden">
            {cartItems.map((product) => (
              <div key={product.product._id} className="hover:bg-gray-100 px-6 py-5 border-b pb-8">
                <div className="flex items-center">
                  <img className="h-20 object-cover" src={product.product.image} alt="" />

                  <div className="ml-3">
                    <p className="font-semibold text-sm">{totalPrice} SAR</p>
                    <p className="font text-sm overflow-hidden max-h-20 overflow-wrap break-words">
                      {product.product.name}
                    </p>
                    <p className="font text-sm">{product.quantity}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4">
            <div className="flex justify-between py-3 text-sm">
              <span>Subtotal</span>
              <span>{totalPrice} SAR</span>
            </div>
            <div className="flex justify-between py-3 text-sm">
              <span>Discout</span>
              <span>{savedAmount} SAR</span>
            </div>
            <div className="flex justify-between py-3 text-sm border-b pb-5">
              <span>Shipping</span>
              <span>{shipping} SAR</span>
            </div>
            <div className="mt-6">
              <div className="flex space-x-2">
                <input
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  type="text"
                  placeholder="Discount code"
                  onChange={handleDiscountCodeChange}
                />
                <button
                  className="rounded-md bg-[#32334A] hover:bg-[#3f415a] py-2 text-sm text-white w-40"
                  onClick={handleApplyDiscount}>
                  Apply
                </button>
                {error && <p style={{ color: 'red' }}>{error}</p>}
              </div>
            </div>

            <div className="flex font-semibold justify-between py-3 text-sm ">
              <span>Total price</span>
              <span>{totalAfterDiscount}$</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
