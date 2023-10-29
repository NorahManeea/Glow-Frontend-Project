import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import AdminSideBar from './AdminSideBar'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../../redux/store'
import { categoryActions } from '../../redux/slices/categories/categorySlice'
import api from '../../api'
import { Category } from '../../types/types'
import useCategoryState from '../../hooks/useCategoryState'

export default function CategoryTable() {
  const dispatch = useDispatch<AppDispatch>()
  const {categories, isLoading, error} = useCategoryState()


  const [category, setCategory] = useState({ name: '' })
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null)

  useEffect(() => {
    handleGetCategories()
  }, [])

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCategory((prevCategory) => ({
      ...prevCategory, [name]: value 
    }))
  }

  const handleAddSubmit = (e: FormEvent) => {
    e.preventDefault()

    if (selectedCategory && selectedCategory.id) {
      const updatedCategory = { ...selectedCategory, name: category.name }
      dispatch(categoryActions.editCategory({ editCategory: updatedCategory }))
    } else {
      const newCategory = { id: new Date().getTime(), ...category }
      dispatch(categoryActions.addCategory({ category: newCategory }))
    }

    // Reset the form
    setCategory({ name: '' })
    setSelectedCategory(null)
  }

  const handleGetCategories = async () => {
    dispatch(categoryActions.categoryRequest())

    const res = await api.get('/mock/e-commerce/categories.json')
    dispatch(categoryActions.categorySuccess(res.data))
  }

  return (
    <div className="flex">
      <AdminSideBar />
      <div className="w-3/4 bg-white p-4">
        <div className=" rounded-lg overflow-hidden mx-4 md:mx-10">
          {isLoading && <h3> Loading categories...</h3>}
          
          <div className="flex flex-1 items-center justify-center p-6">
            <div className="w-full max-w-lg">
              <form className="mt-5 sm:flex sm:items-center" onSubmit={handleAddSubmit}>
              <div className="mr-2">
                  <input
                    type="text"
                    name="name"
                    id="name"
                    value={selectedCategory ? selectedCategory.name : category.name}
                    onChange={handleChange}
                    className="w-full rounded-md border border-gray-300 bg-white py-2 pl-3 pr-3 leading-5 placeholder-gray-500 focus:border-gray-500 focus:placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-500 sm:text-sm"
                    placeholder="Product Name"
                  />
                </div>

                <button
                  className="mt-3 inline-flex items-center justify-center rounded-md border border-transparent bg-gray-500 px-4 py-2 font-medium text-white shadow-sm hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {selectedCategory ? 'Edit Category' : 'Add Category'}
                </button>
              </form>
            </div>
          </div>

          <table className="w-full table-fixed border">
            <thead>
              <tr className="bg-gray-100">
                <th className="w-1/4 py-4 px-6 text-left text-gray-600 font-bold">Count</th>
                <th className="w-1/4 py-4 px-6 text-left text-gray-600 font-bold">Category Name</th>
                <th className="w-1/4 py-4 px-6 text-left text-gray-600 font-bold">Action</th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {categories.map((item, index) => {
                const { id, name } = item
                const isEditing = selectedCategory && selectedCategory.id === id

                return (
                  <tr key={id}>
                    <td className="py-4 px-6 border-b border-gray-200">{index + 1}</td>
                    <td className="py-4 px-6 border-b border-gray-200">{name}</td>
                    <td className="py-4 px-6 border-b border-gray-200 whitespace">
                      <button
                        className="mr-1 text-white bg-blue-600 rounded-md hover:bg-blue-500 focus:outline-none focus:shadow-outline-blue active:bg-blue-600 py-2 px-4 font-small"
                        onClick={() => setSelectedCategory(item)}>
                        Edit
                      </button>
                      <button
                        className="text-white bg-red-600 rounded-md hover:bg-red-500 focus:outline-none focus:shadow-outline-blue active:bg-red-600 py-2 px-4 font-small"
                        onClick={() =>
                          dispatch(categoryActions.removeCategory({ categoryId: id }))
                        }>
                        Delete
                      </button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
