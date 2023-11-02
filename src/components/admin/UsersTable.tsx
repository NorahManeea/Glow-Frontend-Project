import React, { useEffect } from 'react'
import { AppDispatch, RootState } from '../../redux/store'
import { useDispatch, useSelector } from 'react-redux'
import { userActions } from '../../redux/slices/users/userSlice'
import api from '../../api'
import AdminSideBar from './AdminSideBar'
import useUserState from '../../hooks/useUserState'
import swal from 'sweetalert'
import DeleteBinLineIcon from 'remixicon-react/DeleteBinLineIcon'
import { toast } from 'react-toastify'
import { useFetchUsers } from '../../hooks/useDataFetching'

export default function UsersTable() {
  const dispatch = useDispatch<AppDispatch>()
  const { isLoading, users } = useUserState()
  useFetchUsers()
  
  const handleDeleteBtnClick = (id: number) => {
    swal({
      title: 'Delete',
      text: 'Are you sure you want to delete?',
      icon: 'warning',
      dangerMode: true,
      buttons: ['Cancel', 'Delete']
    }).then((isOk) => {
      if (isOk) {
        dispatch(userActions.removeUser({ userId: id }))
        toast.success('User deleted successfully')
      }
    })
  }

  const filteredUsers = users.filter((item) => item.role !== 'admin')

  return (
    <div className="flex">
      <AdminSideBar />
      <div className="w-3/4 bg-white p-4">
      {isLoading && <h3> Loading users...</h3>}
          <div className="flex items-center mb-3">
            <h2 className="text-2xl font-bold text-[#32334A] lg:text-3xl my-4">Users Table</h2>
          </div>

          <table className="w-full table-fixed border">
            <thead>
              <tr className="bg-[#F7F7F7]">
                <th className="w-1/7 py-4 px-6 text-left text-gray-600 font-bold">ID</th>
                <th className="w-1/5 py-4 px-6 text-left text-gray-600 font-bold">User Name</th>
                <th className="w-1/5 py-4 px-6 text-left text-gray-600 font-bold">Role</th>
                <th className="w-1/4 py-4 px-6 text-left text-gray-600 font-bold">Email</th>
                <th className="w-1/4 py-4 px-6 text-left text-gray-600 font-bold">Action</th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {filteredUsers.map((item, index) => (
                <tr key={item.id}>
                  <td className="py-4 px-6 border-b border-gray-200">{index + 1}</td>
                  <td className="py-4 px-6 border-b border-gray-200">{item.firstName}</td>
                  <td className="py-4 px-6 border-b border-gray-200">{item.role}</td>
                  <td className="py-4 px-6 border-b border-gray-200">{item.email}</td>

                  <td className="py-4 px-6 border-b border-gray-200 whitespace">
                    <button
                      className="mr-1 text-blue-600 bg-blue-500/10 p-3 rounded-full"
                      onClick={() => dispatch(userActions.banUser({ userId: item.id }))}>
                      {item.ban ? 'Un-ban' : 'Ban'}
                    </button>
                    <button
                      onClick={() => handleDeleteBtnClick(item.id)}
                      className="text-red-600 bg-red-500/10 p-3 rounded-full">
                      <DeleteBinLineIcon />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
      </div>
    </div>
  )
}
