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
import AdminDashboard from './pages/admin/AdminDashboard'
import OrdersTable from './components/admin/OrdersTable'
import Category from './components/admin/CategoryTable'
import UsersTable from './components/admin/UsersTable'
import ProtectedRoutes from './routes/ProtectedRoutes'
import ProductsTable from './components/admin/ProductsTable'
import { NewProductWrapper } from './components/NewProductWrapper'
import OrdersPage from './pages/profile/OrdersPage'
import FilterProducts from './components/products/FilterProducts'
import useUserState from './hooks/useUserState'

function App() {
  const { isLoggedIn, userData } = useUserState()

  return (
    <div className="App">
      <NavBar />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />

        <Route path="/login" element={<Login pathName="/login" />} />
        <Route path="/register" element={<Register />} />

        <Route path="/cart" element={<CartPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/orders" element={<OrdersPage />} />
        <Route path="/filter" element={<FilterProducts />} />

        {/* Admin Dashboard */}
        <Route path="admin-dashboard">
          <Route
            index
            element={userData?.role === 'admin' ? <AdminDashboard /> : <Navigate to="/" />}
          />
          <Route
            path="orders"
            element={userData?.role === 'admin' ? <OrdersTable /> : <Navigate to="/" />}
          />
          <Route
            path="users"
            element={userData?.role === 'admin' ? <UsersTable /> : <Navigate to="/" />}
          />
          <Route
            path="categories"
            element={userData?.role === 'admin' ? <Category /> : <Navigate to="/" />}
          />

          <Route path="products" element={<ProductsTable />} />
          <Route path="new-product" element={<NewProductWrapper />} />
        </Route>
        {/* Products Routes */}
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
