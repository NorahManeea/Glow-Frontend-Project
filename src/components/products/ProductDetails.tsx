import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { ThreeDots } from 'react-loader-spinner'
//** Redux */
import { useDispatch, useSelector } from 'react-redux'
import useProductState from '../../hooks/useProductState'
import { AppDispatch, RootState } from '../../redux/store'
import { addToCartThunk } from '../../redux/slices/cartSlice'
import { fetchSingleProductThunk, notifyBackInStockThunk } from '../../redux/slices/productSlice'
import { fetchCategoriesThunk } from '../../redux/slices/categorySlice'
//** Custom Hooks */
import useCategoryState from '../../hooks/useCategoryState'
import useOrderState from '../../hooks/useOrderState'
//** Components */
import CustomLoader from '../global/CustomLoader'
//** Icons */
import CheckboxLineIcon from 'remixicon-react/CheckboxLineIcon'
import CheckDoubleLineIcon from 'remixicon-react/CheckDoubleLineIcon'
import Forbid2LineIcon from 'remixicon-react/Forbid2LineIcon'
import useReviewState from '../../hooks/useReviewState'

export default function ProductDetails() {
  const { id } = useParams()
  const dispatch = useDispatch<AppDispatch>()
  const { reviews } = useReviewState()
  const { categories } = useCategoryState()
  const { orderHistory } = useOrderState()

  //** States */
  const { product, error, isLoading } = useProductState()
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const loading = useSelector((state: RootState) => state.cart.isLoading)
  const [hasPurchased, setHasPurchased] = useState(false)

  //** Open Review Side Bar Handler */
  const handleOpenSidebar = () => {
    setIsSidebarOpen(true)
  }
  //** Close Review Side Bar Hanlder */
  const handleCloseSidebar = () => {
    setIsSidebarOpen(false)
  }

  //** Get Categories Name */
  const getCategories = (categoryId: string) => {
    const category = categories.find((category) => category._id.toString() === categoryId)
    return category ? category.name : 'Category Not Found'
  }

  //** Add to Cart Handler */
  const addToCart = () => {
    const { _id: productId } = product
    const quantity = 1
    try {
      dispatch(addToCartThunk({ productId, quantity })).then((res) => {
        if (res.meta.requestStatus === 'fulfilled') {
          const message = res.payload.message
          toast.success(message)
        }
      })
    } catch (error) {
      toast.error('Something went wrong')
    }
  }

  //** Check if Item Purchased (For Review) */
  const checkIfItemPurchased = () => {
    const purchasedProducts = orderHistory.map((order) =>
      order.products.map((product) => product.product.toString())
    )
    const products = purchasedProducts.reduce(
      (acc: string[], current: string[]) => [...acc, ...current],
      []
    )

    setHasPurchased(products.includes(product._id))
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch(fetchCategoriesThunk())
        if (id) {
          await dispatch(fetchSingleProductThunk(id))
          checkIfItemPurchased()
        }
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    fetchData()
  }, [])

  const handleNotifyBackInStock = () => {
    if (product) {
      dispatch(notifyBackInStockThunk(product._id)).then((res) => {
        if (res.meta.requestStatus === 'fulfilled') {
          const message = res.payload.message
          toast.success(message)
        }
      })
    }
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
  if (error) {
    return (
      <main className="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
        <div className="text-center">
          <h1 className="text-xl font-semibold">Error</h1>
          <p className="mt-6 text-base leading-7 text-gray-600">
            There was an error loading the product. Please try again later.
          </p>
        </div>
      </main>
    )
  }

  if (!product || (product && product._id !== id)) {
    return (
      <main className="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
        <div className="text-center">
          <h1 className="text-xl font-semibold">404</h1>
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-[#32334A] sm:text-5xl">
            Product not found
          </h1>
          <p className="mt-6 text-base leading-7 text-gray-600">
            Sorry, we couldn’t find the product you’re looking for.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link
              to="/products"
              className="rounded-md bg-[#32334A] hover:bg-[#3f415a] px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2">
              Go back to products
            </Link>
          </div>
        </div>
      </main>
    )
  }

  return (
    <section className="text-gray-700 body-font overflow-hidden bg-white mx-auto">
      <div className="container px-5 py-24 mx-auto">
        <div className="lg:w-4/5 mx-auto flex flex-wrap">
          <img
            alt={product.name}
            className="lg:w-1/2 w-full object-cover object-center rounded border border-gray-200"
            src={product.image}
          />
          <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
            <p className="leading-relaxed font-semibold mt-3">
              {getCategories(product.categories)}
            </p>

            <h1 className="text-gray-900 text-3xl title-font font-medium mb-2">{product?.name}</h1>
            <p className="leading-relaxed mb-6">{product.description}</p>

            <div className="flex">
              <span className="title-font font-medium text-2xl text-gray-900">
                {product.price} SAR
              </span>
              <button
        disabled={loading}
        className="flex ml-auto text-white bg-[#32334A] hover:bg-[#3f415a] border-0 py-2 px-6 focus:outline-none rounded"
        onClick={addToCart}>
        {loading ? (
          <div className="mx-2">
            <ThreeDots height={20} width={20} color="#fff" visible={true} ariaLabel="threedots-loading" />
          </div>
        ) : product.quantityInStock > 0 ? (
          'Add To Cart'
        ) : (
          <button onClick={handleNotifyBackInStock}>
            Notify Me
          </button>
        )}
      </button>
            </div>

            {/* Products Features */}
            <div className="mt-6 border-t pt-4">
              <div className="p-4 rounded">
                <div className="flex items-center mb-3">
                  <div className="bg-[#F2ACAA]/20 p-2 rounded-md">
                    <CheckboxLineIcon size={20} color="#F2ACAA " />
                  </div>
                  <span className="ml-2">Quality Ingredients</span>
                </div>
                <div className="flex items-center mb-3">
                  <div className="bg-[#F2ACAA]/20 p-2 rounded-md">
                    <CheckDoubleLineIcon size={20} color="#F2ACAA" />
                  </div>
                  <span className="ml-2">Effective Results</span>
                </div>
                <div className="flex items-center">
                  <div className="bg-[#F2ACAA]/20 p-2 rounded-md">
                    <Forbid2LineIcon size={20} color="#F2ACAA" />
                  </div>
                  <span className="ml-2">Cruelty-Free</span>
                </div>
              </div>
            </div>
          </div>

          {/** Reviews Section */}
          {reviews.length > 0 && (
            <div className=" max-w-xl grid gap-6">
              <h2 className="text-2xl pt-4 font-semibold">Customer Reviews</h2>
              {hasPurchased && (
                <div>
                  <input className="border" placeholder="Write your review..." />
                  <button>Add Review</button>
                </div>
              )}

              {reviews.length > 0 &&
                reviews.map((review) => (
                  <div
                    className="rounded-lg border bg-card text-card-foreground shadow-sm grid gap-4"
                    data-v0-t="card">
                    <div className="flex flex-col px-5 pt-4">
                      <div className="flex items-center gap-4">
                        <span className="relative flex shrink-0 overflow-hidden rounded-full w-12 h-12 border">
                          <span className="flex h-full w-full items-center justify-center rounded-full bg-muted">
                            SM
                          </span>
                        </span>
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold text-lg">{review.user}</h3>

                          <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 w-fit text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-primary text-primary-foreground hover:bg-primary/80">
                            Verified Purchase
                          </div>
                        </div>
                        <div className="flex items-center gap-0.5 ml-auto">
                          <time className="text-sm text-gray-500 dark:text-gray-400">
                            {new Date(review.date).toLocaleDateString()}
                          </time>
                        </div>
                      </div>
                    </div>
                    <div className="p-6">
                      <p className="text-base leading-loose text-gray-500">{review.reviewText}</p>
                    </div>
                  </div>
                ))}

              <button
                onClick={handleOpenSidebar}
                className="inline-flex rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 px-4 py-2">
                Load More Reviews
              </button>
            </div>
          )}
        </div>
      </div>

      {/* REVIEW SIDE BAR */}
      {isSidebarOpen && (
        <div className="fixed top-0 right-0 h-full w-1/4 bg-white shadow-lg">
          <div className="flex justify-end">
            <button className="text-gray-500 p-2" onClick={handleCloseSidebar}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <div className="p-4">
            <h2 className="text-gray-900 text-lg font-semibold mb-4">All Reviews</h2>
          </div>
        </div>
      )}
    </section>
  )
}
