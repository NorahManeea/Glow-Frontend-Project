import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../redux/store'
import { categoryActions } from '../../redux/slices/categories/categorySlice'
import api from '../../api'
import { filterProducts } from '../../redux/slices/products/productSlice'

export default function FilterProducts() {
  const state = useSelector((state: RootState) => state)
  const categories = state.category.category

  const dispatch = useDispatch()
  const [selectedOptions, setSelectedOptions] = useState<string[]>([])
  const [showOptions, setShowOptions] = useState(false)

  const handleOptionsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = event.target
    if (checked) {
      setSelectedOptions((prevOptions) => [...prevOptions, value])
    } else {
      setSelectedOptions((prevOptions) => prevOptions.filter((option) => option !== value))
    }
  }

  const toggleOptions = () => {
    setShowOptions((prevShowOptions) => !prevShowOptions)
  }

  useEffect(() => {
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

  const filterProductsByCategory = () => {
    const categoryIDs = categories
      .filter((category) => selectedOptions.includes(category.name))
      .map((category) => category.id)

    dispatch(filterProducts({ filterCriteria: categoryIDs }))
  }

  return (
    <div className="relative z-10">
      <button
        onClick={toggleOptions}
        className="w-full border-2 border-gray-300 focus:outline-none focus:border-primary-500 text-gray-900 rounded-md px-2 md:px-3 py-0 md:py-1 tracking-wider">
        Select Options
      </button>
      {showOptions && (
        <div className="absolute right-0 w-full mt-2 py-2 bg-white rounded-md shadow-lg">
          {categories.map((option) => (
            <label key={option.id} className="flex items-center space-x-2 px-4 py-2 cursor-pointer">
              <input
                type="checkbox"
                value={option.name}
                checked={selectedOptions.includes(option.name)}
                onChange={handleOptionsChange}
                className="form-checkbox h-5 w-5 text-primary-500"
              />
              <span>{option.name}</span>
            </label>
          ))}
        </div>
      )}
      <button
        onClick={filterProductsByCategory}
        className="mt-4 bg-primary-500 text-white px-4 py-2 rounded-md">
        Apply Filter
      </button>
    </div>
  )
}
