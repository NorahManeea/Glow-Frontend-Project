import React from 'react'
import AdminSideBar from '../../components/admin/AdminSideBar'

export default function AdminDashboard() {
  return (
    <div className="flex">
      <AdminSideBar />
      <div className="w-3/4 bg-white p-4">Main content</div>
    </div>
  )
}
