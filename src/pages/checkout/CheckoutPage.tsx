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
          product: product.product._id,
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
                    <div className="text-blue-500">{isShippingInfoOpen ? '˅' : '˄'}</div>
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
                                ? 'bg-blue-100 border-blue-500'
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
                                className="text-blue-500">
                                <polyline points="20 6 9 17 4 12" />
                              </svg>
                            )}
                          </div>
                          <div
                            className={`border rounded-lg p-4 flex justify-between items-center ${
                              selectedDeliveryMethod === 'Express'
                                ? 'bg-blue-100 border-blue-500'
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
                                className="text-blue-500 ">
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
                    <div className="text-blue-500">{isPaymentInfoOpen ? '˅' : '˄'}</div>
                  </div>
                  {isPaymentInfoOpen && (
                    <div className="grid grid-cols-1 gap-y-4 gap-x-4">
                      <div>
                        <div className="flex items-center mb-4 mt-4">
                          <input
                            id="credit-card"
                            className="text-blue-600 focus:ring-blue-500 border-gray-300"
                            type="radio"
                            name="payment"
                          />
                          <label htmlFor="credit-card" className="ml-2">
                            Credit card
                          </label>
                          <input
                            id="paypal"
                            className="ml-6 text-blue-600 focus:ring-blue-500 border-gray-300"
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
                <button onClick={handleApplyDiscount}>Apply Discount</button>
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
