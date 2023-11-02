import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import AdminSideBar from './AdminSideBar'
import { useDispatch } from 'react-redux'
import { categoryActions } from '../../redux/slices/categories/categorySlice'
import { Category, Product } from '../../types/types'
import useCategoryState from '../../hooks/useCategoryState'
import swal from 'sweetalert'
import Edit2LineIcon from 'remixicon-react/Edit2LineIcon'
import DeleteBinLineIcon from 'remixicon-react/DeleteBinLineIcon'
import { toast } from 'react-toastify'
import { useFetchCategories } from '../../hooks/useDataFetching'

export default function CategoryTable() {
  const { categories, isLoading } = useCategoryState()
  useFetchCategories()

  const dispatch = useDispatch()

  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null)
  const [category, setCategory] = useState({ name: '' })



  useEffect(() => {
    if (selectedCategory) {
      setCategory({ name: selectedCategory.name })
    } else {
      setCategory({ name: '' })
    }
  }, [selectedCategory])

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCategory((prevCategory) => {
      return { ...prevCategory, [e.target.name]: e.target.value }
    })
  }

  const handleAddSubmit = (e: FormEvent) => {
    e.preventDefault()

    if (selectedCategory) {
      const updatedCategory = { ...selectedCategory, name: category.name }
      dispatch(categoryActions.editCategory({ editCategory: updatedCategory }))
       toast.success("Item edited successfully")
    } else {
      const newCategory = { id: new Date().getTime(), ...category }
      dispatch(categoryActions.addCategory({ category: newCategory }))
      toast.success('Item added successfully')

    }
    setCategory({ name: '' })
    setSelectedCategory(null)
  }

  const handleEditBtnClick = (item: Category) => {
    setSelectedCategory(item)
  }

  const handleDeleteBtnClick = (id: number) => {
    swal({
      title: 'Delete',
      text: 'Are you sure you want to delete?',
      icon: 'warning',
      dangerMode: true,
      buttons: ['Cancel', 'Delete']
    }).then((isOk) => {
      if (isOk) {
        dispatch(categoryActions.removeCategory({ categoryId: id }))
        return toast.success("Item deleted successfully")

      }
    })
  }

  return (
    <div className="flex">
      <AdminSideBar />
      <div className="w-3/4 bg-white p-4">
      {isLoading && <h3> Loading categories...</h3>}
          <div className="flex flex-1 items-center justify-center p-6">
            <div className="w-full max-w-lg">
              <form className="mt-5 sm:flex sm:items-center" onSubmit={handleAddSubmit}>
                <input
                  id="category"
                  name="name"
                  className="inline w-full rounded-md border border-gray-300 bg-white py-2 pl-3 pr-3 leading-5 placeholder-gray-500 focus:border-gray-500 focus:placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-500 sm:text-sm"
                  placeholder="Enter the category name"
                  type="text"
                  value={category.name}
                  onChange={handleChange}
                />

                <button
                  className="mt-3 inline-flex items-center justify-center rounded-md border border-transparent bg-[#32334A] hover:bg-[#3f415a] px-4 py-2 font-medium text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {selectedCategory ? 'Edit Category' : 'Add Category'}
                </button>
              </form>
            </div>
          </div>

          <table className="w-full table-fixed border">
            <thead>
              <tr className="bg-[#F7F7F7]">
                <th className="w-1/4 py-4 px-6 text-left text-gray-600 font-bold">ID</th>
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
                        className="mr-1 text-blue-600 bg-blue-500/10 p-3 rounded-full"
                        onClick={() => handleEditBtnClick(item)}>
                        <Edit2LineIcon />
                      </button>
                      <button
                        className="text-red-600 bg-red-500/10 p-3 rounded-full"
                        onClick={() => handleDeleteBtnClick(id)}>
                        <DeleteBinLineIcon />
                      </button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
      </div>
    </div>
  )
}
