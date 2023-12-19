import { useEffect, useState } from 'react'
import swal from 'sweetalert'
import { toast } from 'react-toastify'
//** Redux */
import { useDispatch, useSelector } from 'react-redux'
import { deleteCategoryThunk, fetchCategoriesThunk } from '../../../redux/slices/categorySlice'
import { AppDispatch, RootState } from '../../../redux/store'
import { Category } from '../../../types/types'
//** Components */
import CategoryModal from './CategoryModal'
import AdminSideBar from '../AdminSideBar'
//** Icons */
import Edit2LineIcon from 'remixicon-react/Edit2LineIcon'
import DeleteBinLineIcon from 'remixicon-react/DeleteBinLineIcon'


const initialCategoryState: Category = {
  _id: '',
  name: ''
}
export default function CategoryTable() {
  
  const dispatch = useDispatch<AppDispatch>()
  const { category, isLoading, error } = useSelector((state: RootState) => state.category)

  //** States */
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [categories, setCatrgories] = useState<Category>(initialCategoryState)
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null)

  //** Edit Category Handler */
  const openEditProductModal = (item: Category) => {
    setSelectedCategory(item)
    setIsModalOpen(true)
  }
  //** Open Modal */
  const openAddCategoryModal = () => {
    setCatrgories(initialCategoryState)
    setSelectedCategory(null)
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
        dispatch(deleteCategoryThunk(id))
        return toast.success(error)
      }
    })
  }

  useEffect(() => {
    dispatch(fetchCategoriesThunk())
  }, [])

  return (
    <div className="flex">
      <AdminSideBar />
      <div className="w-3/4 bg-white p-4">
        {isLoading && <h3> Loading categories...</h3>}
        <div className="flex flex-1 items-center justify-center p-6">
          <div className="w-full max-w-lg">
            <div className="flex items-center">
              <h2 className="text-2xl font-bold text-[#32334A] lg:text-3xl mt-4">Category Table</h2>
              <button onClick={openAddCategoryModal} className="ml-4">
                Add Category
              </button>
            </div>
          </div>
        </div>

        <table className="w-full table-fixed border">
          <thead>
            <tr className="bg-[#F7F7F7]">
              <th className="w-1/4 py-4 px-6 text-left text-gray-600 font-bold">ID</th>
              <th className="w-1/4 py-4 px-6 text-left text-gray-600 font-bold">Category Name</th>
              <th className="w-1/4 py-4 px-6 text-left text-gray-600 font-bold">Action</th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {category.map((item, index) => {
              const { _id, name } = item
              return (
                <tr key={_id}>
                  <td className="py-4 px-6 border-b border-gray-200">{index + 1}</td>
                  <td className="py-4 px-6 border-b border-gray-200">{name}</td>
                  <td className="py-4 px-6 border-b border-gray-200 whitespace">
                    <button
                      className="mr-1 text-blue-600 bg-blue-500/10 p-3 rounded-full"
                      onClick={() => openEditProductModal(item)}>
                      <Edit2LineIcon />
                    </button>
                    <button
                      className="text-red-600 bg-red-500/10 p-3 rounded-full"
                      onClick={() => handleDeleteBtnClick(_id)}>
                      <DeleteBinLineIcon />
                    </button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>

        {isModalOpen && (
          <CategoryModal
            isModalOpen={isModalOpen}
            selectedCategory={selectedCategory}
            setIsModalOpen={setIsModalOpen}
          />
        )}
      </div>
    </div>
  )
}
