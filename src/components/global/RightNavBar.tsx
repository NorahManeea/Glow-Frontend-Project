import React from 'react'
import { Link } from 'react-router-dom'

export default function RightNavBar() {
  return (
    <div className="flex ">
    <div className="flex flex-shrink-0 items-center">
      <Link to="/">
      <p className='text-white'></p>
      </Link>
    </div>
  </div>
  )
}
