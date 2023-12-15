import { useEffect } from 'react'
//** Custom Hooks */
import useUserState from '../../hooks/useUserState'
import useOrderState from '../../hooks/useOrderState'
import useProductState from '../../hooks/useProductState'
//** Redux */
import { useDispatch } from 'react-redux'
import { AppDispatch } from '../../redux/store'
import { fetchProductsCountThunk } from '../../redux/slices/productSlice'
import { fetchUsersCountThunk } from '../../redux/slices/userSlice'
import { fetchOrdersCountThunk } from '../../redux/slices/orderSlice'
//** Icons */
import UserLineIcon from 'remixicon-react/UserLineIcon'
import ShoppingBagLineIcon from 'remixicon-react/ShoppingBagLineIcon'
import MoneyDollarCircleLineIcon from 'remixicon-react/MoneyDollarCircleLineIcon'

export default function Widget() {
  //** Custom Hooks */
  const { usersCount } = useUserState()
  const { orderCount } = useOrderState()
  const { productCount } = useProductState()

  const dispatch = useDispatch<AppDispatch>()
  
  useEffect(() => {
    dispatch(fetchProductsCountThunk())
    dispatch(fetchUsersCountThunk())
    dispatch(fetchOrdersCountThunk())
  }, [])

  return (
    <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-6 ">
      <div className="flex items-center p-4 bg-[#F7F7F7] rounded-md">
        <span className="text-[#F2ACAA] bg-[#F2ACAA]/20 p-3 rounded-full">
          <UserLineIcon className="w-6 h-6" />
        </span>
        <div className="flex-grow flex flex-col ml-4">
          <span className="text-xl font-bold">{usersCount}</span>
          <div className="flex items-center justify-between">
            <span className="text-gray-500">Number of Users</span>
          </div>
        </div>
      </div>
      <div className="flex items-center p-4 bg-[#F7F7F7] rounded-md">
        <span className="text-[#F2ACAA] bg-[#F2ACAA]/20 p-3 rounded-full">
          <ShoppingBagLineIcon className="w-6 h-6" />
        </span>
        <div className="flex-grow flex flex-col ml-4">
          <span className="text-xl font-bold">{productCount}</span>
          <div className="flex items-center justify-between">
            <span className="text-gray-500">Number of Products</span>
          </div>
        </div>
      </div>
      <div className="flex items-center p-4 bg-[#F7F7F7] rounded-md">
        <span className="text-[#F2ACAA] bg-[#F2ACAA]/20 p-3 rounded-full">
          <MoneyDollarCircleLineIcon className="w-6 h-6" />
        </span>
        <div className="flex-grow flex flex-col ml-4">
          <span className="text-xl font-bold">{orderCount}</span>
          <div className="flex items-center justify-between">
            <span className="text-gray-500">Number of Orders</span>
          </div>
        </div>
      </div>
    </div>
  )
}
