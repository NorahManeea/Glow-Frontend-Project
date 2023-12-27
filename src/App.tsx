import './App.css'

import { useEffect, useState } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { checkExpiry } from './utils/token'

//** Components */
import NavBar from './components/global/NavBar'
import Footer from './components/global/Footer'
import AboutPage from './pages/about/AboutPage'
import ContactPage from './pages/contact/ContactPage'
import Login from './pages/forms/Login'
import Register from './pages/forms/Register'
import ProductPage from './pages/products/ProductPage'
import NotFound from './pages/notFound/NotFound'
import ProductDetails from './components/products/ProductDetails'
import HomePage from './pages/home/HomePage'
import CartPage from './pages/cart/CartPage'
import OrdersTable from './components/admin/orders/OrdersTable'
import UsersTable from './components/admin/users/UsersTable'
import ProductsTable from './components/admin/products/ProductsTable'
import ForgotPassword from './pages/forms/ForgotPassword'
import Wishlist from './pages/wishlist/Wishlist'
import CategoryTable from './components/admin/categories/CategoryTable'
import ResetPassword from './pages/forms/ResetPassword'
import DiscountCodeTable from './components/admin/discountCodes/DiscounCodeTable'
import OrderDetails from './components/admin/orders/OrderDetails'
import ProtectedRoutes from './routes/ProtectedRoutes'
import ProfilePage from './pages/profile/ProfilePage'
import InternetStatus from './components/common/InternetStatus'
import Dashboard from './pages/admin/Dashboard'
import CheckoutPage from './pages/checkout/CheckoutPage'
import ActivationSuccess from './components/activation/ActivationSuccess'
import OrderSuccessPage from './pages/checkout/OrderSuccessPage'

function App() {
  const [isOnline, setIsOnline] = useState(navigator.onLine)

  useEffect(() => {
    function onlineHandler() {
      setIsOnline(true)
    }

    function offlineHandler() {
      setIsOnline(false)
    }

    window.addEventListener('online', onlineHandler)
    window.addEventListener('offline', offlineHandler)

    return () => {
      window.removeEventListener('online', onlineHandler)
      window.removeEventListener('offline', offlineHandler)
    }
  }, [])

  const isTokenExpired = checkExpiry()

  if (isTokenExpired) {
    ;<Navigate to="/login" />
  }
  if (!isOnline) {
    return <InternetStatus />
  }

  return (
    <div className="App">
      <NavBar />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />

        <Route path="/login" element={<Login />} />
        <Route path="/reset-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:userId/:token" element={<ResetPassword />} />
        <Route path="/register" element={<Register />} />
        <Route path="/activation-success/:actiationToken" element={<ActivationSuccess />} />

        <Route path="/cart" element={<CartPage />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/order-success" element={<OrderSuccessPage />} />

        <Route path="/profile/:id" element={<ProfilePage />} />

        {/* Admin Dashboard */}
        <Route path="admin-dashboard" element={<ProtectedRoutes />}>
          <Route index element={<Dashboard />} />
          <Route path="products" element={<ProductsTable />} />

          <Route path="orders" element={<OrdersTable />} />
          <Route path="orders/:id" element={<OrderDetails />} />
          <Route path="users" element={<UsersTable />} />
          <Route path="categories" element={<CategoryTable />} />
          <Route path="discount-code" element={<DiscountCodeTable />} />
        </Route>
        {/* Product */}
        <Route path="products">
          <Route index element={<ProductPage />} />
          <Route path=":id" element={<ProductDetails />} />
        </Route>
        {/* 404 Not Found */}
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App
