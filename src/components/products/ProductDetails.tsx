import { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'

import { useDispatch } from 'react-redux'
import {
  addToCart,
  fetchSingleProductThunk,
  findProductById,
  productsRequest,
  productsSuccess
} from '../../redux/slices/productSlice'

import api from '../../api'
import { categoryActions } from '../../redux/slices/categorySlice'
import useProductState from '../../hooks/useProductState'
import useCategoryState from '../../hooks/useCategoryState'
import { AppDispatch } from '../../redux/store'

export default function ProductDetails() {
  const { id } = useParams();
  
  const dispatch = useDispatch<AppDispatch>();

  //** States */
  const { product, isLoading } = useProductState()
  const { categories } = useCategoryState()

  //** Handle add to cart buton */
  const handleAddToCart = () => {
    dispatch(addToCart(product))
    return toast.success('Item added to cart')
  }
  //** Handle get products */
  useEffect(() => {
    console.log(id)

    if (id) {
      dispatch(fetchSingleProductThunk(id));
      window.scrollTo(0, 0);
    }
  }, [dispatch, id]);

  //** Get Categories */
  const handleGetCategories = async () => {
    dispatch(categoryActions.categoryRequest())
    const res = await api.get('/api/categories')
    dispatch(categoryActions.categorySuccess(res.data))
  }

  //** Get Category Name */
  const getCategories = (categoryId: number) => {
    const category = categories.find((category) => Number(category._id) === categoryId)
    return category ? category.name : 'Category Not Found'
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
            src={`/images/products/${product?.image}`}
          />
          <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
            <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">{product?.name}</h1>
            <p className="leading-relaxed">{product.description}</p>
            <p className="leading-relaxed font-semibold mt-3">
              {product.categories &&
                product.categories.map((categoryId) => getCategories(categoryId)).join(', ')}
            </p>

            <div className="flex">
              <span className="title-font font-medium text-2xl text-gray-900">
                {product.price} SAR
              </span>
              <button
                className="flex ml-auto text-white bg-[#32334A] hover:bg-[#3f415a] border-0 py-2 px-6 focus:outline-none rounded"
                onClick={handleAddToCart}>
                Add To Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
