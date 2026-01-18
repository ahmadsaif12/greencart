import React, { useEffect } from 'react'
import { useAppContext } from '../../context/AppContext'
import { useLocation } from 'react-router-dom'

const Loading = () => {
    const { navigate } = useAppContext()
    const { search } = useLocation()
    
    // Extract the "next" parameter from the URL
    const query = new URLSearchParams(search)
    const nextUrl = query.get('next')

    useEffect(() => {
        if (nextUrl) {
            // Set a small delay (optional) or navigate immediately
            const timer = setTimeout(() => {
                navigate(nextUrl)
            }, 1500) // 1.5 seconds delay to show the spinner

            return () => clearTimeout(timer) // Cleanup timer on unmount
        }
    }, [nextUrl, navigate])

    return (
        <div className='flex flex-col justify-center items-center h-screen gap-4'> 
            {/* Spinner */}
            <div className='animate-spin rounded-full h-20 w-20 border-4 border-gray-200 border-t-orange-500'></div>
            
            {/* Optional Loading Text */}
            <p className='text-gray-400 text-xs font-bold uppercase tracking-[0.2em] animate-pulse'>
                Loading Page...
            </p>
        </div>
    )
}

export default Loading