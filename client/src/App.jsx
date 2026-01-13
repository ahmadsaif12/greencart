import React from 'react'
import Navbar from './components/Navbar'
import { Route, Routes, useLocation, Navigate } from 'react-router-dom'
import Home from './pages/Home'
import { Toaster } from 'react-hot-toast'
import Footer from './components/Footer'
import { useAppContext } from './context/AppContext'
import Login from './components/Login'
import AllProducts from './components/AllProducts'
import ProductCategories from './components/ProductCategories'
import ProductDetails from './pages/ProductDetails'
import Cart from './pages/Cart'
import AddAddress from './pages/AddAddress'
import MyOrder from './pages/MyOrder'
import SellerLogin from './components/seller/SellerLogin'
import SellerLayout from './pages/seller/SellerLayout'
import AddProduct from './pages/seller/AddProduct'
import ProductList from './pages/seller/ProductList'
import Orders from './pages/seller/Orders'

const App = () => {
  const location = useLocation(); 
  const isSellerPath = location.pathname.startsWith("/seller");
  const { showUserLogin, isSeller } = useAppContext();

  return (
    <div className='text-default bg-white text-gray-600 min-h-screen'> 
      {!isSellerPath && <Navbar />}
      {showUserLogin && <Login />}
      <Toaster />

      <div className={`${isSellerPath ? "" : 'px-6 md:px-16 lg:px-24 xl:px-32'}`}>
        <Routes>
          {/* Public routes */}
          <Route path='/' element={<Home />} />
          <Route path='/products' element={<AllProducts />} />
          <Route path='/products/:category' element={<ProductCategories />} />
          <Route path='/products/:category/:id' element={<ProductDetails />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/add-address' element={<AddAddress />} />
          <Route path='/my-orders' element={<MyOrder />} />

          {/* Seller routes */}
          <Route path='/seller' element={isSeller ? <SellerLayout /> : <SellerLogin />} >
            <Route index element={<AddProduct />} />
            <Route path='product-list' element={<ProductList />} />
            <Route path='orders' element={<Orders />} />
          </Route>

          {/* Optional: redirect unknown seller paths */}
          <Route path='/seller/*' element={<Navigate to='/seller' replace />} />
        </Routes>
      </div>

      {!isSellerPath && <Footer />}
    </div>
  )
}

export default App
