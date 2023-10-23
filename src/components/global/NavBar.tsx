import React from 'react'
import { Link } from 'react-router-dom'

export default function NavBar() {
  return (
    <nav className="bg-gray-500 h-10">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="space-x-4 text-center pt-1">
          <Link
            to="/"
            className=" text-white rounded-md py-2 text-sm font-medium"
            aria-current="page">
            Home
          </Link>
          <Link
            to="/products"
            className="text-gray-300 hover:text-white  px-3 py-2 text-sm font-medium">
            Products
          </Link>
          <Link to="/about" className="text-gray-300 hover:text-white  py-2 text-sm font-medium">
            About
          </Link>
          <Link to="/contact" className="text-gray-300 hover:text-white  py-2 text-sm font-medium">
            Contact Us
          </Link>
        </div>
      </div>
    </nav>
  )
}
