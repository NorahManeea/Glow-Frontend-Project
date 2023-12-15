import { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import { Category, CategoryModalProps } from '../../types/types'

export default function CategoryModal({
  selectedCategory,
  openModal,
  onSubmit
}: CategoryModalProps) {
  //** States */
  const [category, setCategory] = useState<Category>(selectedCategory ?? { _id: '', name: '' })

  useEffect(() => {
    if (selectedCategory) {
      setCategory(selectedCategory)
    } else {
      setCategory({ _id: '', name: '' })
    }
  }, [selectedCategory])

  //**Input Change Handler */
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setCategory((prevCategory) => ({ ...prevCategory, [name]: value }))
  }

  //** Submit */
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSubmit(category);
  };
  

  return (
    <div className="fixed inset-0 overflow-y-auto">
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity">
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>
        <span className="hidden sm:inline-block sm:align-middle sm:h-screen"></span>
        <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
          <form onSubmit={handleSubmit}>
            <div>
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                {selectedCategory ? 'Edit Category' : 'Add Category'}
              </h3>
              <div className="mt-2">
                <input
                  id="category"
                  name="name"
                  className="w-full rounded-md border border-gray-300 bg-white py-2 pl-3 pr-3 leading-5 placeholder-gray-500 focus:border-gray-500 focus:placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-500 sm:text-sm"
                  placeholder="Enter the category name"
                  type="text"
                  value={category.name}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="mt-5 sm:mt-6">
              <button
                type="submit"
                className="inline-flex items-center justify-center w-full rounded-md border border-transparent bg-[#32334A] hover:bg-[#3f415a] px-4 py-2 font-medium text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 sm:w-auto sm:text-sm">
                {selectedCategory ? 'Edit Category' : 'Add Category'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
