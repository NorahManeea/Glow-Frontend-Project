import React, { ChangeEvent } from 'react'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '../../redux/store'
import { sortProducts } from '../../redux/slices/products/productSlice'

export default function SortProducts() {
  const dispatch = useDispatch<AppDispatch>()

  const handleOptionChange = (event: ChangeEvent<HTMLSelectElement>) => {
    dispatch(sortProducts(event.target.value))
  }
  return (
    <div className="flex">
      <select
        id="sort"
        name="sort"
        onChange={handleOptionChange}
        className="w-full border-2 border-gray-300 focus:outline-none focus:border-primary-500 text-gray-900 rounded-md px-2 md:px-3 py-0 md:py-1 tracking-wider"
        style={{ marginLeft: '0.5rem' }}>
        <option value="All" defaultValue="All">
          All
        </option>
        <option value="price">Price</option>
        <option value="name">Name</option>
      </select>
    </div>
  )
}
