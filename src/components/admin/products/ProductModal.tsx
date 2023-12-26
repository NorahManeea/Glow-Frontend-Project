import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import { toast } from 'react-toastify'
//** Redux */
import { useDispatch } from 'react-redux'
import { AppDispatch } from '../../../redux/store'
import { createProductThunk, updateProductThunk } from '../../../redux/slices/productSlice'
import { fetchCategoriesThunk } from '../../../redux/slices/categorySlice'
//** Custom Hook */
import useCategoryState from '../../../hooks/useCategoryState'
//** Types */
import { Product, ProductModalProps } from '../../../types/types'

const initialProductState: Product = {
  _id: '',
  name: '',
  image: '',
  description: '',
  categories: '',
  price: 0,
  quantityInStock: 0,
  discount: 0,
  reviews: []
}

export default function ProductModal(prop: ProductModalProps) {
  const dispatch = useDispatch<AppDispatch>()

  const { categories } = useCategoryState()

  //** States */
  const [selectedImage, setSelectedImage] = useState(null)
  const [product, setProduct] = useState<Product>(initialProductState)
  const [image, setImage] = useState<File | undefined>(undefined)

  //** Close Modal Handler */
  const handleCloseModal = () => {
    prop.setIsModalOpen(false)
  }

  //** Inputs Change Handler */
  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setProduct({
      ...product,
      [name]: value
    })
  }
  //** Select Change Hanlder */
  const handleSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target
    setProduct({
      ...product,
      [name]: value
    })
  }

  //** Image File Change Handdler */
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files && files.length > 0) {
      setImage(files[0])
    } else {
    }
  }
  useEffect(() => {
    dispatch(fetchCategoriesThunk())
    if (prop.selectedProduct) {
      setProduct(prop.selectedProduct)
    } else {
      setProduct(initialProductState)
    }
  }, [])

  //** Submit Handler */
  const onSubmitHandler = (e: FormEvent) => {
    e.preventDefault()
    //** Create Form Data */
    const formData = new FormData()
    formData.append('name', product.name)
    formData.append('description', product.description)
    formData.append('discount', String(product.discount))
    formData.append('price', String(product.price))
    formData.append('quantityInStock', String(product.quantityInStock))
    formData.append('categories', product.categories)

    if (image) {
      formData.append('image', image)
      product.image = String(image)
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
        <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl sm:w-full sm:p-6">
          <div className="flex justify-end">
            <button className="text-gray-500 p-2" onClick={handleCloseModal}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <form className="p-6 " onSubmit={onSubmitHandler}>
            <div className="scrollable-section max-h-96 overflow-y-auto mb-4">
              <div className="flex items-center justify-center w-full">
                <label
                  htmlFor="image"
                  className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800  hover:bg-gray-100 ">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <svg
                      className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 20 16">
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                      />
                    </svg>
                    <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                      <span className="font-semibold">Click to upload</span>
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">PNG, JPG or JPEG</p>
                  </div>
                  <input id="image" type="file" className="hidden" onChange={handleFileChange} />
                </label>
              </div>

              <div className="my-4">
                <label
                  htmlFor="productName"
                  className="block text-sm font-medium leading-6 text-gray-900">
                  Product Name
                </label>
                <input
                  type="text"
                  className="mt-1 p-2 w-full border rounded-md"
                  id="name"
                  name="name"
                  value={product.name}
                  onChange={handleInputChange}
                />
              </div>
              <div className="my-4">
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
              <div className="my-4">
                <label
                  htmlFor="price"
                  className="block text-sm font-medium leading-6 text-gray-900">
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
              <div className="my-4">
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
              <div className="my-4">
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
              <div className="my-4">
                <select
                  id="categories"
                  name="categories"
                  value={product.categories}
                  onChange={handleSelectChange}
                  className="mt-1 p-2 w-full border rounded-md">
                  <option
                    value=""
                    disabled
                    className="block text-sm font-medium leading-6 text-gray-900">
                    Select a category
                  </option>
                  {categories.map((item, index) => (
                    <option key={index} value={item._id}>
                      {item.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="mt-6 flex items-center justify-end gap-x-6">
              <button
                type="submit"
                className="inline-flex items-center justify-center w-full rounded-md border border-transparent bg-[#32334A] hover:bg-[#3f415a] px-4 py-2 font-medium text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 sm:w-auto sm:text-sm">
                {prop.selectedProduct ? 'Edit Product' : 'Add Product'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
