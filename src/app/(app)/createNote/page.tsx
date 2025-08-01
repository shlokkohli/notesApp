'use client'
import { createNoteSchema } from '@/schemas/createNoteSchema';
import { ApiResponse } from '@/types/ApiResponse.types';
import { Note } from '@/types/notes.types';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import z from 'zod';

const page = () => {

    const [successMessage, setSuccessMessage] = useState("")
    const [serverError, setServerError] = useState("")
    const [isLoading, setIsLoading] = useState(false);

    const { register, handleSubmit, formState: {errors}, reset } = useForm<z.infer<typeof createNoteSchema>>({
        defaultValues: {
            title: '',
            content: '',
        },
        resolver: zodResolver(createNoteSchema)
    });

    const handleFormSubmit = async (data: z.infer<typeof createNoteSchema>) => {
        setIsLoading(true)

        try {

            const res = await fetch('/api/createNote', {
                method: "POST",
                headers: {
                    'Content-Type' : 'application/json'
                },
                body: JSON.stringify(data)
            })

            const response: ApiResponse<Note> = await res.json();

            if(response.success){
                setSuccessMessage(response.message)
                reset();
                setTimeout(() => {
                    setSuccessMessage("")
                }, 3000);
            } else {
                setServerError(response.message)
            }
                        
        } catch (error) {
            console.log("Some error occured", error);
        } finally{
            setIsLoading(false);
        }

    }

  return (
    <div className='md:p-5'>

      {/* Create Note Button */}
        <div className='flex justify-end pt-6 sm:pt-1'>
            <Link href="/viewNotes">
            <button className='bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 active:scale-95 transition'>
                View Notes
            </button>
            </Link>
        </div>

        {/* overall notes section */}
        <div className='flex flex-col justify-center items-center gap-8 sm:mt-0'>

            <div className='text-center'>
                <h1 className='text-4xl font-bold'>
                    Create Note
                </h1>
                <p className='text-gray-500 font-semibold'>
                    Capture your thoughts and ideas
                </p>
            </div>

            {/* acutal notes section */}
            <form onSubmit={handleSubmit(handleFormSubmit)}>
                <div className='p-5 rounded-lg border border-gray-300 shadow-md'>
                    <div className='flex flex-col gap-6'>

                        {/* title */}
                        <div className='flex flex-col gap-1'>
                            <label htmlFor="title">
                                Title
                            </label>
                            <input
                                type="text" 
                                id='title' 
                                placeholder='Write note title'
                                className='border border-gray-300 rounded-lg p-2 focus:outline-none text-black font-semibold'
                                {...register('title')}
                            />
                            {errors.title && <p className='text-sm text-red-500'>{errors.title.message}</p>}
                        </div>

                        {/* content */}
                        <div className='flex flex-col gap-1'>
                            <label htmlFor="content">
                                Content
                            </label>
                            <textarea
                            id="content"
                            placeholder='Write your note here'
                            className='border border-gray-300 rounded-lg min-h-40 w-80 sm:min-h-50 sm:w-140 md:min-h-72 md:w-175 p-2 focus:outline-none font-normal'
                            {...register('content')}
                            />
                            {successMessage && <p className='text-sm text-green-600'>{successMessage}</p>}
                            {serverError && <p className='text-sm text-red-500'>{serverError}</p>}

                        </div>

                        <div className='flex justify-end gap-4'>
                            <button
                                type='reset'
                                className='p-1 sm:p-2 text-gray-600 active:bg-gray-100 cursor-pointer rounded-lg border border-gray-400 px-4'
                            >
                                Clear
                            </button>

                            <button 
                                type='submit'
                                className={`active:bg-blue-600 ${isLoading ? "bg-blue-400" : "bg-blue-500"} rounded-lg cursor-pointer text-yellow-100 p-1 sm:p-2 px-2`}
                            >
                                Save Note
                            </button>
                        </div>

                    </div>
                </div>
            </form>

        </div>
    </div>
  )
}

export default page