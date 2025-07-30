'use client'
import { signOut } from 'next-auth/react'
import React from 'react'

const LogoutButton = () => {
  return (
      <button
        onClick={() => signOut({callbackUrl: '/'})}
        className='bg-red-500 text-white rounded-lg sm:font-bold sm:p-2 p-1 px-2 font-semibold cursor-pointer active:bg-red-400'>
          Logout
      </button>
  )
}

export default LogoutButton