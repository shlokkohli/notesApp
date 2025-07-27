import React from 'react'
import { FileText } from 'lucide-react';
import Link from 'next/link';

const Logo = () => {
  return (
    <Link href="/" className="flex items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-50 rounded-md">
        <div className='bg-blue-500 rounded-lg sm:h-10 sm:w-10 h-8 w-8 flex justify-center items-center'>
            <FileText className='text-white sm:h-8 sm:w-8 h-6 w-6' />
        </div>
        <span className='font-black sm:text-2xl text-lg'>NotesApp</span>
    </Link>
  )
}

export default Logo