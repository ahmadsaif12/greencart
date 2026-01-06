import React from 'react'
import { useAppContext } from '../context/AppContext'

const AllProducts = () => {
    const {products}=useAppContext();
  return (
    <div className='mt-12 flex flex-col'>
        <div className='text-2xl font-medium items-end w-max'>
            <p className='text-2xl font-medium uppercase'>All Products</p>
            <div className='w-16 h-0.5 bg-primary rounded-full'></div>
        </div>
      
    </div>
  )
}

export default AllProducts
