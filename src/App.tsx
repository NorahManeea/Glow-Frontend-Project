import './App.css'

import { Route, Routes } from 'react-router-dom'

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
import OrdersPage from './pages/profile/OrdersPage'
import ForgotPassword from './pages/forms/ForgotPassword'
import Wishlist from './pages/wishlist/Wishlist'
import CategoryTable from './components/admin/categories/CategoryTable'
import ResetPassword from './pages/forms/ResetPassword'
import DiscountCodeTable from './components/admin/discountCodes/DiscounCodeTable'
import CheckoutPage from './pages/cart/CheckoutPage'
import OrderDetails from './components/admin/orders/OrderDetails'
import ProtectedRoutes from './routes/ProtectedRoutes'
import ProfilePage from './pages/profile/ProfilePage'

function App() {

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
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/orders" element={<OrdersPage />} />
        <Route path="/profile/:id" element={<ProfilePage />} />

        {/* Admin Dashboard */}
        <Route path="admin-dashboard" element={<ProtectedRoutes />}>
          <Route index element={<ProductsTable />} />
          <Route path="orders" element={<OrdersTable />} />
          <Route path="orders/:id" element={<OrderDetails />} />
          <Route path="users" element={<UsersTable />} />
          <Route path="categories" element={<CategoryTable />} />
          <Route
            path="discount-code"
            element={<DiscountCodeTable />}
          />
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
