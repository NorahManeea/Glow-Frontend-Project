import React from 'react'
import UserLineIcon from 'remixicon-react/UserLineIcon'
import ShoppingBagLineIcon from 'remixicon-react/ShoppingBagLineIcon'
import MoneyDollarCircleLineIcon from 'remixicon-react/MoneyDollarCircleLineIcon'
import useUserState from '../../hooks/useUserState'
import useProductState from '../../hooks/useProductState'
import useOrderState from '../../hooks/useOrderState'


export default function Widget() {
  const {users} = useUserState()
  const {products} = useProductState()
  const {orders} = useOrderState()


  return (
    <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-6 ">
      <div className="flex items-center p-4 bg-[#F7F7F7] rounded-md">
          <span className="text-[#F2ACAA] bg-[#F2ACAA]/20 p-3 rounded-full">
            <UserLineIcon className="w-6 h-6" />
          </span>
        <div className="flex-grow flex flex-col ml-4">
          <span className="text-xl font-bold">{users.length}</span>
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
          <span className="text-xl font-bold">{products.length}</span>
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
          <span className="text-xl font-bold">{orders.length}</span>
          <div className="flex items-center justify-between">
            <span className="text-gray-500">Number of Orders</span>
          </div>
        </div>
      </div>
    </div>
  )
}
