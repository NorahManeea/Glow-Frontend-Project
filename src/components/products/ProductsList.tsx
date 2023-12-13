import React, { ChangeEvent, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../../redux/store'
import { Link } from 'react-router-dom'
import { useFetchCategories } from '../../hooks/useDataFetching'
import { fetchProductsCountThunk, fetchProductsThunk } from '../../redux/slices/productSlice'

export default function ProductsList() {
  const dispatch = useDispatch<AppDispatch>()

  const categories = useSelector((state: RootState) => state.category.category)
  const { items, productCount } = useSelector((state: RootState) => state.products)

  //** States */
  const [searchText, setSearchText] = useState('')
  const [sortBy, setSortBy] = useState('')
  const [category, setCategory] = useState('')

  useFetchCategories()

  //** Handle Search Text */
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(event.target.value)
  }

  //** Handle Sort */
  const handleSortChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setSortBy(event.target.value)
  }
  //** Handle Filter By Category */
  const handleFilterChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setCategory(event.target.value)
  }

  //** Handle Pagination */
  const itemsPerPage = 8
  const totalPages = Math.ceil(productCount / itemsPerPage)

  const [currentPage, setCurrentPage] = useState(1)
  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentItems = items.slice(indexOfFirstItem, indexOfLastItem)

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber)
  }
  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => prevPage - 1)
  }

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1)
  }

  useEffect(() => {
    dispatch(fetchProductsThunk({ category, sortBy, currentPage, searchText }))
    dispatch(fetchProductsCountThunk())
  }, [currentPage, category, sortBy,searchText])
  return (
    <section className="text-gray-700 body-font overflow-hidden bg-white mx-auto gap-2">
      <div className="container px-5 py-24 mx-auto">
        <div className="lg:w-4/5 mx-auto flex gap-4">
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
              {/* SORT */}
              <div className="flex">
                <select
                  id="sort"
                  name="sort"
                  onChange={handleSortChange}
                  className="w-full border-2 border-gray-300 focus:outline-none focus:border-primary-500 text-gray-900 rounded-md px-2 md:px-3 py-0 md:py-1 tracking-wider"
                  style={{ marginLeft: '0.5rem' }}>
                  <option value="All" defaultValue="All">
                    All
                  </option>
                  <option value="newest">Newet</option>
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
                  className="w-full border-2 border-gray-300 focus:outline-none focus:border-primary-500 text-gray-900 rounded-md px-2 md:px-3 py-0 md:py-1 tracking-wider"
                  style={{ marginLeft: '0.5rem' }}>
                  <option value="All">All Categories</option>
                  {categories.map((option) => (
                    <option key={option._id} value={option.name}>
                      {option.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
              {currentItems.map((product) => (
                <div key={product._id} className="group relative bg-gray-100 rounded-xl p-3">
                  <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-xl bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                    {product.image && (
                      <img
                        src={product.image}
                        alt={product.name}
                        className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                      />
                    )}
                  </div>
                  <div className="mt-4 flex justify-between">
                    <div>
                      <Link to={`/products/${product._id}`}>
                        <span aria-hidden="true" className="absolute inset-0" />
                        {product.name}
                      </Link>
                      <p className="mt-1 text-sm text-gray-500">{product.price}</p>
                    </div>
                    <button>Add To Cart</button>
                  </div>
                </div>
              ))}
            </div>
            {totalPages > 1 && (
              <div className="flex justify-center mt-6">
                <button
                  onClick={handlePreviousPage}
                  disabled={currentPage === 1}
                  className="mx-1 px-2 py-1 rounded bg-gray-300/30 text-gray-700">
                  Previous
                </button>

                {Array.from({ length: totalPages }, (_, index) => {
                  const pageNumber = index + 1

                  return (
                    <button
                      key={pageNumber}
                      className={`mx-1 px-4 py-2 rounded ${
                        pageNumber === currentPage
                          ? 'bg-[#956556] text-white'
                          : 'bg-gray-300/30 text-gray-700'
                      }`}
                      onClick={() => handlePageChange(pageNumber)}>
                      {pageNumber}
                    </button>
                  )
                })}

                <button
                  onClick={handleNextPage}
                  disabled={currentPage === totalPages}
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
