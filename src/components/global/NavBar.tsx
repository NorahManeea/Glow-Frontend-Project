import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { userActions } from '../../redux/slices/users/userSlice'
import { RootState } from '../../redux/store'
import RightNavBar from './RightNavBar'
import SecondNavBar from './SecondNavBar'

export default function NavBar() {
  const state = useSelector((state: RootState) => state)
  const isLoggedIn = state.users.isLoggedIn
  const userData = state.users.userData

  const cartLength = state.products.cartLength

  const navigate = useNavigate()
  const dispatch = useDispatch()

  // Logout
  const handleLogout = () => {
    dispatch(userActions.logout())
    navigate('/login')
  }
  return (
    <header>
      <nav className="bg-black">
        <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
          <div className="relative flex h-16 items-center justify-between">
            <RightNavBar />
            <div className="absolute inset-y-0 right-0 gap-2 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
              {isLoggedIn ? (
                <>
                  {/* Cart */}
                  <Link to="/cart">
                    <button
                      className="py-4 px-1 relative border-2 border-transparent  p-1 text-gray-400 hover:text-white rounded-full  focus:outline-none  transition duration-150 ease-in-out"
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
                      <span className="absolute inset-0 object-right-top -mr-6">
                        <div className="inline-flex items-center px-1.5 py-0.5 rounded-full text-xs font-semibold leading-4 bg-red-600 text-white">
                          {cartLength}
                        </div>
                      </span>
                    </button>
                  </Link>

                  {/* Profile */}
                  <Link to="/profile">
                    <button
                      type="button"
                      className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none">
                      <span className="absolute -inset-1.5" />
                      <img
                        className="h-8 w-8 rounded-full"
                        src="https://images.unsplash.com/photo-1632324343640-86af9827dbeb?auto=format&fit=crop&q=80&w=3087&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                        alt=""
                      />
                    </button>
                  </Link>

                  {/* Logout */}
                  <Link
                    className="text-gray-700 hover:text-gray-700 text-sm font-medium"
                    to="/login"
                    onClick={handleLogout}>
                    Logout
                  </Link>
                </>
              ) : (
                // Login
                <Link
                  className="text-gray-800 bg-gray-100 hover:bg-indigo-200 inline-flex items-center justify-center px-3 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm "
                  to="/login">
                  Log in
                </Link>
              )}
              {/* Dashbaord */}
              <Link
                className="text-gray-700 hover:text-gray-700 text-sm font-medium"
                to="admin-dashboard">
                Admin Dashbaord
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Second NavBar */}
      <SecondNavBar />
    </header>
  )
}
