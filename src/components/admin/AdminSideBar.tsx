import React, { useState } from 'react'

import { Link } from 'react-router-dom'
import useUserState from '../../hooks/useUserState'

export default function AdminSideBar() {
  const { userData } = useUserState()

  return (
<div className="w-1/6 h-screen bg-[#F7F7F7] sticky top-0 p-4">
  <h2 className="text-lg font-bold mb-4 text-[#32334A]">Hello {userData?.firstName}</h2>
  <ul className="list-none">
    <li className="mb-2 rounded-md py-1 hover:bg-[#d2cece] border-b border-gray-200">
      <Link to="/admin-dashboard" className="text-gray-700 hover:text-gray-900 p-2">
        Products
      </Link>
    </li>
    <li className="mb-2 rounded-md py-1 hover:bg-[#d2cece] border-b border-gray-200">
      <Link to="/admin-dashboard/categories" className="text-gray-700 hover:text-gray-900 p-2">
        Category
      </Link>
    </li>

    <li className="mb-2 rounded-md py-1 hover:bg-[#d2cece] border-b border-gray-200">
      <Link to="/admin-dashboard/users" className="text-gray-700 hover:text-gray-900 p-2">
        Users
      </Link>
    </li>
    <li className="mb-2 rounded-md py-1 hover:bg-[#d2cece] border-b border-gray-200">
      <Link to="/admin-dashboard/orders" className="text-gray-700 hover:text-gray-900 p-2">
        Orders
      </Link>
    </li>
  </ul>
</div>
  )
}
