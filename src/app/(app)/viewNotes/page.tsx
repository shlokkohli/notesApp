import Note from '@/components/Card/Note'
import React from 'react'

const page = () => {
  return (
    <div className='grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4 mt-2 p-6 place-items-center'>
      <Note />
    </div>
  )
}

export default page