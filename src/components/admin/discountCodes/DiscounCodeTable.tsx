import { useEffect, useState } from 'react'
import swal from 'sweetalert'
import { toast } from 'react-toastify'
//** Redux */
import { useDispatch } from 'react-redux'
import {
  deleteDiscountCodeThunk,
  fetchDiscountCodesThunk
} from '../../../redux/slices/discountCode'
import { AppDispatch } from '../../../redux/store'
//** Types */
import { DiscountCode } from '../../../types/types'
//** Custom Hook */
import useDiscountCodeSate from '../../../hooks/useDiscountCodeState'
//** Components */
import AdminSideBar from '../AdminSideBar'
import DiscountCodeModal from './DiscountCodeModal'
import CustomLoader from '../../global/CustomLoader'

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

  //** Edit Discount Code Modal Handler */
  const openEditDscountCodeModal = (item: DiscountCode) => {
    setSelectedDiscountCode(item)
    setIsModalOpen(true)
  }
  //** Add  Discount Code Modal Handler */
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
        <div className="flex items-center mt-4">
          <h3 className="text-2xl font-semibold leading-none tracking-tight flex-grow text-[#32334A]">
            Discount Codes Table
          </h3>
          <button
            bg-
            onClick={openAddDscountCodeModal}
            className=" bg-[#32334A] text-white inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 ml-4">
            Add Discount Code
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
                  <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground w-[200px]">
                    Code
                  </th>
                  <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground w-[200px]">
                    Percentage
                  </th>
                  <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground ">
                    Created at
                  </th>
                  <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                    Expiration Date
                  </th>
                  <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground w-[100px]">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="[&_tr:last-child]:border-0">
                {discountCodes.map((item, index) => (
                  <tr
                    key={item._id}
                    className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                    <td className="p-4 align-middle">{index + 1}</td>
                    <td className="p-4 align-middle">{item.code}</td>
                    <td className="p-4 align-middle">{item.discountPercentage}</td>
                    <td className="p-4 align-middle">
                      {new Date(item.expirationDate).toLocaleDateString()}
                    </td>
                    <td className="p-4 align-middle">
                      {new Date(item.expirationDate).toLocaleDateString()}
                    </td>
                    <td className="p-4 align-middle">
                      <div className="flex gap-2">
                        <button
                          onClick={() => openEditDscountCodeModal(item)}
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
