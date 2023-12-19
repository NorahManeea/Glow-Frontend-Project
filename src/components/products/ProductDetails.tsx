import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import useCategoryState from '../../hooks/useCategoryState'
//** Redux */
import { useDispatch } from 'react-redux'
import useProductState from '../../hooks/useProductState'
import { AppDispatch } from '../../redux/store'
import { addToCartThunk } from '../../redux/slices/cartSlice'
import { fetchSingleProductThunk } from '../../redux/slices/productSlice'
//** Icons */
import CheckboxLineIcon from 'remixicon-react/CheckboxLineIcon'
import CheckDoubleLineIcon from 'remixicon-react/CheckDoubleLineIcon'
import Forbid2LineIcon from 'remixicon-react/Forbid2LineIcon'
//** Components */
import ReviewList from '../reviews/ReviewList'


export default function ProductDetails() {
  const { id } = useParams()
  const dispatch = useDispatch<AppDispatch>()

  const reviewList = [
    {
      id: 1,
      reviewText: 'Good',
      user: 'Norah',
      date: '12/2/2023'
    },
    {
      id: 1,
      reviewText: 'Good',
      user: 'Norah',
      date: '12/2/2023'
    },
    {
      id: 1,
      reviewText: 'Good',
      user: 'Norah',
      date: '12/2/2023'
    }
  ]

  //** States */
  const { product, isLoading } = useProductState()
  const { categories } = useCategoryState()
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  //** Handle Open Review Side Bar */
  const handleOpenSidebar = () => {
    setIsSidebarOpen(true)
  }
  //** Handle Close Review Side Bar */
  const handleCloseSidebar = () => {
    setIsSidebarOpen(false)
  }
  //** Handle get products */
  useEffect(() => {
    if (id) {
      dispatch(fetchSingleProductThunk(id))
      window.scrollTo(0, 0)
    }
  }, [])

  //** Get Category Name */
  const getCategories = (categoryId: string) => {
    const category = categories.find((category) => category._id === categoryId)
    return category ? category.name : 'Category Not Found'
  }

  //** Add to Cart */
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
        {isLoading && <h3> Loading products...</h3>}

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
                className="flex ml-auto text-white bg-[#32334A] hover:bg-[#3f415a] border-0 py-2 px-6 focus:outline-none rounded"
                onClick={addToCart}>
                Add To Cart
              </button>
            </div>

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
          <div className="lg:w-4/5 mx-auto mt-10">
            <button
              className="bg-gray-200 text-gray-700 rounded-full px-3 py-1 text-sm"
              onClick={handleOpenSidebar}>
              View All Reviews
            </button>
          </div>
        </div>
      </div>
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
            <ReviewList reviews={reviewList} />
          </div>
        </div>
      )}
    </section>
  )
}
