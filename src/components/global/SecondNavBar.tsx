import React, { useState } from 'react'
import { Link } from 'react-router-dom'

export default function SecondNavBar() {
  const [activeLink, setActiveLink] = useState('home');

  return (
        <nav className="bg-[#956556] h-10">
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="space-x-4 text-center pt-1">
              <Link
                to="/"
                className={`${
                  activeLink === 'home' ? 'text-white' : 'text-gray-300 hover:text-white'
                } rounded-md py-2 text-sm font-medium`}
                onClick={() => setActiveLink('home')}
              >
                Home
              </Link>
              <Link
                to="/products"
                className={`${
                  activeLink === 'products' ? 'text-white' : 'text-gray-300 hover:text-white'
                } px-3 py-2 text-sm font-medium`}
                onClick={() => setActiveLink('products')}
              >
                Products
              </Link>
              <Link
                to="/about"
                className={`${
                  activeLink === 'about' ? 'text-white' : 'text-gray-300 hover:text-white'
                } py-2 text-sm font-medium`}
                onClick={() => setActiveLink('about')}
              >
                About
              </Link>
              <Link
                to="/contact"
                className={`${
                  activeLink === 'contact' ? 'text-white' : 'text-gray-300 hover:text-white'
                } py-2 text-sm font-medium`}
                onClick={() => setActiveLink('contact')}
              >
                Contact Us
              </Link>
            </div>
          </div>
        </nav>
      )
}
