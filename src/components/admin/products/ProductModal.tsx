import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import { Product, ProductModalProps } from '../../../types/types'
//** Redux */
import { useDispatch } from 'react-redux'
import { AppDispatch } from '../../../redux/store'
import { createProductThunk, updateProductThunk } from '../../../redux/slices/productSlice'
import { toast } from 'react-toastify'

const initialProductState: Product = {
  _id: '',
  name: '',
  image: '',
  description: '',
  categories: '',
  price: 0,
  quantityInStock: 0,
  discount: 0
}

export default function ProductModal(prop: ProductModalProps) {
  const dispatch = useDispatch<AppDispatch>()
  
  //** States */
  const [product, setProduct] = useState<Product>(initialProductState)
  const [image, setImage] = useState<File | undefined>(undefined)

  useEffect(() => {
    if (prop.selectedProduct) {
      setProduct(prop.selectedProduct)
    } else {
      setProduct(initialProductState)
    }
  }, [])

  //** Inputs Change Handler */
  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setProduct({
      ...product,
      [name]: value
    })
  }

  //** Handle Image File Change */
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files && files.length > 0) {
      setImage(files[0])
    } else {
    }
  }

  //** Submit Handler */
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()

    const formData = new FormData()
    formData.append('name', product.name)
    formData.append('description', product.description)
    formData.append('price', String(product.price))
    formData.append('quantityInStock', String(product.quantityInStock))
    formData.append('categories', product.categories)
    formData.append('discount', String(product.discount))

    if (image) {
      formData.append('image', image)
    }

    if (prop.selectedProduct && prop.selectedProduct._id) {
      formData.append('_id', prop.selectedProduct._id)
      dispatch(
        updateProductThunk({ productId: prop.selectedProduct._id, updatedProduct: formData })
      )
      toast.success('Item edited successfully')
    } else {
      dispatch(createProductThunk(formData))
      toast.success('Item added successfully')
    }

    setProduct(initialProductState)
    prop.setIsModalOpen(false)
  }

  return (
    <div className="fixed inset-0 overflow-y-auto">
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity">
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>
        <span className="hidden sm:inline-block sm:align-middle sm:h-screen"></span>
        &#8203;
        <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
          <form className="p-6 " onSubmit={handleSubmit}>
            <div className="mt-4 flex text-sm leading-6 text-gray-600">
              <label
                htmlFor="file-upload"
                className="relative cursor-pointer rounded-md bg-white font-semibold text-[#F2ACAA] focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500">
                <span>Upload a Image</span>
                <input
                  type="file"
                  onChange={(e) => {
                    handleFileChange(e)
                  }}
                />
              </label>
            </div>

            <div className="col-span-full">
              <label
                htmlFor="cover-photo"
                className="block text-sm font-medium leading-6 text-gray-900">
                Cover photo
              </label>
              <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                <div className="text-center">
                  <svg
                    className="mx-auto h-12 w-12 text-gray-300"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    aria-hidden="true">
                    <path
                      fillRule="evenodd"
                      d="M1.5 6a2.25 2.25 0 012.25-2.25h16.5A2.25 2.25 0 0122.5 6v12a2.25 2.25 0 01-2.25 2.25H3.75A2.25 2.25 0 011.5 18V6zM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0021 18v-1.94l-2.69-2.689a1.5 1.5 0 00-2.12 0l-.88.879.97.97a.75.75 0 11-1.06 1.06l-5.16-5.159a1.5 1.5 0 00-2.12 0L3 16.061zm10.125-7.81a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <div className="mt-4 flex text-sm leading-6 text-gray-600">
                    <label
                      htmlFor="image"
                      className="relative cursor-pointer rounded-md bg-white font-semibold text-[#F2ACAA] focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500">
                      <span>Upload Image</span>
                      <input id="image" name="file-upload" type="file" className="sr-only" />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs leading-5 text-gray-600">PNG, JPG, JPEG</p>
                </div>
              </div>
            </div>
            <div className="mb-4">
              <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={product.name}
                onChange={handleInputChange}
                className="mt-1 p-2 w-full border rounded-md"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="description"
                className="block text-sm font-medium leading-6 text-gray-900">
                Description
              </label>
              <input
                type="text"
                id="description"
                name="description"
                value={product.description}
                onChange={handleInputChange}
                className="mt-1 p-2 w-full border rounded-md"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="price" className="block text-sm font-medium leading-6 text-gray-900">
                Price
              </label>
              <input
                type="number"
                id="price"
                name="price"
                value={product.price}
                onChange={handleInputChange}
                className="mt-1 p-2 w-full border rounded-md"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="discount"
                className="block text-sm font-medium leading-6 text-gray-900">
                Discount
              </label>
              <input
                type="number"
                id="discount"
                name="discount"
                value={product.discount}
                onChange={handleInputChange}
                className="mt-1 p-2 w-full border rounded-md"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="quantityInStock"
                className="block text-sm font-medium leading-6 text-gray-900">
                Quantity In Stock
              </label>
              <input
                type="number"
                id="quantityInStock"
                name="quantityInStock"
                value={product.quantityInStock}
                onChange={handleInputChange}
                className="mt-1 p-2 w-full border rounded-md"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="categories"
                className="block text-sm font-medium leading-6 text-gray-900">
                Categories
              </label>
              <input
                type="text"
                id="categories"
                name="categories"
                value={product.categories}
                onChange={handleInputChange}
                className="mt-1 p-2 w-full border rounded-md"
              />
            </div>
            <div className="mt-6 flex items-center justify-end gap-x-6">
              <button
                type="submit"
                className="inline-flex items-center justify-center w-full rounded-md border border-transparent bg-[#32334A] hover:bg-[#3f415a] px-4 py-2 font-medium text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 sm:w-auto sm:text-sm">
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
