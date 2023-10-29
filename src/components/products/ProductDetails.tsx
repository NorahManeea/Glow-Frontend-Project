import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'

import { useDispatch, useSelector } from 'react-redux'

import {
  addToCart,
  findProductById,
  productsRequest,
  productsSuccess
} from '../../redux/slices/products/productSlice'

import 'react-toastify/dist/ReactToastify.css'
import { toast } from 'react-toastify'
import api from '../../api'
import { categoryActions } from '../../redux/slices/categories/categorySlice'
import useProductState from '../../hooks/useProductState'
import useCategoryState from '../../hooks/useCategoryState'

export default function ProductDetails() {
  const { id } = useParams()
  const dispatch = useDispatch()

  const { product, isLoading } = useProductState()
  const { categories } = useCategoryState()
  const handleAddToCart = () => {
    dispatch(addToCart(product))
    return toast.success('Item added to cart')
  }
  const handleGetProducts = async () => {
    dispatch(productsRequest())
    const res = await api.get('/mock/e-commerce/products.json')
    dispatch(productsSuccess(res.data))
  }
  useEffect(() => {
    handleGetProducts().then(() => dispatch(findProductById(Number(id))))
    handleGetCategories()
    console.log
    window.scrollTo(0, 0)
  }, [])
  const handleGetCategories = async () => {
    dispatch(categoryActions.categoryRequest())

    const res = await api.get('/mock/e-commerce/categories.json')
    dispatch(categoryActions.categorySuccess(res.data))
    console.log(res.data)
  }
  const getCategories = (categoryId: number) => {
    const category = categories.find((category) => category.id === categoryId)
    return category ? category.name : 'Category Not Found'
  }

  return (
    <section className="text-gray-700 body-font overflow-hidden bg-white mx-auto">
      <div className="container px-5 py-24 mx-auto">
        {isLoading && <h3> Loading products...</h3>}

        <div className="lg:w-4/5 mx-auto flex flex-wrap">
          <img
            alt={product.name}
            className="lg:w-1/2 w-full object-cover object-center rounded border border-gray-200"
            src={product?.image}
          />
          <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
            <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">{product?.name}</h1>
            <p className="leading-relaxed">{product.description}</p>
            <p className="leading-relaxed">
              {product.categories &&
                product.categories.map((categoryId) => getCategories(categoryId)).join(', ')}
            </p>
            <div className="flex mt-6 items-center pb-5 border-b-2 border-gray-200 mb-5">
              <div className="flex items-center">
                <span className="mr-3">Variants</span>
                <div className="relative">
                  <select className="rounded border appearance-none border-gray-400 py-2 focus:outline-none focus:border-gray-500 text-base pl-3 pr-10">
                    <option disabled value="Select">
                      Select A variants
                    </option>
                  </select>
                  <span className="absolute right-0 top-0 h-full w-10 text-center text-gray-600 pointer-events-none flex items-center justify-center">
                    <svg
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      className="w-4 h-4"
                      viewBox="0 0 24 24">
                      <path d="M6 9l6 6 6-6" />
                    </svg>
                  </span>
                </div>
              </div>
            </div>
            <div className="flex">
              <span className="title-font font-medium text-2xl text-gray-900">
                {product.price}$
              </span>
              <button
                className="flex ml-auto text-white bg-gray-500 border-0 py-2 px-6 focus:outline-none hover:bg-gray-600 rounded"
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
