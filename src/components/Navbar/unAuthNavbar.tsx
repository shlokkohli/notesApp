import React from 'react'
import Logo from "@/components/logo"
import { useRouter } from 'next/navigation'

const UnAuthNavbar = () => {

  const router = useRouter();

  return (
    <nav className='flex justify-between items-center p-4 border-b border-gray-200 sm:px-10 min-h-[70]'>
      <Logo />
      <div className='flex md:gap-8 gap-2'>
        <button
          onClick={() => router.replace('/login')}
          className='bg-blue-500 text-white rounded-lg text-sm sm:font-bold sm:p-2 p-1 px-2 font-semibold focus:outline-none cursor-pointer'>
          Login
        </button>
        <button
          onClick={() => router.replace('/sign-up')}
          className='text-gray-600 hover:text-white hover:bg-blue-500 transition-all duration-150 hover:scale-108 rounded-lg text-sm sm:p-2 p-1 px-2 font-light focus:outline-none cursor-pointer'>
          Sign Up
        </button>
      </div>
    </nav>
  )
}

export default UnAuthNavbar