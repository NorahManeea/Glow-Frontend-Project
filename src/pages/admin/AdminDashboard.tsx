import React from 'react'
import AdminSideBar from '../../components/admin/AdminSideBar'
import Widget from '../../components/widget/Widget'
import ProductsTable from '../../components/admin/ProductsTable'

export default function AdminDashboard() {
  return (
    <div className="flex">
      <AdminSideBar />
      <div className="w-3/4 bg-white p-4">
        <Widget/>
      </div>

    </div>
  )
}
