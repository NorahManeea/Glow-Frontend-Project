import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { AppDispatch } from "../../redux/store"
import { fetchOrderHistoryThunk } from "../../redux/slices/orderSlice"

export default function OrdersPage() {
  const dispatch = useDispatch<AppDispatch>()
  useEffect(()=>{
    dispatch(fetchOrderHistoryThunk())
  },[])
  return (
    <div className="grid gap-4 md:gap-8 p-4 md:p-6">
    <h1 className="text-2xl font-semibold">Order History</h1>
    {/* ORDERS */}
   
  </div>

  )
}
