import React from 'react'

// Components
import ProductsList from '../../components/products/ProductsList'
import { Link } from 'react-router-dom'

export default function HomePage() {
  return (
    <div>
      {/* Hero Section */}
      <div className="relative h-screen text-white overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80&w=3200&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Background Image"
            className="object-cover object-center w-full h-full"
          />
          <div className="absolute inset-0 bg-black opacity-50" />
        </div>
        <div className="relative z-10 flex flex-col justify-center items-center h-full text-center">
          <h1 className="text-5xl font-bold leading-tight mb-4">
            Make your interior more
            <br />
            minimalistic & modern
          </h1>
          <p className="text-lg text-gray-300 mb-8">
            Turn your room with panto into a lot more minimalist
            <br /> and modern with ease and speed
          </p>
          <Link
            to="/"
            className="bg-[#518581] text-gray-900 hover:bg-gray-300 py-2 px-6 rounded text-lg transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg">
            Explore Products
          </Link>
        </div>
      </div>

      <ProductsList />

      <section className="bg-white">
        <div className="gap-16 items-center py-8 px-4 mx-auto max-w-screen-xl lg:grid lg:grid-cols-2 lg:py-16 lg:px-6">
          <div className="font-light text-gray-500 sm:text-lg dark:text-gray-400">
            <h2 className="mb-4 text-3xl tracking-tight font-extrabold text-gray-900">
              Very serious materials <br /> for making furniture
            </h2>
            <p className="mb-4">
              You don’t have to worry about the result because all of these interiors are made by
              people who are professionals in their fields with an elegant and lucurious style and
              with premium quality materials
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4 mt-8">
            <img
              className="w-full rounded-lg"
              src="https://i.pinimg.com/564x/2d/b8/96/2db8969f881655b457f00a4914bdc9d3.jpg"
              alt="office content 1"
            />
            <img
              className="mt-4 w-full lg:mt-10 rounded-lg"
              src="https://i.pinimg.com/564x/97/a4/5f/97a45fb4f4740df403d24fa3129174ee.jpg"
              alt="office content 2"
            />
          </div>
        </div>
      </section>
    </div>
  )
}
