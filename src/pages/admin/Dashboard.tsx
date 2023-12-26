import { Navigate } from 'react-router-dom'
import { checkExpiry } from '../../utils/token'
//** Components */
import Widget from '../../components/widget/Widget'
import AdminSideBar from '../../components/admin/AdminSideBar'

export default function Dashboard() {
  //** Check if Token Expired or not */
  const isTokenExpired = checkExpiry()

  if(isTokenExpired){
    <Navigate to="/login"/>
  }
  
  return (
    <div className="flex">
    <AdminSideBar />
    <div className="w-4/5 bg-white p-4">
      <Widget />
      <div className="flex flex-1 items-center justify-center pb-4"></div>
    </div>
  </div>
  
  )
}
