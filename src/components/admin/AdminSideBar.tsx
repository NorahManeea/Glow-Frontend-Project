import React from 'react'

import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { RootState } from '../../redux/store'
import DashboardLineIcon from 'remixicon-react/DashboardLineIcon';
import useUserState from '../../hooks/useUserState';


export default function AdminSideBar() {

  const {userData} = useUserState()
  return (
    <div className="w-1/5 h-screen bg-gray-200 sticky top-0 p-4">
      <h2 className="text-lg font-bold mb-4">Hello {userData?.firstName}</h2>
      <ul className="list-none">
        <li className="mb-2">
          <Link to="/admin-dashboard/categories" className="text-gray-700 hover:text-gray-900">
            Category
          </Link>
        </li>
        <li className="mb-2">
          <Link to="/admin-dashboard/products" className="text-gray-700 hover:text-gray-900">
            Products
          </Link>
        </li>
        <li className="mb-2">
          <Link to="/admin-dashboard/users" className="text-gray-700 hover:text-gray-900">
            Users
          </Link>
        </li>
        <li className="mb-2">
          <Link to="/admin-dashboard/orders" className="text-gray-700 hover:text-gray-900">
            Orders
          </Link>
        </li>
      </ul>
    </div>
  )
}