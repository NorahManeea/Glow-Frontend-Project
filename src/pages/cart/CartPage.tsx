import { ChangeEvent, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ThreeDots } from 'react-loader-spinner'
//** Redux */
import { useDispatch } from 'react-redux'
import {
  cartActions,
  fetchCartItemsThunk,
  removeFromCartThunk,
  updateCartItemsThunk
} from '../../redux/slices/cartSlice'
import { AppDispatch, RootState } from '../../redux/store'
import { fetchCategoriesThunk } from '../../redux/slices/categorySlice'
import useDiscountCodeSate from '../../hooks/useDiscountCodeState'
//** Custom Hooks */
import useCartState from '../../hooks/useCartState'
import EmptyState from '../../components/common/EmptyState'
import useCategoryState from '../../hooks/useCategoryState'
//** Components */
import CustomLoader from '../../components/global/CustomLoader'

export default function CartPage() {
  const dispatch = useDispatch<AppDispatch>()
  const {
    cartItems,
    totalPrice,
    isLoading,
    cartLength,
    totalAfterDiscount,
    shipping,
    tax,
    savedAmount
  } = useCartState()
  const { categories } = useCategoryState()
  const { error } = useDiscountCodeSate()

  useEffect(() => {
    dispatch(cartActions.calculateTotalPrice())
  }, [cartItems])

  //** Get Categories Name */
  const getCategories = (categoryId: string) => {
    const category = categories.find((category) => category._id.toString() === categoryId)
    return category ? category.name : 'Category Not Found'
  }

  //** Shipping Change Handler */
  const handleShippingChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newShipping = Number(e.target.value)
    dispatch(cartActions.updateShipping({ shipping: newShipping }))
  }

  useEffect(() => {
    Promise.all([dispatch(fetchCategoriesThunk()), dispatch(fetchCartItemsThunk())])
  }, [])

  //** Quantity Handlers */
  const handleIncreaseQuantity = (productId: string, currentQuantity: number) => () => {
    const newQuantity = currentQuantity + 1
    dispatch(updateCartItemsThunk({ _id: productId, quantity: newQuantity }))
  }

  const handleDecreaseQuantity = (productId: string, currentQuantity: number) => () => {
    const newQuantity = Math.max(1, currentQuantity - 1)
    dispatch(updateCartItemsThunk({ _id: productId, quantity: newQuantity }))
  }
  //** Delete Item From Cart Handler */
  const handleDeleteItemFromCart = (productId: string) => () => {
    dispatch(removeFromCartThunk(productId))
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
    <div className=" mx-auto bg-gray-100 text-center w-full">
      {cartItems.length > 0 ? (
        <div className="flex mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8 ">
          <div className="w-3/4 bg-white px-10 py-10">
            <div className="flex justify-between border-b pb-8">
              <h1 className="font-semibold text-2xl">Shopping Cart</h1>
              <h2 className="font-semibold text-2xl">{cartLength + ' items'}</h2>
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
              <div
                key={product._id}
                className="flex items-center hover:bg-gray-100 -mx-8 px-6 py-5 border-b pb-8">
                <div className="flex w-2/5">
                  <div className="w-20">
                    <img className="h-24" src={product.product.image} alt="" />
                  </div>
                  <div className="flex flex-col justify-between ml-4 flex-grow">
                    <span className="font-bold text-sm">{product.product.name}</span>
                    <span className="text-gray-500 text-xs">
                      {getCategories(product.product.categories)}
                    </span>
                    <button
                      onClick={handleDeleteItemFromCart(product.product._id)}
                      className="font-semibold text-red-500 hover:text-red-700 text-xs text-left">
                      Remove
                    </button>
                  </div>
                </div>
                <div className="flex justify-center w-1/5">
                  <svg
                    className="fill-current text-gray-600 w-3 cursor-pointer"
                    viewBox="0 0 448 512"
                    onClick={handleDecreaseQuantity(product.product._id, product.quantity)}>
                    <path d="M416 208H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h384c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z" />
                  </svg>
                  <input
                    className="mx-2 border text-center w-8"
                    type="text"
                    value={product.quantity}
                    readOnly
                  />

                  <svg
                    className="fill-current text-gray-600 w-3 cursor-pointer"
                    viewBox="0 0 448 512"
                    onClick={handleIncreaseQuantity(product.product._id, product.quantity)}>
                    <path d="M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z" />
                  </svg>
                </div>
                <span className="text-center w-1/5 font-semibold text-sm">
                  {product.product.price}$
                </span>
                <span className="text-center w-1/5 font-semibold text-sm">{totalPrice}$</span>
              </div>
            ))}
          </div>
          {/* Cart Summary */}
          <div
            id="summary"
            className="w-1/4 px-8 py-10 bg-white ml-3 max-h-[450px] overflow-y-auto">
            <h1 className="font-semibold text-2xl">Cart Summary</h1>
            <div className="flex justify-between mt-10 mb-5">
              <span className="font-semibold text-sm">{cartItems.length + ' items'}</span>
              <span className="font-semibold text-sm">{}$</span>
            </div>
            <div className="border-t mt-4">
              <div className="flex justify-between py-3 text-sm">
                <span>Subtotal</span>
                <span>{totalPrice} SAR</span>
              </div>
              <div className="flex justify-between py-3 text-sm">
                <span>Discount </span>
                <span>- {savedAmount} SAR</span>
              </div>
              <div className="flex justify-between py-3 text-sm border-b pb-5">
                <span>Shipping</span>
                <span>{shipping} SAR</span>
              </div>

              <div className="flex font-semibold justify-between py-3 text-sm ">
                <span>Total price</span>
                <p>{totalAfterDiscount} SAR</p>
              </div>
              <Link to="/checkout">
                <button className="rounded-md bg-[#32334A] hover:bg-[#3f415a] py-3 text-sm text-white w-full mt-2">
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
                    'Checkout'
                  )}
                </button>
              </Link>
            </div>
          </div>
        </div>
      ) : (
        //** if cart empty */
        <EmptyState
          title="Your cart is empty"
          subTitle="Looks like you haven't added anything to your wishlist. Go ahead and explore products."
          link="/products"
          linkText="Explore products"
        />
      )}
    </div>
  )
}
