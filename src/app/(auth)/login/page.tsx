'use client'
import React, { useState } from 'react'
import { Eye, EyeOff, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import z from 'zod';
import { loginSchema } from '@/schemas/loginSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { signIn } from 'next-auth/react';

const page = () => {

  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [serverError, setServerError] = useState<string | null | undefined>(null);
  const router = useRouter();

  const {register, handleSubmit, formState: {errors} } = useForm<z.infer<typeof loginSchema>>({
    defaultValues: {
      email: '',
      password: ''
    },
    resolver: zodResolver(loginSchema)
  })

  const handleFormSubmit = async (data: z.infer<typeof loginSchema>) => {

    setIsLoading(true)

    try {

      const response = await signIn('credentials', {
        redirect: false,
        email: data.email,
        password: data.password
      })

      if(response?.ok){
        router.push('/viewNotes');
      } else {
        setServerError(response?.error);
      }
      
    } catch (error) {

      console.log("Login failed", error)
      
    } finally {
      setIsLoading(false);
    }

  }

  return (
    <div className='relative'>
      <button
        onClick={() => router.replace('/')}
        className='absolute top-5 left-10 cursor-pointer flex justify-center items-center gap-1 bg-blue-500 rounded-md text-white text-sm p-1 hover:scale-110 hover:bg-blue-600'
        >
        <ArrowLeft className='h-4 w-4' />
        <span>Back</span>
      </button>

      {/* sign up form */}
        <div className="flex justify-center items-center min-h-screen">
          <div className="p-10 max-w-md w-full rounded-lg shadow-md border border-gray-200">
            <h2 className='text-3xl font-bold text-center'>
              Login to <span className='bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent'>NotesApp</span>
            </h2>

            {/* actual signup form */}
            <form onSubmit={handleSubmit(handleFormSubmit)}>
              <div className='flex flex-col gap-7 py-10 px-4'>
                
                {/* email input */}
                <div className='flex flex-col gap-2'>
                  <label htmlFor="email" className='text-sm font-bold text-gray-600'>
                    Email
                  </label>
                  <input
                    {...register('email')}
                    type="email"
                    className='text-gray-700 border border-gray-300 rounded-md focus:border-gray-600 outline-none p-2 text-sm'
                  />
                  {errors.email && <p className='text-sm text-red-500'>{errors.email.message}</p>}
                </div>

                {/* password input */}
                <div className='flex flex-col gap-2'>
                  <label htmlFor="password" className='text-sm font-bold text-gray-600'>
                    Password
                  </label>

                  <div className='relative'>
                    <input
                      {...register('password')}
                      type={showPassword ? "text" : "password"}
                      className='text-gray-700 border w-full border-gray-300 rounded-md focus:border-gray-600 outline-none p-2 text-sm'
                      />
                    <button
                      type='button'
                      className='absolute right-2 top-2'
                      onClick={() => setShowPassword(prev => !prev)}
                    >
                      {showPassword ? (
                        <EyeOff className=' text-gray-400 cursor-pointer h-5 w-5' />
                      ): (
                        <Eye className=' text-gray-400 cursor-pointer h-5 w-5' />
                      )}
                    </button>
                  </div>
                  {errors.password && <p className='text-sm text-red-500'>{errors.password.message}</p>}
                </div>

                {/* submit button */}
                <button
                  type='submit'
                  className={`${isLoading ? 'bg-blue-300' : 'bg-blue-500 hover:bg-blue-600 active:scale-95'} rounded-lg text-gray-100 mt-2 p-1 duration-300 transition-all border focus-visible:border-blue-600 focus:outline-none cursor-pointer`}
                  disabled={isLoading}
                >
                  Login
                </button>

                {serverError && <p className='text-sm text-red-500'>{serverError}</p>}

              </div>
            </form>
            
            <p className='text-gray-500 text-sm text-center'>
              Don't have an account?{" "}
              <Link href={'/sign-up'}
                className='hover:underline cursor-pointer text-black'>
                Sign Up
            </Link>
            </p>
        </div>
      </div>
    </div>
  )
}

export default page