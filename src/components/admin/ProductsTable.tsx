import { ChangeEvent, FormEvent, useState } from 'react'
import { toast } from 'react-toastify'
import swal from 'sweetalert'
//** Redux */
import { useDispatch } from 'react-redux'
import { createProductThunk, updateProductThunk } from '../../redux/slices/productSlice'
import { AppDispatch } from '../../redux/store'
import AdminSideBar from './AdminSideBar'
import { Product } from '../../types/types'
import useProductState from '../../hooks/useProductState'
//** Compoents */
import Widget from '../widget/Widget'
//** Icons */
import Edit2LineIcon from 'remixicon-react/Edit2LineIcon'
import DeleteBinLineIcon from 'remixicon-react/DeleteBinLineIcon'

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

export default function ProductsTable() {
  const dispatch = useDispatch<AppDispatch>()
  const { products } = useProductState()

  //** States */
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [product, setProduct] = useState<Product>(initialProductState)
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [isEdit, setIsEdit] = useState(false)
  const [image, setImage] = useState<File | undefined>(undefined)

  //** Inputs Change Handler */
  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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

  //** Handle Image File Change */
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files && files.length > 0) {
      setImage(files[0])
    } else {
    }
  }
  //** Edit Product Handler */
  const openEditProductModal = (item: Product) => {
    setProduct(item)
    setSelectedProduct({ ...item })
    setIsEdit(true)
    setIsModalOpen(true)
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

    if (selectedProduct && selectedProduct._id) {
      formData.append('_id', selectedProduct._id)
      dispatch(updateProductThunk({ productId: selectedProduct._id, updatedProduct: formData }))
      toast.success('Item edited successfully')
    } else {
      dispatch(createProductThunk(formData))
      toast.success('Item added successfully')
    }

    setProduct(initialProductState)
  }

  //** Delete Handler */
  const handleDeleteBtnClick = (id: string) => {
    swal({
      title: 'Delete',
      text: 'Are you sure you want to delete?',
      icon: 'warning',
      dangerMode: true,
      buttons: ['Cancel', 'Delete']
    }).then((isOk) => {
      if (isOk) {
        // dispatch(del({ productId: id }))
      }
    })
  }

  return (
    <div className="flex">
      <AdminSideBar />
      <div className="w-4/5 bg-white p-4">
        <Widget />
        <div className="flex items-center">
          <h2 className="text-2xl font-bold text-[#32334A] lg:text-3xl mt-4">Products Table</h2>
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

        <div className="flex flex-1 items-center justify-center pb-4"></div>

        <table className="w-full table-fixed border">
          <thead>
            <tr className="bg-[#F7F7F7]">
              <th className="w-1/12 py-4 px-6 text-left text-gray-600 font-bold">ID</th>
              <th className="w-2/12 py-4 px-6 text-left text-gray-600 font-bold">Image</th>
              <th className="w-2/12 py-4 px-6 text-left text-gray-600 font-bold">Name</th>
              <th className="w-5/12 py-4 px-6 text-left text-gray-600 font-bold">Description</th>
              <th className="w-1/4 py-4 px-6 text-left text-gray-600 font-bold">Action</th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {products.map((item, index) => (
              <tr key={item._id}>
                <td className="py-4 px-6 border-b border-gray-200">{index + 1}</td>
                <td className="py-4 px-6 border-b border-gray-200">
                  <img src={item.image} width={100} />
                </td>
                <td className="py-4 px-6 border-b border-gray-200">{item.name}</td>
                <td className="py-4 px-6 border-b border-gray-200 truncate">{item.description}</td>
                <td className="py-4 px-6 border-b border-gray-200 whitespace">
                  <button
                    onClick={() => openEditProductModal(item)}
                    className="mr-1 text-blue-600 bg-blue-500/10 p-3 rounded-full">
                    <Edit2LineIcon />
                  </button>
                  <button
                    onClick={() => handleDeleteBtnClick(item._id)}
                    className="text-red-600 bg-red-500/10 p-3 rounded-full">
                    <DeleteBinLineIcon />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
