import React from 'react'
import { assets } from '../assets/assets'
import { Link } from 'react-router-dom'

const MainBanner = () => {
  return (
    <div className='relative'>
      {/* Background Images */}
      <img src={assets.main_banner_bg} alt="main-banner" className='w-full hidden md:block' />
      <img src={assets.main_banner_bg_sm} alt="main-banner" className='w-full md:hidden' />

      {/* Banner Text */}
      <div className='absolute top-1/3 left-1/2 transform -translate-x-1/2 text-center px-4'>
        <h1 className='text-3xl md:text-5xl font-extrabold text-black leading-snug md:leading-tight drop-shadow-md'>
          Freshness you can trust,<br /> Freshness you can love
        </h1>
      </div>

      {/* Buttons */}
      <div className='absolute bottom-16 left-1/2 transform -translate-x-1/2 flex flex-col md:flex-row gap-4'>
        <Link 
          to='/products' 
          className='group flex items-center gap-2 px-7 md:px-9 py-3 bg-primary hover:bg-primary-dull transition rounded text-white font-semibold shadow-md hover:shadow-lg'
        >
          Shop Now
          <img 
            src={assets.white_arrow_icon} 
            alt="arrow" 
            className='md:hidden transition group-hover:translate-x-1'
          />
        </Link>

        <Link 
          to='/products' 
          className='group flex items-center gap-2 px-7 md:px-9 py-3 border border-gray-800 text-black rounded font-semibold hover:bg-gray-100 transition shadow-md hover:shadow-lg'
        >
          Explore Deals
          <img 
            src={assets.black_arrow_icon} 
            alt="arrow" 
            className='transition group-hover:translate-x-1'
          />
        </Link>
      </div>
    </div>
  )
}

export default MainBanner
