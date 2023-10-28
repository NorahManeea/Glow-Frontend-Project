import React, { useEffect } from 'react'
import { AppDispatch, RootState } from '../../redux/store'
import { useDispatch, useSelector } from 'react-redux'
import { userActions } from '../../redux/slices/users/userSlice'
import api from '../../api'
import AdminSideBar from './AdminSideBar'
import useUserState from '../../hooks/useUserState'

export default function UsersTable() {
  
  const dispatch = useDispatch<AppDispatch>()
  const {isLoading, users} = useUserState();
  useEffect(() => {
    handleGetProducts()
  }, [])

  const handleGetProducts = async () => {
    dispatch(userActions.userRequest())

    const res = await api.get('/mock/e-commerce/users.json')
    dispatch(userActions.userSuccess(res.data))
    console.log(res.data)
  }

  const filteredUsers = users.filter((item) => item.role !== 'admin');

  return (
    <div className="flex">
      <AdminSideBar />
      <div className="w-3/4 bg-white p-4">
        <div className=" rounded-lg overflow-hidden mx-4 md:mx-10">
          {isLoading && <h3> Loading users...</h3>}
          <div className="flex items-center mb-3">
            <h2 className="text-2xl font-bold text-gray-800 lg:text-3xl">Users Table</h2>
          </div>

          <table className="w-full table-fixed border">
            <thead>
              <tr className="bg-gray-100">
                <th className="w-1/7 py-4 px-6 text-left text-gray-600 font-bold">Count</th>
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
                    <button className="mr-1 text-white bg-blue-600 rounded-md hover:bg-blue-500 focus:outline-none focus:shadow-outline-blue active:bg-blue-600 py-2 px-4 font-small"
                      onClick={() => dispatch(userActions.banUser({ userId: item.id }))}
                                          >
                      {item.ban ? "Un-ban" : "Ban" }
                    </button>
                    <button
                      onClick={() => dispatch(userActions.removeUser({ userId: item.id }))}
                      className="text-white bg-red-600 rounded-md hover:bg-red-500 focus:outline-none focus:shadow-outline-blue active:bg-red-600 py-2 px-4 font-small">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
