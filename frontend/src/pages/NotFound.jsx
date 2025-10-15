import React from 'react'
import { Link } from 'react-router'
const NotFound = () => {
  return (
    <div className='flex flex-col items-center justify-center min-h-screen text-center bg-slate-50'>
        <img src="404_NotFound.png" alt="not Found" className='max-w-full mb-6 w-96'/>
        <p className='text-xl font-semibold'>
            Page Not Found 🚫
        </p>
        <Link to={"/"} className='inline-block px-6 py-3 mt-6 font-medium text-white transition shadow-md bg-primary rounded-2xl hover:bg-primary-dark'>
            Quay về trang chủ        
        </Link>
    </div>
  )
}

export default NotFound