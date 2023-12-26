import { ChangeEvent, FormEvent, useEffect, useState } from 'react'
//** Redux */
import { useDispatch } from 'react-redux'
import { AppDispatch } from '../../../redux/store'
import { createCategoryThunk, updateCategoryThunk } from '../../../redux/slices/categorySlice'
//** Types */
import { Category, CategoryModalProps } from '../../../types/types'

const initialCategoryState: Category = {
  _id: '',
  name: '',
  createdAt: new Date()
}

export default function CategoryModal(prop: CategoryModalProps) {
  const dispatch = useDispatch<AppDispatch>()
  //** States */
  const [category, setCategory] = useState<Category>(initialCategoryState)

  //** Close Modal Handler */
  const handleCloseModal = () => {
    prop.setIsModalOpen(false)
  }
  //** Input Change Handler */
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setCategory((prevCategory) => ({ ...prevCategory, [name]: value }))
  }
  //** Submit Handler */
  const onSubmitHandler = (e: FormEvent) => {
    e.preventDefault()
    if (prop.selectedCategory && prop.selectedCategory._id) {
      dispatch(updateCategoryThunk(category))
    } else {
      dispatch(createCategoryThunk({ name: category.name }))
    }
    setCategory(initialCategoryState)
    prop.setIsModalOpen(false)
  }

  useEffect(() => {
    if (prop.selectedCategory) {
      setCategory(prop.selectedCategory)
    } else {
      setCategory(initialCategoryState)
    }
  }, [])

  return (
    <div className="fixed inset-0 overflow-y-auto">
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity">
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>
        <span className="hidden sm:inline-block sm:align-middle sm:h-screen"></span>
        <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
          <div className="flex justify-end">
            <button className="text-gray-500 p-2" onClick={handleCloseModal}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <form onSubmit={onSubmitHandler}>
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              {prop.selectedCategory ? 'Edit Category' : 'Add Category'}
            </h3>
            <div>
              <div className="mt-2">
                <label
                  htmlFor="categoryName"
                  className="block text-sm font-medium leading-6 text-gray-900">
                  Category Name
                </label>
                <input
                  id="category"
                  name="name"
                  className="w-full rounded-md border border-gray-300 bg-white py-2 pl-3 pr-3 leading-5 placeholder-gray-500 focus:border-gray-500 focus:placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-500 sm:text-sm"
                  type="text"
                  value={category.name}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className="mt-6 flex items-center justify-end gap-x-6">
              <button
                type="submit"
                className="inline-flex items-center justify-center w-full rounded-md border border-transparent bg-[#32334A] hover:bg-[#3f415a] px-4 py-2 font-medium text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 sm:w-auto sm:text-sm">
                {prop.selectedCategory ? 'Edit Category' : 'Add Category'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
