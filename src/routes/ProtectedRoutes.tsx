import { Navigate, Outlet } from "react-router-dom"
import useUserState from "../hooks/useUserState"

export default function ProtectedRoutes() {
  const { isAdmin } = useUserState()

return (
  isAdmin() ? <Outlet/>: <Navigate to="/admin-dashboard"/>
)
}