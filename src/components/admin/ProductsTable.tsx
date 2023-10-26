import React, { useEffect } from 'react'
import { AppDispatch, RootState } from '../../redux/store'
import { useDispatch, useSelector } from 'react-redux'
import { productsRequest, productsSuccess, removeProduct } from '../../redux/slices/products/productSlice'
import api from '../../api'
import AdminSideBar from './AdminSideBar'
import { Link } from 'react-router-dom'

export default function ProductsTable() {
    const dispatch = useDispatch<AppDispatch>()
    const state = useSelector((state: RootState) => state)
    const products = state.products.items
  
    useEffect(() => {
      handleGetProducts()
    }, [])
  
    const handleGetProducts = async () => {
      dispatch(productsRequest())
  
      const res = await api.get('/mock/e-commerce/products.json')
      dispatch(productsSuccess(res.data))
      console.log(res.data)
    }
  return (
    <div className="flex">
    <AdminSideBar />
    <div className="w-3/4 bg-white p-4">
      <div className=" rounded-lg overflow-hidden mx-4 md:mx-10">
      <div className="mb-4 flex items-center justify-between gap-8">
        <div className="flex items-center gap-12">
          <h2 className="text-2xl font-bold text-gray-800 lg:text-3xl">Products</h2>
         
        </div>
        <Link to="/admin-dashboard/new-product" className="inline-block rounded-lg border bg-gray-500  px-4 py-2 text-center text-sm text-white outline-none transition duration-100 hover:bg-gray-400 focus-visible:ring active:bg-gray-400 md:px-8 md:py-3 md:text-base">
          Add new products
        </Link>
      </div>

        <table className="w-full table-fixed border">
          <thead>
            <tr className="bg-gray-100">
              <th className="w-1/7 py-4 px-6 text-left text-gray-600 font-bold">
                Count
              </th>
              <th className="w-1/5 py-4 px-6 text-left text-gray-600 font-bold">
                Image
              </th>
              <th className="w-1/5 py-4 px-6 text-left text-gray-600 font-bold">
                Name
              </th>
              <th className="w-1/4 py-4 px-6 text-left text-gray-600 font-bold">
                Description
              </th>
              <th className="w-1/4 py-4 px-6 text-left text-gray-600 font-bold">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {products.map((item, index) => (
              <tr key={item.id}>
                <td className="py-4 px-6 border-b border-gray-200">{index + 1}</td>
                <td className="py-4 px-6 border-b border-gray-200"><img src={item.image} width={100} /></td>
                <td className="py-4 px-6 border-b border-gray-200">{item.name}</td>
                <td className="py-4 px-6 border-b border-gray-200">{item.description}</td>


                <td className="py-4 px-6 border-b border-gray-200 whitespace">
                 
                  <button onClick={()=> dispatch(removeProduct({ productId: item.id }))} className="text-white bg-red-600 rounded-md hover:bg-red-500 focus:outline-none focus:shadow-outline-blue active:bg-red-600 py-2 px-4 font-small">
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
