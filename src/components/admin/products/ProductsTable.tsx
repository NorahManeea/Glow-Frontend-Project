import { useEffect, useState } from 'react'
import swal from 'sweetalert'
//** Custom Hooks */
import useProductState from '../../../hooks/useProductState'
//** Redux */
import { useDispatch } from 'react-redux'
import { deleteProductThunk, fetchAllProductsThunk } from '../../../redux/slices/productSlice'
import { AppDispatch } from '../../../redux/store'
//** Compoents */
import Widget from '../../widget/Widget'
import AdminSideBar from '../AdminSideBar'
//** Icons */
import Edit2LineIcon from 'remixicon-react/Edit2LineIcon'
import DeleteBinLineIcon from 'remixicon-react/DeleteBinLineIcon'
import ProductModal from './ProductModal'
//** Types */
import { Product } from '../../../types/types'

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

  useEffect(() => {
    dispatch(fetchAllProductsThunk())
    window.scrollTo(0, 0)
  }, [])

  //** Edit Product Handler */
  const openEditProductModal = (item: Product) => {
    setSelectedProduct(item)
    setIsModalOpen(true)
  }

  //** Add Product Handler */
  const openAddProductModal = () => {
    setProduct(initialProductState)
    setSelectedProduct(null)
    setIsModalOpen(true)
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
        dispatch(deleteProductThunk(id))
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
          <button onClick={openAddProductModal}> Add Product</button>
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
        {isModalOpen && (
          <ProductModal
            isModalOpen={isModalOpen}
            selectedProduct={selectedProduct}
            setIsModalOpen={setIsModalOpen}
          />
        )}
      </div>
    </div>
  )
}
