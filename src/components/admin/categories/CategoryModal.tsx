import { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import { Category, CategoryModalProps } from '../../../types/types'
//** Redux */
import { useDispatch } from 'react-redux'
import { AppDispatch } from '../../../redux/store'
import { createCategoryThunk, updateCategoryThunk } from '../../../redux/slices/categorySlice'

const initialCategoryState: Category = {
  _id: '',
  name: ''
}

export default function CategoryModal(prop: CategoryModalProps) {
  const dispatch = useDispatch<AppDispatch>()
  //** States */
  const [category, setCategory] = useState<Category>(initialCategoryState)

  useEffect(() => {
    if (prop.selectedCategory) {
      setCategory(prop.selectedCategory)
    } else {
      setCategory(initialCategoryState)
    }
  }, [])

  //**Input Change Handler */
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

  return (
    <div className="fixed inset-0 overflow-y-auto">
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity">
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>
        <span className="hidden sm:inline-block sm:align-middle sm:h-screen"></span>
        <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
          <form onSubmit={onSubmitHandler}>
            <div>
              <div className="mt-2">
                <input
                  id="category"
                  name="name"
                  className="w-full rounded-md border border-gray-300 bg-white py-2 pl-3 pr-3 leading-5 placeholder-gray-500 focus:border-gray-500 focus:placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-500 sm:text-sm"
                  placeholder="Enter the category name"
                  type="text"
                  value={category.name}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className="mt-5 sm:mt-6">
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
