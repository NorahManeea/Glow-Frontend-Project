import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../../redux/store'
import { fetchHighestSoldProductsThunk } from '../../redux/slices/productSlice'
import useProductState from '../../hooks/useProductState'

export default function HighestSoldProducts() {

  const dispatch = useDispatch<AppDispatch>()
  const { products } = useProductState()

  useEffect(() => {
    dispatch(fetchHighestSoldProductsThunk())
  }, [])

  return (
    <section className="text-gray-700 body-font overflow-hidden bg-white mx-auto gap-2">
      <div className="container px-5 py-24 mx-auto">
        <div className="lg:w-4/5 mx-auto flex gap-4">
          <div className="flex-grow">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold tracking-tight text-gray-900">
                Bestsellers Products
              </h2>
              <Link to="/products" className="text-[#956556]">
                See All Products
              </Link>
            </div>
            <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
              {products.map((product) => (
                <Link to={`/products/${product._id}`}>
                  <div key={product._id} className="group relative bg-gray-100 rounded-xl p-3">
                    <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-xl bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                      {product.image && (
                        <img
                          src={product.image}
                          alt={product.name}
                          className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                        />
                      )}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
