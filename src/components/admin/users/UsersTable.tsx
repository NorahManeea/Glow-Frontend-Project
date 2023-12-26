import { useEffect } from 'react'
import './user-table.css'
import swal from 'sweetalert'
import { toast } from 'react-toastify'
//** Redux */
import { AppDispatch } from '../../../redux/store'
import { useDispatch } from 'react-redux'
import {
  blockUserThunk,
  deleteUserThunk,
  fetchUsersThunk,
  grantUserRoleThunk
} from '../../../redux/slices/userSlice'
//** Components */
//** Custom Hooks */
import useUserState from '../../../hooks/useUserState'
//** Components */
import AdminSideBar from '../AdminSideBar'
import CustomLoader from '../../global/CustomLoader'

export default function UsersTable() {
  const dispatch = useDispatch<AppDispatch>()

  const { users, isLoading } = useUserState()

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
  //** Block User Handler */
  const handleBlockBtnClick = (id: string) => {
    dispatch(blockUserThunk(id))
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

  if (isLoading) {
    return (
      <section className="text-gray-700 body-font overflow-hidden bg-white mx-auto my-56">
        <div className="container px-5 py-20 mx-auto">
          <div className="text-center">
            <CustomLoader />
          </div>
        </div>
      </section>
    )
  }

  return (
    <div className="flex">
      <AdminSideBar />
      <div className="w-3/4 bg-white p-4">
        <div className="flex items-center my-5">
          <h3 className="text-2xl font-semibold leading-none tracking-tight flex-grow text-[#32334A]">
            Users Table
          </h3>
        </div>

        <table className="w-full table-fixed border">
          <thead className="[&_tr]:border-b">
            <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
              <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground w-[50px]">
                #
              </th>
              <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground w-[250px]">
                Email
              </th>
              <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground w-[150px]">
                Name
              </th>
              <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground w-[100px]">
                Role
              </th>
              <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground w-[120px]">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {users.map((item, index) => (
              <tr key={item._id} className="border-b border-gray-200">
                <td className="py-4 px-6">{index + 1}</td>
                <td className="py-4 px-6">{item.email}</td>
                <td className="py-4 px-6">{item.firstName}</td>
                <td className="py-4 px-6">
                  <button
                    onClick={() => handleGrantRoleBtnClick(item._id)}
                    className=" rounded-full border px-2.5 py-0.5 w-fit text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent hover:bg-primary/80">
                    <div className={`cellWithRole ${item.role}`}>{item.role}</div>
                  </button>
                </td>
                <td className="py-4 px-6 whitespace">
                  {!item.isBlocked ? (
                    <button
                      onClick={() => handleBlockBtnClick(item._id)}
                      className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 w-10 mr-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        className="w-4 h-4">
                        <circle cx="12" cy="12" r="10"></circle>
                        <path d="m4.9 4.9 14.2 14.2"></path>
                      </svg>
                    </button>
                  ) : (
                    <button
                      onClick={() => handleBlockBtnClick(item._id)}
                      className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 w-10 mr-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        className="w-4 h-4">
                        <circle cx="12" cy="12" r="10"></circle>
                        <path d="M8 12h8"></path>
                      </svg>
                    </button>
                  )}
                  <button
                    onClick={() => handleDeleteBtnClick(item._id)}
                    className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 w-10 text-red-500">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width={24}
                      height={24}
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="w-4 h-4">
                      <path d="M3 6h18" />
                      <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                      <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                    </svg>
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
