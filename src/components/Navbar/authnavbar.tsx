import React from 'react'
import Logo from "@/components/logo"
import { getServerSession } from 'next-auth'
import LogoutButton from '../buttons/logoutButton'

const AuthNavbar = async () => {

  const session = await getServerSession();
  const name = (session?.user.name)?.split(" ")[0]

  return (
    <nav className='flex justify-between items-center p-4 border-b border-gray-200 sm:px-10'>
        <Logo />
      <span className='text-lg sm:text-2xl font-black text-blue-500'>Welcome {name}</span>
      <LogoutButton />
    </nav>
  )
}

export default AuthNavbar