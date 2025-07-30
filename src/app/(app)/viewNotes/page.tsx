import Note from '@/components/Card/Note';
import Link from 'next/link';
import React from 'react';

const page = () => {
  return (
    <div className='p-6'>

      {/* Create Note Button */}
      <div className='flex justify-end mb-4'>
        <Link href="/createNote">
          <button className='bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 active:scale-95 transition'>
            + Create Note
          </button>
        </Link>
      </div>

      {/* Notes Grid */}
      <div className='grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4 place-items-center'>
        <Note />
      </div>
    </div>
  );
};

export default page;
