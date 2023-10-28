import { useState, ChangeEvent, FormEvent } from 'react'
import { useDispatch } from 'react-redux'

import { addProduct } from '../redux/slices/products/productSlice'
import { AppDispatch } from '../redux/store'

import { ProductForm } from './ProductForm'
import AdminSideBar from './admin/AdminSideBar'
import { Product } from '../types/types'

const initialProductState: Product = {
  id: 0,
  name: '',
  image: '',
  description: '',
  categories: [],
  variants: [],
  sizes: [],
  price: 0
}

export function NewProductWrapper() {
  const dispatch = useDispatch<AppDispatch>()
  const [product, setProduct] = useState<Product>(initialProductState)

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target

    const isList = name === 'categories' || name === 'variants' || name === 'sizes'
    if (isList) {
      setProduct({
        ...product,
        [name]: value.split(',')
      })
      return
    }

    setProduct({
      ...product,
      [name]: value
    })
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    // Send the product data to your backend or in this case send it to Redux
    console.log('New product data:', product)
    // let's add Id property to the object (usually IDs are generated automatically on the backend)
    product.id = +new Date()
    console.log('product:', product)

    dispatch(addProduct({ product }))

    // Reset the form
    setProduct(initialProductState)
  }

  return (
    <div className="flex">
      <div className="w-3/4 bg-white p-4">
        <div className=" rounded-lg overflow-hidden mx-4 md:mx-10">
          <div className="flex flex-1 items-center justify-center p-6">
            <div className="w-full max-w-lg">
              <div>
                <h3 className="text-2xl font-bold">Add a new product</h3>
                <ProductForm
                  handleSubmit={handleSubmit}
                  handleChange={handleChange}
                  product={product}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
