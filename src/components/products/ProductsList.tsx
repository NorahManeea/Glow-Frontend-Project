import React, { useEffect, useState } from 'react'

import {
  addToCart,
  productsRequest,
  productsSuccess,
  searchProduct
} from '../../redux/slices/products/productSlice'
import api from '../../api'
import { useSelector, useDispatch } from 'react-redux'
import { AppDispatch, RootState } from '../../redux/store'
import { Link } from 'react-router-dom'

import SortProducts from './SortProducts'
import FilterProducts from './FilterProducts'
import useProductState from '../../hooks/useProductState'

export default function ProductsList() {
  const dispatch = useDispatch<AppDispatch>()

  const {products, searchText, product} = useProductState()
  

  useEffect(() => {
    handleGetProducts()
  }, [])
  
  const handleAddToCart = () => {
    dispatch(addToCart(product))
  }

  const handleGetProducts = async () => {
    dispatch(productsRequest())

    const res = await api.get('/mock/e-commerce/products.json')
    dispatch(productsSuccess(res.data))
  }
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(searchProduct(event.target.value))
    console.log(event.target.value)
  }
  const filterProducts = searchText
    ? products.filter((product) =>
        product.name.toLowerCase().includes(searchText.toLowerCase())
      )
    : products

  return (
    <section className="text-gray-700 body-font overflow-hidden bg-white mx-auto gap-2">
      <div className="container px-5 py-24 mx-auto">
        <div className="lg:w-4/5 mx-auto flex gap-4 ">
          <div className="flex-grow">
            <h2 className="text-2xl font-bold tracking-tight text-gray-900 mb-4">Products</h2>

            <div className="flex flex-col md:flex-row gap-3">
              <div className="flex-grow">
                <input
                  type="text"
                  placeholder="Search for products"
                  className="rounded-md p-3 w-full block text-sm text-gray-900 bg-gray-50 border border-gray-300 focus:ring-gray-500 focus:border-gray-500 placeholder-gray-600"
                  value={searchText}
                  onChange={handleSearch}
                />
              </div>
              <SortProducts />
              <FilterProducts/> 
            </div>

            <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
              {filterProducts.map((product) => (
                <div key={product.id} className="group relative bg-gray-100 rounded-xl p-3">
                  <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-xl bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                    <img
                      src={product.image}
                      alt=""
                      className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                    />
                  </div>
                  <div className="mt-4 flex justify-between">
                    <div>
                      <Link to={`/products/${product.id}`}>
                        <span aria-hidden="true" className="absolute inset-0" />
                        {product?.name}
                      </Link>
                      <p className="mt-1 text-sm text-gray-500">{product.price}</p>
                    </div>
                    <button onClick={handleAddToCart}>Add To Cart</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
