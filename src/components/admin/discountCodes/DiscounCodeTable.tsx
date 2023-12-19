import { useEffect, useState } from 'react'
import swal from 'sweetalert'
import { toast } from 'react-toastify'
import useDiscountCodeSate from '../../../hooks/useDiscountCodeState'
//** Redux */
import { useDispatch } from 'react-redux'
import {
  deleteDiscountCodeThunk,
  fetchDiscountCodesThunk
} from '../../../redux/slices/discountCode'
import { AppDispatch } from '../../../redux/store'
import { DiscountCode } from '../../../types/types'
//** Components */
import AdminSideBar from '../AdminSideBar'
//** Icons */
import Edit2LineIcon from 'remixicon-react/Edit2LineIcon'
import DeleteBinLineIcon from 'remixicon-react/DeleteBinLineIcon'
import DiscountCodeModal from './DiscountCodeModal'


const initialDiscountCodeState: DiscountCode = {
  _id: '',
  code: '',
  discountPercentage: 0,
  expirationDate: new Date()
}
export default function DiscountCodeTable() {
  const dispatch = useDispatch<AppDispatch>()
  const { discountCodes, isLoading, error } = useDiscountCodeSate()

  //** States */
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [discountCode, setDiscountCodes] = useState<DiscountCode | null>(initialDiscountCodeState)
  const [selectedDiscountCode, setSelectedDiscountCode] = useState<DiscountCode | null>(null)

  //** Edit Discount Code Handler */
  const openEditDscountCodeModal = (item: DiscountCode) => {
    setSelectedDiscountCode(item)
    setIsModalOpen(true)
  }
  //** Open Modal */
  const openAddDscountCodeModal = () => {
    setDiscountCodes(initialDiscountCodeState)
    setSelectedDiscountCode(null)
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
        dispatch(deleteDiscountCodeThunk(id))
        return toast.success(error)
      }
    })
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
              <button onClick={openAddDscountCodeModal} className="ml-4">
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
                      className="mr-1 text-blue-600 bg-blue-500/10 p-3 rounded-full"
                      onClick={() => openEditDscountCodeModal(item)}>
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
          <DiscountCodeModal
            isModalOpen={isModalOpen}
            selectedCode={selectedDiscountCode}
            setIsModalOpen={setIsModalOpen}
          />
        )}
      </div>
    </div>
  )
}
