import './App.css'

import { Route, Routes, Navigate } from 'react-router-dom'

// Components
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
import ProfilePage from './pages/profile/ProfilePage'
import OrdersTable from './components/admin/OrdersTable'
import UsersTable from './components/admin/UsersTable'
import ProductsTable from './components/admin/ProductsTable'
import OrdersPage from './pages/profile/OrdersPage'
import useUserState from './hooks/useUserState'
import ForgotPassword from './pages/forms/ForgotPassword'
import Wishlist from './pages/wishlist/Wishlist'
import CategoryTable from './components/admin/CategoryTable'
import ResetPassword from './pages/forms/ResetPassword'
import DiscountCodeTable from './components/admin/DiscounCodeTable'

function App() {
  const { isAdmin } = useUserState()

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

        <Route path="/cart" element={<CartPage />} />
        <Route path="/wishlist" element={<Wishlist />} />

        <Route path="/profile/:id" element={<ProfilePage />} />
        <Route path="/orders" element={<OrdersPage />} />

        {/* Admin Dashboard */}
        <Route path="admin-dashboard">
          <Route index element={isAdmin() ? <ProductsTable /> : <Navigate to="/" />} />
          <Route path="orders" element={isAdmin() ? <OrdersTable /> : <Navigate to="/" />} />
          <Route path="users" element={isAdmin() ? <UsersTable /> : <Navigate to="/" />} />
          <Route path="categories" element={isAdmin() ? <CategoryTable /> : <Navigate to="/" />} />
          <Route path="discount-code" element={isAdmin() ? <DiscountCodeTable /> : <Navigate to="/" />} />


          <Route path="products" element={<ProductsTable />} />
        </Route>
        <Route path="products">
          <Route index element={<ProductPage />} />
          <Route path=":id" element={<ProductDetails />} />
        </Route>
        {/* Not Found */}
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App
