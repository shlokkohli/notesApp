import React from 'react'

const Note = () => {
  return (
    <div className="border border-gray-300 p-4 rounded-lg shadow-md bg-gray-100 space-y-4 w-full">

      <div className='flex flex-col gap-1'>
        <h3 className="text-lg font-semibold">this is the title</h3>
        <p className="text-gray-700 max-h-[4.5rem] overflow-auto break-words">
          this is the content
        </p>
      </div>

      {/* button */}
      <div className='flex gap-2 justify-end flex-wrap'>
        <button className='bg-blue-500 rounded-lg p-1 px-2 text-sm text-white font-semibold cursor-pointer'>
          Edit
        </button>

        <button className='cursor-pointer bg-red-500 rounded-lg text-sm p-1 px-2 text-white font-semibold'>
          Delete
        </button>
      </div>

    </div>
  )
}

export default Note