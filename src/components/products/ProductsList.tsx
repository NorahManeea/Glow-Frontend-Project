import React, { useEffect } from 'react'
import {
  Product,
  productsRequest,
  productsSuccess,
  removeProduct,
  searchProduct
} from '../../redux/slices/products/productSlice'
import api from '../../api'
import { useSelector, useDispatch } from 'react-redux'
import { AppDispatch, RootState } from '../../redux/store'
import { Link } from 'react-router-dom'

export default function ProductsList() {
  const dispatch = useDispatch<AppDispatch>()
  const state = useSelector((state: RootState) => state)
  const products = state.products
  const searchText = state.products.searchText

  useEffect(() => {
    handleGetProducts()
  }, [])

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
  ? (products.items.filter(
      (product) => product.name.toLowerCase().includes(searchText.toLowerCase())
    ))
  : products.items;
  
  return (
    <div className=" w-full">
      {products.isLoading && <h3> Loading products...</h3>}
      <div className="card grid gap-4">
        <input placeholder='search' value ={searchText} onChange={handleSearch}/>
        <ul>
          <div className="mx-auto max-w-2xl lg:max-w-7xl">
            <h2 className="text-2xl font-bold tracking-tight text-gray-900">Products</h2>
            <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
              {filterProducts.map((product) => (
                <div key={product.id} className="group relative bg-gray-100 rounded-xl p-3">
                  <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-xl bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                    <img
                      src={product.image}
                      alt=""
                      className="h-full w-full object-cover object-center lg:h-full lg:w-full "
                    />
                  </div>
                  <div className="mt-4 flex justify-between">
                    <div>
                      <h3 className="text-sm text-gray-700">
                        <Link to={`/products/${product.id}`}>
                          <span aria-hidden="true" className="absolute inset-0" />
                          {product?.name}
                        </Link>
                      </h3>
                      <p className="mt-1 text-sm text-gray-500">{product.categories}</p>
                    </div>
                    <p className="text-sm font-medium text-gray-900">{}</p>
                    <button>
                      <Link to={`/products/${product.id}`}>Add To Cart</Link>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </ul>
      </div>
    </div>
  )
}
