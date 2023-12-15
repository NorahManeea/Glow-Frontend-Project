import { useEffect, useState } from 'react'
import swal from 'sweetalert'
import { toast } from 'react-toastify'
//** Redux */
import { useDispatch, useSelector } from 'react-redux'
import {
  createDiscountCodeThunk,
  deleteDiscountCodeThunk,
  fetchDiscountCodesThunk
} from '../../redux/slices/discountCode'
import { AppDispatch, RootState } from '../../redux/store'
import { DiscountCode } from '../../types/types'
//** Comonents */
import AdminSideBar from './AdminSideBar'
//** Icons */
import DeleteBinLineIcon from 'remixicon-react/DeleteBinLineIcon'
import DiscountCodeModal from './DiscountCodeModal'

export default function DiscountCodeTable() {
  const { discountCodes, isLoading, error } = useSelector((state: RootState) => state.discountCode)

  const dispatch = useDispatch<AppDispatch>()

  //** States */
  const [selectedCode, setSelectedCode] = useState<DiscountCode | null>(null)
  const [updateCategory, setUpdateCategory] = useState(false)

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
        dispatch(deleteDiscountCodeThunk(id))
        return toast.success(error)
      }
    })
  }
  //** Open Modal */
  const openCategoryModal = () => {
    setUpdateCategory(true)
  }
  //** Close Modal */
  const closeCategoryModal = () => {
    setUpdateCategory(false)
    setSelectedCode(null)
  }

  //** Submit Handler */
  const onSubmitHandler = (discountCode: DiscountCode) => {
    dispatch(createDiscountCodeThunk(discountCode)).then((res) => {
      if (res.meta.requestStatus === 'fulfilled') {
        toast.success(res.payload.message)
      }
      if (res.meta.requestStatus === 'rejected') {
        toast.error(error)
      }
    })

    closeCategoryModal()
  }

  useEffect(() => {
    dispatch(fetchDiscountCodesThunk())
  }, [])

  return (
    <div className="flex">
      <AdminSideBar />
      <div className="w-3/4 bg-white p-4">
        {isLoading && <h3> Loading discount codes...</h3>}
        <div className="flex flex-1 items-center justify-center p-6">
          <div className="w-full max-w-lg">
            <div className="flex items-center">
              <h2 className="text-2xl font-bold text-[#32334A] lg:text-3xl mt-4">
                Discount Code Table
              </h2>
              <button onClick={openCategoryModal} className="ml-4">
                Add Discont Code
              </button>
            </div>
          </div>
        </div>

        <table className="w-full table-fixed border">
          <thead>
            <tr className="bg-[#F7F7F7]">
              <th className="w-1/4 py-4 px-6 text-left text-gray-600 font-bold">ID</th>
              <th className="w-1/4 py-4 px-6 text-left text-gray-600 font-bold">Code</th>
              <th className="w-1/4 py-4 px-6 text-left text-gray-600 font-bold">Percentage</th>
              <th className="w-1/4 py-4 px-6 text-left text-gray-600 font-bold">Expired at</th>
              <th className="w-1/4 py-4 px-6 text-left text-gray-600 font-bold">Action</th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {discountCodes.map((item, index) => {
              const { _id, code, expirationDate, discountPercentage } = item
              return (
                <tr key={_id}>
                  <td className="py-4 px-6 border-b border-gray-200">{index + 1}</td>
                  <td className="py-4 px-6 border-b border-gray-200">{code}</td>
                  <td className="py-4 px-6 border-b border-gray-200">{discountPercentage}%</td>
                  <td className="py-4 px-6 border-b border-gray-200">
                    {new Date(expirationDate).toLocaleDateString()}
                  </td>

                  <td className="py-4 px-6 border-b border-gray-200 whitespace">
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

        {updateCategory && (
          <DiscountCodeModal
            selectedCode={selectedCode}
            openModal={closeCategoryModal}
            onSubmit={onSubmitHandler}
          />
        )}
      </div>
    </div>
  )
}
