import React from 'react'
import ProductCard from './ProductCard'
import { useAppContext } from '../context/AppContext'

const BestSeller = () => {
  const { products, navigate } = useAppContext()

  if (!products || products.length === 0) return null

  return (
    <div className="mt-16">
      <p className="text-2xl md:text-3xl font-medium">Best Sellers</p>

      <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 gap-6">
        {products
          .filter(product => product.inStock)
          .slice(0, 7)
          .map(product => (
            <div
              key={product._id}
              className="cursor-pointer"
              onClick={() => {
                // Navigate to product page using category and id
                navigate(`/products/${product.category}/${product._id}`)
              }}
            >
              <ProductCard product={product} />
            </div>
          ))}
      </div>
    </div>
  )
}

export default BestSeller
