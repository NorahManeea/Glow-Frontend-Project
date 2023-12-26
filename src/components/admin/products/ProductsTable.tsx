import { useEffect, useState } from 'react'
import swal from 'sweetalert'
//** Custom Hooks */
import useProductState from '../../../hooks/useProductState'
//** Redux */
import { useDispatch } from 'react-redux'
import { deleteProductThunk, fetchAllProductsThunk } from '../../../redux/slices/productSlice'
import { AppDispatch } from '../../../redux/store'
//** Compoents */
import AdminSideBar from '../AdminSideBar'
import ProductModal from './ProductModal'
import CustomLoader from '../../global/CustomLoader'
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
  discount: 0,
  reviews: []
}

export default function ProductsTable() {
  const dispatch = useDispatch<AppDispatch>()
  const { products, isLoading } = useProductState()

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

  if (isLoading) {
    return (
      <section className="text-gray-700 body-font overflow-hidden bg-white mx-auto my-56">
        <div className="container px-5 py-20 mx-auto">
          <div className="text-center">
            <CustomLoader />
          </div>
        </div>
      </section>
    )
  }
  return (
    <div className="flex">
      <AdminSideBar />
      <div className="w-4/5 bg-white p-4">
        <div className="flex items-center mt-5">
          <h3 className="text-2xl font-semibold leading-none tracking-tight flex-grow text-[#32334A]">
            Products Table
          </h3>
          <button
            onClick={openAddProductModal}
            className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors bg-[#32334A] text-white h-10 px-4 py-2 ml-4">
            Add Product
          </button>
        </div>

        <div className="flex flex-1 items-center justify-center pb-4"></div>
        <div className="p-6">
          <div className="relative w-full overflow-auto">
            <table className="w-full caption-bottom text-sm border">
              <thead className="[&_tr]:border-b">
                <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                  <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground w-[60px]">
                    #
                  </th>
                  <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground w-[100px]">
                    Image
                  </th>
                  <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                    Name
                  </th>
                  <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                    Quantity
                  </th>
                  <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground w-[100px]">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="[&_tr:last-child]:border-0">
                {products.map((item, index) => (
                  <tr
                    key={item._id}
                    className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                    <td className="p-4 align-middle">{index + 1}</td>
                    <td className="p-4 align-middle">
                      <img
                        src={item.image}
                        alt="Product Image"
                        width={50}
                        height={50}
                        style={{ aspectRatio: '50 / 50', objectFit: 'cover' }}
                      />
                    </td>
                    <td className="p-4 align-middle">{item.name}</td>
                    <td className="p-4 align-middle">{item.quantityInStock}</td>
                    <td className="p-4 align-middle">
                      <div className="flex gap-2">
                        <button
                          onClick={() => openEditProductModal(item)}
                          className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 w-10">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width={24}
                            height={24}
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth={2}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="w-4 h-4">
                            <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
                            <path d="m15 5 4 4" />
                          </svg>
                          <span className="sr-only">Edit</span>
                        </button>
                        <button
                          onClick={() => handleDeleteBtnClick(item._id)}
                          className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 w-10 text-red-500">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width={24}
                            height={24}
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth={2}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="w-4 h-4">
                            <path d="M3 6h18" />
                            <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                            <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                          </svg>
                          <span className="sr-only">Delete</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
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
