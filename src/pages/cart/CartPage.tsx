import { useState } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { removeFromCart } from '../../redux/slices/productSlice'

import swal from 'sweetalert'
import useProductState from '../../hooks/useProductState'

export default function CartPage() {
  const { isLoading, cartItems, product } = useProductState()

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [displayedQuantity, setDisplayedQuantity] = useState(1) // Initialize displayedQuantity to 1

  // useEffect(() => {
  //   const existingProduct = cartItems.find((item) => item.id === product.id)
  //   if (existingProduct) {
  //     setDisplayedQuantity(existingProduct.quantity)
  //   } else {
  //     setDisplayedQuantity(1) // Set the default displayed quantity if the product is not in the cart
  //   }
  // }, [cartItems, product])

  //** Quantity Handlers */
  const handleIncreaseQuantity = () => {
    setDisplayedQuantity((prevQuantity) => prevQuantity + 1)
  }

  const handleDecreaseQuantity = () => {
    setDisplayedQuantity((prevQuantity) => (prevQuantity > 1 ? prevQuantity - 1 : prevQuantity))
  }

  //** Checkout Handler */
  const checkoutHandler = () => {
    swal({
      title: 'Checkout',
      text: 'Your order has been recived successfuly',
      icon: 'success'
    }).then((isOk) => {
      if (isOk) {
        navigate('/products')
      }
    })
  }

  return (
    <div className="container bg-gray-100 text-center">
      {isLoading && <h3> Loading products...</h3>}
      {cartItems.length > 0 ? (
        <div className="flex mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8 ">
          <div className="w-3/4 bg-white px-10 py-10">
            <div className="flex justify-between border-b pb-8">
              <h1 className="font-semibold text-2xl">Shopping Cart</h1>
              <h2 className="font-semibold text-2xl">{cartItems.length + ' items'}</h2>
            </div>
            <div className="flex mt-10 mb-5">
              <h3 className="font-semibold text-gray-600 text-xs uppercase w-2/5">
                Product Details
              </h3>
              <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5 ">
                Quantity
              </h3>
              <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5">
                Price
              </h3>
              <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5">
                Total
              </h3>
            </div>
            {cartItems.map((product) => (
              <div className="flex items-center hover:bg-gray-100 -mx-8 px-6 py-5 border-b pb-8">
                <div className="flex w-2/5">
                  {/* products */}
                  <div className="w-20">
                    <img className="h-24" src={product.image} alt="" />
                  </div>
                  <div className="flex flex-col justify-between ml-4 flex-grow">
                    <span className="font-bold text-sm">{product.name}</span>
                    <span className="text-gray-500 text-xs">{product.categories}</span>
                    <button
                      className="font-semibold text-red-500 hover:text-red-700 text-xs text-left"
                      onClick={() => dispatch(removeFromCart({ productId: product._id }))}>
                      Remove
                    </button>
                  </div>
                </div>
                <div className="flex justify-center w-1/5">
                  <svg
                    className="fill-current text-gray-600 w-3 cursor-pointer"
                    viewBox="0 0 448 512"
                    onClick={handleDecreaseQuantity}>
                    <path d="M416 208H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h384c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z" />
                  </svg>
                  <input
                    className="mx-2 border text-center w-8"
                    type="text"
                    value={displayedQuantity}
                    readOnly
                  />

                  <svg
                    className="fill-current text-gray-600 w-3 cursor-pointer"
                    viewBox="0 0 448 512"
                    onClick={handleIncreaseQuantity}>
                    <path d="M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z" />
                  </svg>
                </div>
                <span className="text-center w-1/5 font-semibold text-sm">{product.price}$</span>
                <span className="text-center w-1/5 font-semibold text-sm">{}$</span>
              </div>
            ))}
          </div>
          {/* second part */}
          <div
            id="summary"
            className="w-1/4 px-8 py-10 bg-white ml-3 max-h-[600px] overflow-y-auto">
            <h1 className="font-semibold text-2xl">Order Details</h1>
            <div className="flex justify-between mt-10 mb-5">
              <span className="font-semibold text-sm">{cartItems.length + ' items'}</span>
              <span className="font-semibold text-sm">{}$</span>
            </div>
            <div className="border-t mt-4">
              <div className="flex justify-between py-3 text-sm">
                <span>Subtotal</span>
                <span>{}$</span>
              </div>
              <div className="flex justify-between py-3 text-sm">
                <span>Discout</span>
                <span>{}$</span>
              </div>
              <div className="flex justify-between py-3 text-sm border-b pb-5">
                <span>Shipping</span>
                <span>14$</span>
              </div>

              <div className="py-10">
                <label className="font-semibold inline-block mb-3 text-sm uppercase">
                  Promo Code
                </label>

                <div className="flex">
                  <input
                    type="text"
                    id="promo"
                    placeholder="Enter your code"
                    className="p-2 text-sm flex-grow"
                  />
                  <button className="bg-[#32334A] hover:bg-[#3f415a] px-5 py-2 text-sm text-white rounded-md ">
                    Apply
                  </button>
                </div>
              </div>

              <div className="flex font-semibold justify-between py-3 text-sm ">
                <span>Total price</span>
                <span>$</span>
              </div>
              <Link to="/payment">
                <button className="rounded-md bg-[#32334A] hover:bg-[#3f415a] py-3 text-sm text-white w-full mt-2">
                  Checkout
                </button>
              </Link>
            </div>
          </div>
        </div>
      ) : (
        <div className="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
          <div className="text-center">
            <h1 className="mt-4 text-3xl font-bold tracking-tight text-[#32334A] sm:text-5xl">
              Your cart is empty
            </h1>
            <p className="mt-6 text-base leading-7 text-gray-600">
              Looks like you haven't added anything to your cart. <br />
              Go ahead and explore products
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link
                to="/products"
                className="rounded-md bg-[#32334A]  px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2">
                Explore products
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
