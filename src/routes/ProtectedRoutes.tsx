import React from 'react'
import { Outlet, useLocation } from 'react-router-dom'

import {  useSelector } from 'react-redux'
import {  RootState } from '../redux/store'
import Login from '../pages/forms/Login'

export default function ProtectedRoutes() {
  const location = useLocation();

    const state = useSelector((state: RootState) => state)
    const isLoggedIn = state.users.isLoggedIn
  return (
    isLoggedIn ? <Outlet/>: <Login/>
  )
}
