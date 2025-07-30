import React from 'react'

const page = () => {
  return (
    <div className='flex flex-col justify-center items-center md:p-5'>
        {/* overall notes section */}
        <div className='flex flex-col justify-center items-center gap-8'>

            <div className='text-center'>
                <h1 className='text-4xl font-bold'>
                    Create Note
                </h1>
                <p className='text-gray-500 font-semibold'>
                    Capture your thoughts and ideas
                </p>
            </div>

            {/* acutal notes section */}
            <div className='p-5 rounded-lg border border-gray-300 shadow-md'>
                <div className='flex flex-col gap-8'>

                    {/* title */}
                    <div className='flex flex-col'>
                        <label htmlFor="title">
                            Title
                        </label>
                        <input
                            type="text" 
                            id='title' 
                            placeholder='Write note title'
                            className='border border-gray-300 rounded-lg p-2 focus:outline-none text-black font-semibold'
                        />
                    </div>

                    {/* content */}
                    <div className='flex flex-col'>
                        <label htmlFor="content">
                            Content
                        </label>
                        <textarea
                        id="content"
                        placeholder='Write your note here'
                        className='border border-gray-300 rounded-lg min-h-40 w-80 sm:min-h-50 sm:w-140 md:min-h-72 md:w-175 p-2 focus:outline-none font-normal'
                        />
                    </div>

                    <div className='flex justify-end gap-4'>
                        <button
                            type='reset'
                            className='p-1 sm:p-2 text-gray-600 rounded-lg border border-gray-400 px-4'
                        >
                            Clear
                        </button>

                        <button 
                            type='submit'
                            className='bg-blue-500 rounded-lg text-yellow-100 p-1 sm:p-2 px-2'
                        >
                            Save Note
                        </button>
                    </div>

                </div>
            </div>
        </div>
    </div>
  )
}

export default page
