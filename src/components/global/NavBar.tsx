import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { userActions } from '../../redux/slices/userSlice'
import RightNavBar from './RightNavBar'
import SecondNavBar from './SecondNavBar'
import swal from 'sweetalert'
import useUserState from '../../hooks/useUserState'
import useProductState from '../../hooks/useProductState'
import { RootState } from '../../redux/store'

export default function NavBar() {
  const {user, isLoggedIn} = useSelector((state: RootState)=> state.users)
  const { cartLength } = useProductState()

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [isOpen, setIsOpen] = useState(false)

  const handleMenuItemClick = () => {
    setIsOpen(false)
  }

  const toggleDropdown = () => {
    setIsOpen(!isOpen)
  }
  //** Logout Handler */
  const logoutHandler = () => {
    swal({
      title: 'Logout',
      text: 'Are you sure you want to logout?',
      icon: 'warning',
      dangerMode: true,
      buttons: ['Cancel', 'Logout']
    }).then((isOk) => {
      if (isOk) {
        setIsOpen(false)
        dispatch(userActions.logoutSuccess())
        navigate('/login')
      }
    })
  }

  return (
    <header>
      <nav className="bg-[#F7F7F7]">
        <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
          <div className="relative flex h-16 items-center justify-between">
            <RightNavBar />
            <div className="absolute inset-y-0 right-0 gap-2 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
              {/* Cart */}
              <Link to="/cart">
                <button
                  className="py-4 px-1 relative border-2 border-transparent p-1 text-gray-400 hover:text-gray-600 rounded-full focus:outline-none transition duration-150 ease-in-out"
                  aria-label="Cart">
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path>
                  </svg>
                  {cartLength > 0 && (
                    <span className="absolute inset-0 object-right-top -mr-6">
                      <div className="inline-flex items-center px-1.5 py-0.5 rounded-full text-xs font-semibold leading-4 bg-red-600 text-white">
                        {cartLength}
                      </div>
                    </span>
                  )}
                </button>
              </Link>
              <Link to="/wishlist">
                <button
                  className="py-4 px-1 relative border-2 border-transparent p-1 text-gray-400 hover:text-gray-600 rounded-full focus:outline-none transition duration-150 ease-in-out"
                  aria-label="Wishlist">
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"></path>
                  </svg>
                </button>
              </Link>
              {isLoggedIn ? (
                <>
                  {/* Profile */}
                  <div className="relative">
                    <button
                      type="button"
                      className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none"
                      onClick={toggleDropdown}>
                      <span className="absolute -inset-1.5" />
                      <img
                        className="h-8 w-8 rounded-full"
                        src="https://images.unsplash.com/photo-1632324343640-86af9827dbeb?auto=format&fit=crop&q=80&w=3087&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                        alt=""
                      />
                    </button>

                    {isOpen && (
                      <div className="absolute right-0 mt-2 py-2 w-48 bg-white rounded-md shadow-lg">
                        <Link to="/profile" onClick={handleMenuItemClick}>
                          <button
                            type="button"
                            className="block px-4 py-2 text-gray-800 hover:bg-gray-200 w-full text-left">
                            Profile
                          </button>
                        </Link>

                        {user?.role === 'ADMIN' && (
                          <Link
                            onClick={handleMenuItemClick}
                            className="block px-4 py-2 text-gray-800 hover:bg-gray-200 w-full text-left"
                            to="admin-dashboard">
                            Admin Dashbaord
                          </Link>
                        )}

                        <button
                          type="button"
                          className="block px-4 py-2 text-red-600 hover:bg-gray-200 w-full text-left"
                          onClick={logoutHandler}>
                          Logout
                        </button>
                      </div>
                    )}
                  </div>
                </>
              ) : (
                // Login
                <Link
                  className="text-gray-800 bg-gray-100 hover:bg-[#3f415a] hover:text-white inline-flex items-center justify-center px-3 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm "
                  to="/login">
                  Log in
                </Link>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Second NavBar */}
      <SecondNavBar />
    </header>
  )
}
