import { ChangeEvent, FormEvent, useEffect, useState } from 'react'
//** Redux */
import { useDispatch } from 'react-redux'
import { AppDispatch } from '../../../redux/store'
import {
  createDiscountCodeThunk,
  updateDiscountCodeThunk
} from '../../../redux/slices/discountCode'
//** Types */
import { DiscountCode, DiscountCodeModalProps } from '../../../types/types'

const initialDiscountCodeState: DiscountCode = {
  _id: '',
  code: '',
  discountPercentage: 0,
  expirationDate: new Date()
}

export default function DiscountCodeModal(prop: DiscountCodeModalProps) {
  const dispatch = useDispatch<AppDispatch>()

  //** States */
  const [code, setCode] = useState<DiscountCode>(initialDiscountCodeState)

  useEffect(() => {
    if (prop.selectedCode) {
      setCode(prop.selectedCode)
    } else {
      setCode(initialDiscountCodeState)
    }
  }, [])

  //** Input Change Handler */
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setCode((prevCode) => ({ ...prevCode, [name]: value }))
  }
  //** Close Modal Handler */
  const handleCloseModal = () => {
    prop.setIsModalOpen(false)
  }

  //** Submit Handler */
  const onSubmitHandler = (e: FormEvent) => {
    e.preventDefault()
    if (prop.selectedCode && prop.selectedCode._id) {
      dispatch(updateDiscountCodeThunk(code))
    } else {
      dispatch(createDiscountCodeThunk(code))
    }
    setCode(initialDiscountCodeState)
    prop.setIsModalOpen(false)
  }

  return (
    <div className="fixed inset-0 overflow-y-auto">
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity">
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>
        <span className="hidden sm:inline-block sm:align-middle sm:h-screen"></span>
        <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
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
          <form onSubmit={onSubmitHandler}>
            <div>
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                {prop.selectedCode ? 'Edit Discount Code' : 'Add Discount Code'}
              </h3>
              <div className="mt-2">
                <input
                  id="code"
                  name="code"
                  className="w-full rounded-md border border-gray-300 bg-white py-2 pl-3 pr-3 leading-5 placeholder-gray-500 focus:border-gray-500 focus:placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-500 sm:text-sm"
                  placeholder="Enter the discount code"
                  type="text"
                  value={code.code}
                  onChange={handleInputChange}
                />
              </div>
              <div className="mt-2">
                <input
                  id="expirationDate"
                  name="expirationDate"
                  className="w-full rounded-md border border-gray-300 bg-white py-2 pl-3 pr-3 leading-5 placeholder-gray-500 focus:border-gray-500 focus:placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-500 sm:text-sm"
                  placeholder="Enter the category name"
                  type="date"
                  value={code.expirationDate ? new Date(code.expirationDate).toISOString() : ''}
                  onChange={handleInputChange}
                />
              </div>
              <div className="mt-2">
                <input
                  id="discountPercentage"
                  name="discountPercentage"
                  className="w-full rounded-md border border-gray-300 bg-white py-2 pl-3 pr-3 leading-5 placeholder-gray-500 focus:border-gray-500 focus:placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-500 sm:text-sm"
                  placeholder="Enter the category name"
                  type="number"
                  value={code.discountPercentage}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className="mt-6 flex items-center justify-end gap-x-6">
              <button
                type="submit"
                className="inline-flex items-center justify-center w-full rounded-md border border-transparent bg-[#32334A] hover:bg-[#3f415a] px-4 py-2 font-medium text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 sm:w-auto sm:text-sm">
                {prop.selectedCode ? 'Edit Discount Code' : 'Add Discount Code'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
