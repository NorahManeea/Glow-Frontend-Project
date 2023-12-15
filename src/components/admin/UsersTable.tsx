import { useEffect } from 'react'
import swal from 'sweetalert'
import { toast } from 'react-toastify'
//** Redux */
import { AppDispatch, RootState } from '../../redux/store'
import { useDispatch, useSelector } from 'react-redux'
import { blockUserThunk, deleteUserThunk, fetchUsersThunk, grantUserRoleThunk } from '../../redux/slices/userSlice'
//** Components */
import AdminSideBar from './AdminSideBar'
//** Icons */
import DeleteBinLineIcon from 'remixicon-react/DeleteBinLineIcon'

export default function UsersTable() {
  const dispatch = useDispatch<AppDispatch>()
  const { users, isLoading } = useSelector((state: RootState) => state.users)

  //** Delete Handler */
  const handleDeleteBtnClick = (id: string) => {
    swal({
      title: 'Delete',
      text: 'Are you sure you want to delete?',
      icon: 'warning',
      dangerMode: true,
      buttons: ['Cancel', 'Delete']
    }).then((isOk) => {
      if (isOk) {
        dispatch(deleteUserThunk(id))
        toast.success('User has been deleted successfully')
      }
    })
  }

  //** Block Handler */
  const handleBlockBtnClick = (id: string) => {
    swal({
      title: 'Block',
      text: 'Are you sure you want to block user?',
      icon: 'warning',
      dangerMode: true,
      buttons: ['Cancel', 'Block']
    }).then((isOk) => {
      if (isOk) {
        dispatch(blockUserThunk(id))
        toast.success('User has been deleted successfully')
      }
    })
  }
    //** Grant Role Handler */
    const handleGrantRoleBtnClick = (id: string) => {
      swal({
        title: 'Grant Role',
        text: 'Are you sure you want to change role?',
        icon: 'warning',
        dangerMode: true,
        buttons: ['Cancel', 'Change Role']
      }).then((isOk) => {
        if (isOk) {
          dispatch(grantUserRoleThunk(id))
          toast.success('User role has been change successfully')
        }
      })
    }
  
  useEffect(() => {
    dispatch(fetchUsersThunk())
  }, [])

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
            {users.map((item, index) => (
              <tr key={item._id}>
                <td className="py-4 px-6 border-b border-gray-200">{index + 1}</td>
                <td className="py-4 px-6 border-b border-gray-200">{item.firstName}</td>
                <td className="py-4 px-6 border-b border-gray-200">

                <button
                    className="mr-1 text-blue-600 bg-blue-500/10 p-3 rounded-full"
                    onClick={() => handleGrantRoleBtnClick(item._id)}>
                    {item.role }
                  </button>
                </td>
                <td className="py-4 px-6 border-b border-gray-200">{item.email}</td>

                <td className="py-4 px-6 border-b border-gray-200 whitespace">
                  <button
                    className="mr-1 text-blue-600 bg-blue-500/10 p-3 rounded-full"
                    onClick={() => handleBlockBtnClick(item._id)}>
                    {item.isBlocked ? 'Un-block' : 'Block'}
                  </button>
                  <button
                    onClick={() => handleDeleteBtnClick(item._id)}
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
