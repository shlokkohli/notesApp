import React from 'react'
import Logo from "@/components/logo"

const AuthNavbar = () => {
  return (
    <nav className='flex justify-between items-center p-4 border-b border-gray-200 sm:px-10'>
        <Logo />
      <span className='text-lg sm:text-2xl font-black text-blue-500'>Welcome Shlok Kohli</span>
      <button className='bg-red-500 text-white rounded-lg sm:font-bold sm:p-2 p-1 px-2 font-semibold'>
        Logout
      </button>
    </nav>
  )
}

export default AuthNavbar