import React from 'react'
import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="bg-black mx-auto w-full max-w-container px-4 sm:px-6 lg:px-8">
      <div className="border-t border-slate-900/5 py-10">
        <h4 className="text-gray-400 text-center">E-Commerce</h4>
        <p className="mt-5 text-center text-sm leading-6 text-slate-500">
          © 2023 E-commerce. All rights reserved.
        </p>
        <div className="mt-8 flex items-center justify-center space-x-4 text-sm font-semibold leading-6 text-slate-700">
          <Link to="/contact">Contact Us</Link>
          <div className="h-4 w-px bg-slate-500/20"></div>
          <Link to="/about">About Us</Link>
        </div>
      </div>
    </footer>
  )
}
