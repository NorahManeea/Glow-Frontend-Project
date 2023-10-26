import React, { useEffect, useState } from 'react'
import AdminSideBar from './AdminSideBar'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../../redux/store'
import { categoryActions } from '../../redux/slices/categories/categorySlice'
import api from '../../api'

export default function CategoryTable() {
  const [category, setCategory] = useState("");
  const dispatch = useDispatch<AppDispatch>()
  const state = useSelector((state: RootState) => state)
  const categories = state.category.category

  useEffect(() => {
    handleGetProducts()
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCategory(e.target.value)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

  }

  const handleGetProducts = async () => {
    dispatch(categoryActions.categoryRequest())

    const res = await api.get('/mock/e-commerce/categories.json')
    dispatch(categoryActions.categorySuccess(res.data))
    console.log(res.data)
  }

  return (
    <div className="flex">
      <AdminSideBar />
      <div className="w-3/4 bg-white p-4">
        <div className=" rounded-lg overflow-hidden mx-4 md:mx-10">
          <div className="flex flex-1 items-center justify-center p-6">
            
            <div className="w-full max-w-lg">
              <form className="mt-5 sm:flex sm:items-center">
                <input
                  id="category"
                  name="category"
                  className="inline w-full rounded-md border border-gray-300 bg-white py-2 pl-3 pr-3 leading-5 placeholder-gray-500 focus:border-gray-500 focus:placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-500 sm:text-sm"
                  placeholder="Enter the category name"
                  type="text"
                />
                <button
                  className="mt-3 inline-flex items-center justify-center rounded-md border border-transparent bg-gray-500 px-4 py-2 font-medium text-white shadow-sm hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  Add Category
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
              {categories.map((item, index) => (
                <tr key={item.id}>
                  <td className="py-4 px-6 border-b border-gray-200">{index + 1}</td>
                  <td className="py-4 px-6 border-b border-gray-200">{item.name}</td>
                  <td className="py-4 px-6 border-b border-gray-200 whitespace">
                    <button className="mr-1 text-white bg-blue-600 rounded-md hover:bg-blue-500 focus:outline-none focus:shadow-outline-blue active:bg-blue-600 py-2 px-4 font-small">
                      Edit
                    </button>
                    <button
                      onClick={() =>
                        dispatch(categoryActions.removeCategory({ categoryId: item.id }))
                      }
                      className="text-white bg-red-600 rounded-md hover:bg-red-500 focus:outline-none focus:shadow-outline-blue active:bg-red-600 py-2 px-4 font-small">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
