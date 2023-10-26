import React from 'react'
import { Outlet, useLocation } from 'react-router-dom'

import {  useSelector } from 'react-redux'
import {  RootState } from '../redux/store'
import Login from '../pages/forms/Login'


export default function AdminRoutes() {
  const location = useLocation();

    const state = useSelector((state: RootState) => state)
    const isLoggedIn = state.users.isLoggedIn
    const userData = state.users.userData

  return (
    isLoggedIn && userData?.role === 'admin' ? <Outlet/>: <Login pathName ={location.pathname}/>
  )
}
