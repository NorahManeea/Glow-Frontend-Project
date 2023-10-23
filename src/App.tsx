import './App.css'
import { Route, Routes } from 'react-router-dom'

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

function App() {
  return (
    <div className="App">
      <NavBar />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

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
