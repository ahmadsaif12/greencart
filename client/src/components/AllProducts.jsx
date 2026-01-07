import React, { useEffect, useState } from 'react'
import { useAppContext } from '../context/AppContext'
import ProductCard from '../components/ProductCard'

const AllProducts = () => {
  const { products, searchQuery } = useAppContext()
  const [filteredProducts, setFilteredProducts] = useState([])

  useEffect(() => {
    const query = searchQuery?.trim().toLowerCase()

    if (query) {
      setFilteredProducts(
        products.filter(product =>
          product.name.toLowerCase().includes(query)
        )
      )
    } else {
      setFilteredProducts(products)
    }
  }, [products, searchQuery])

  return (
    <div className="mt-12 flex flex-col">
      <div className="text-2xl font-medium w-max">
        <p className="text-2xl font-medium uppercase">All Products</p>
        <div className="w-16 h-0.5 bg-primary rounded-full"></div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3  md:gap-3 lg:grid-cols-5 mt-7">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <ProductCard
              key={product._id}
              product={product}
            />
          ))
        ) : (
          <p className="text-gray-500 col-span-full text-center">
            No products found
          </p>
        )}
      </div>
    </div>
  )
}

export default AllProducts
