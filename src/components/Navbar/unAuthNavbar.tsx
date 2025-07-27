import React from 'react'
import Logo from "@/components/logo"

const UnAuthNavbar = () => {
  return (
    <nav className='flex justify-between items-center p-4 border-b border-gray-200 sm:px-10 min-h-[70]'>
      <Logo />
      <button className='bg-blue-500 text-white rounded-lg sm:font-bold sm:p-2 p-1 px-2 font-semibold focus:outline-none cursor-pointer'>
        Get Started
      </button>
    </nav>
  )
}

export default UnAuthNavbar