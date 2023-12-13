import { ChangeEvent, FormEvent, useState } from 'react'
import { useDispatch } from 'react-redux'
import { addProduct, editProduct, removeProduct } from '../../redux/slices/productSlice'
import AdminSideBar from './AdminSideBar'
import { Product } from '../../types/types'
import useProductState from '../../hooks/useProductState'

import swal from 'sweetalert'
import Widget from '../widget/Widget'

import Edit2LineIcon from 'remixicon-react/Edit2LineIcon'
import DeleteBinLineIcon from 'remixicon-react/DeleteBinLineIcon'
import { toast } from 'react-toastify'
import { useFetchProducts } from '../../hooks/useDataFetching'

const initialProductState: Product = {
  _id: '',
  name: '',
  image: '',
  description: '',
  categories: [],
  price: 0,
  quantityInStock: 0,
  discount: 0,
  itemsSold: 0,
  reviews: []
}

export default function ProductsTable() {
  const dispatch = useDispatch()
  const { products } = useProductState()
  useFetchProducts()


  //** States */
  const [product, setProduct] = useState<Product>(initialProductState)
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)

  //** Changes Handler */
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    const isList = name === 'categories' || name === 'variants' || name === 'sizes';
  
    if (selectedProduct) {
      setSelectedProduct((prevProduct) => ({
        ...prevProduct!,
        [name]: isList ? value.split(',') : value,
      }));
    } else {
      setProduct((prevProduct) => ({
        ...prevProduct,
        [name]: isList ? value.split(',') : value,
      }));
    }
  };
  

  //** Submit Handler */
  const onSubmitHandler = (e: FormEvent) => {
    e.preventDefault()

    if (selectedProduct && selectedProduct._id) {
      const updatedProduct = { ...selectedProduct }
      dispatch(editProduct({ editedProduct: updatedProduct }))
      toast.success('Item edited successfully')
    } else {
      const newProduct = { ...product, id: '' }
      dispatch(addProduct({ product: newProduct }))
      toast.success('Item added successfully')
    }
    setProduct(initialProductState)
    setSelectedProduct(null)
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
        dispatch(removeProduct({ productId: id }))
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
        </div>

        <div className="flex flex-1 items-center justify-center pb-4">
          <form className="mt-5 sm:flex sm:items-center" onSubmit={onSubmitHandler}>
            <div className="flex mt-2">
              <div className="mr-2">
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={selectedProduct ? selectedProduct.name : product.name}
                  onChange={handleChange}
                  className="w-full rounded-md border border-gray-300 bg-white py-2 pl-3 pr-3 leading-5 placeholder-gray-500 focus:border-gray-500 focus:placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-500 sm:text-sm"
                  placeholder="Product Name"
                />
              </div>
              <div className="mr-2">
                <input
                  type="text"
                  name="image"
                  id="image"
                  value={selectedProduct ? selectedProduct.image : product.image}
                  onChange={handleChange}
                  className="w-full rounded-md border border-gray-300 bg-white py-2 pl-3 pr-3 leading-5 placeholder-gray-500 focus:border-gray-500 focus:placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-500 sm:text-sm"
                  placeholder="Image Url"
                />
              </div>
            </div>

            <div className="flex mt-2">
              <div className="mr-2">
                <input
                  name="description"
                  id="description"
                  value={selectedProduct ? selectedProduct.description : product.description}
                  onChange={handleChange}
                  className="w-full rounded-md border border-gray-300 bg-white py-2 pl-3 pr-3 leading-5 placeholder-gray-500 focus:border-gray-500 focus:placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-500 sm:text-sm"
                  placeholder="Description"
                  type="text"
                />
              </div>
              <div className="mr-2">
                <input
                  type="text"
                  name="categories"
                  id="categories"
                  value={
                    selectedProduct
                      ? selectedProduct.categories.join(',')
                      : product.categories.join(',')
                  }
                  onChange={handleChange}
                  className="w-full rounded-md border border-gray-300 bg-white py-2 pl-3 pr-3 leading-5 placeholder-gray-500 focus:border-gray-500 focus:placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-500 sm:text-sm"
                  placeholder="Categories"
                />
              </div>
            </div>

            <button
              className={`mt-2 inline-flex items-center justify-center rounded-md border border-transparent ${
                selectedProduct ? 'bg-blue-600' : 'bg-[#32334A] hover:bg-[#3f415a]'
              } px-5 py-2 font-medium text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm`}
              style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              {selectedProduct ? 'Edit Product' : 'Add Product'}
            </button>
          </form>
        </div>

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
                    onClick={() => setSelectedProduct(item)}
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
