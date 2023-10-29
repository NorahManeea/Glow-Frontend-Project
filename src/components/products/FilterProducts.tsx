import React, { ChangeEvent, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../redux/store'
import { categoryActions } from '../../redux/slices/categories/categorySlice'
import api from '../../api'
import { filterProducts } from '../../redux/slices/products/productSlice'
import { Category } from '../../types/types'

export default function FilterProducts() {
  const state = useSelector((state: RootState) => state)
  const categories = state.category.category

  const dispatch = useDispatch()
  const [selectedOptions, setSelectedOptions] = useState<string[]>([])
 
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
  //   Handle Options 
  const handleOptionChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const selectedCategory = event.target.value;
    setSelectedOptions([selectedCategory]);

    const categoryIDs = categories
      .filter((category) => category.name === selectedCategory)
      .map((category) => category.id);
    dispatch(filterProducts({ filterCriteria: categoryIDs }));
  };
  return (
    <div className="flex">
      <select
        id="sort"
        name="sort"
        onChange={handleOptionChange}
        className="w-full border-2 border-gray-300 focus:outline-none focus:border-primary-500 text-gray-900 rounded-md px-2 md:px-3 py-0 md:py-1 tracking-wider"
        style={{ marginLeft: '0.5rem' }}
      >
        <option value={0}>All Categories</option>
        {categories.map((option) => (
          <option key={option.id} value={option.name}>
            {option.name}
          </option>
        ))}
      </select>
    </div>
  )
}



