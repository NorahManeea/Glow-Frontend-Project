import React, { ChangeEvent, useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { toast } from 'react-toastify'
//** Redux */
import { useDispatch } from 'react-redux'
import { AppDispatch } from '../../redux/store'
import { fetchProductsCountThunk, fetchProductsThunk } from '../../redux/slices/productSlice'
import { fetchCategoriesThunk } from '../../redux/slices/categorySlice'
import { addToWishlistThunk } from '../../redux/slices/wishlistSlice'
//** Custom Hooks */
import useProductState from '../../hooks/useProductState'
import useCategoryState from '../../hooks/useCategoryState'

export default function ProductsList() {
  const dispatch = useDispatch<AppDispatch>()

  const { categories } = useCategoryState()

  const { products, totalPages } = useProductState()
  const currentItems = products

  //** States */
  const [queryParam, setQueryParam] = useSearchParams()
  const [searchText, setSearchText] = useState('')
  const [sortBy, setSortBy] = useState('')
  const [category, setCategory] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [wishlistStatus, setWishlistStatus] = useState<{ [productId: string]: boolean }>({})

  //**  Search Handler */
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(event.target.value)
  }

  //**  Sort Handler */
  const handleSortChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setSortBy(event.target.value)
    setCurrentPage(1)
  }
  //** Filter By Category Handler */
  const handleFilterChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = event.target.value
    if (selectedValue === 'All') {
      setCategory('')
    } else {
      setCategory(selectedValue)
    }
    setCurrentPage(1)
  }

  //** Pagination Handler */
  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    setQueryParam(page.toString())
  }

  //** WishList Handler */
  const handleAddToWishlist = (productId: string) => {
    dispatch(addToWishlistThunk(productId)).then((res) => {
      if (res.meta.requestStatus === 'fulfilled') {
        const message = res.payload.message
        toast.success(message)
        setWishlistStatus((prevStatus) => ({
          ...prevStatus,
          [productId]: true
        }))
      }
    })
  }

  useEffect(() => {
    Promise.all([
      dispatch(fetchProductsThunk({ category, sortBy, currentPage, searchText })),
      dispatch(fetchCategoriesThunk()),
      dispatch(fetchProductsCountThunk())
    ])

    window.scrollTo(0, 0)
  }, [currentPage, category, sortBy, searchText, dispatch])

  return (
    <section className="text-gray-700 body-font overflow-hidden bg-white mx-auto gap-2">
      <div className="container px-5 py-24 mx-auto">
        <div className="lg:w-4/5 mx-auto flex gap-4">
          <div className="flex-grow">
            <h2 className="text-2xl font-bold tracking-tight text-gray-900 mb-4">Products</h2>
            <div className="flex flex-col md:flex-row gap-3">
              {/* SEARCH */}
              <div className="flex-grow">
                <input
                  type="search"
                  placeholder="Search for products"
                  className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 w-full shrink-0"
                  value={searchText}
                  onChange={handleSearch}
                />
              </div>
              {/* SORT */}
              <div className="flex">
                <select
                  id="sort"
                  name="sort"
                  onChange={handleSortChange}
                  className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 shrink-0"
                  style={{ marginLeft: '0.5rem' }}
                  value={sortBy}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={20}
                    height={20}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-4 h-4 mr-2"></svg>
                  <option value="All">All</option>
                  <option value="newest">Newest</option>
                  <option value="highestPrice">Highest Price</option>
                  <option value="lowestPrice">Lowest Price</option>
                </select>
              </div>

              {/* FILTER BY CATEGORY */}
              <div className="flex">
                <select
                  id="sort"
                  name="sort"
                  onChange={handleFilterChange}
                  className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 shrink-0"
                  style={{ marginLeft: '0.5rem' }}>
                  <option value="All">All Categories</option>
                  {categories.map((option) => (
                    <option key={option._id} value={option._id}>
                      {option.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            {/*  PRODUCTS LIST */}
            <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
              {currentItems.length === 0 ? (
                <div className="bg-white px-6 py-24 sm:py-32 lg:px-8">
                  <div className="text-center">
                    <h1 className="mt-4 text-3xl font-bold tracking-tight text-[#32334A] sm:text-5xl">
                      Nothing Matches Your Search
                    </h1>
                    <p className="mt-6 text-base leading-7 text-gray-600">
              
                      No products found with the given search criteria.
                    </p>
                    <div className="mt-10 flex items-center justify-center gap-x-6">
         
                      No products found with the given search criteria.
                    </div>
                  </div>
                </div>
              ) : (
                currentItems.map((product) => (
                  <div key={product._id} className="group relative bg-gray-100 rounded-xl p-3">
                    <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-xl bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                      />
                    </div>

                    {product.quantityInStock === 0 && (
                      <span className="absolute top-2 right-2 bg-red-100 text-red-600 text-xs px-2 py-1">
                        Out Of Stock
                      </span>
                    )}

                    <div className="mt-4 flex justify-between">
                      <div>
                        <Link to={`/products/${product._id}`}>
                          <span aria-hidden="true" className="absolute inset-0" />
                          {product?.name}
                        </Link>
                        <p className="mt-1 text-sm text-gray-500">{product.price} SAR</p>
                      </div>
                      {/* WISHLIST */}
                      <div className="mt-4 flex justify-between">
                        <div className="flex items-center gap-1">
                          <div
                            className={`relative border-2 border-transparent p-1 rounded-full bg-white`}>
                            <svg
                              className={`h-6 w-6 cursor-pointer ${
                                wishlistStatus[product._id]
                                  ? 'text-gray-500 fill-current'
                                  : 'text-gray-500'
                              }`}
                              fill={wishlistStatus[product._id] ? 'currentColor' : 'none'}
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              viewBox="0 0 24 24"
                              stroke={'currentColor'}
                              onClick={() => handleAddToWishlist(product._id)}>
                              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"></path>
                            </svg>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* PAGINATION */}
            {totalPages > 1 && (
              <div className="flex justify-center mt-6">
                <button
                  disabled={currentPage === 1}
                  className="mx-1 px-2 py-1 rounded bg-gray-300/30 text-gray-700">
                  Previous
                </button>

                {Array.from({ length: totalPages }, (_, index) => {
                  const pageNumber = index + 1

                  return (
                    <button
                      key={pageNumber}
                      onClick={() => handlePageChange(pageNumber)}
                      className={`mx-1 px-4 py-2 rounded ${
                        pageNumber === currentPage
                          ? 'bg-[#956556] text-white'
                          : 'bg-gray-300/30 text-gray-700'
                      }`}>
                      {pageNumber}
                    </button>
                  )
                })}

                <button
                  disabled={currentPage === totalPages}
                  onClick={() => handlePageChange(currentPage + 1)}
                  className="mx-1 px-2 py-1 rounded bg-gray-300/30 text-gray-700">
                  Next
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
