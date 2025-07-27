import React from 'react'
import {LucideIcon } from 'lucide-react'

interface FeatureCardProps {
  icon : LucideIcon,
  heading : string,
  description : string,
  bgColor : string,
  textColor : string
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon : Icon, heading, description, bgColor, textColor }) => {
  return (
    <div className='w-full rounded-lg flex flex-col justify-center items-center p-6 mx-auto shadow-lg border border-gray-200'>

      <div className={`${bgColor} rounded-lg sm:h-10 sm:w-10 h-8 w-8 flex justify-center items-center`}>
        <Icon className={`${textColor}  sm:h-8 sm:w-8 h-6 w-6`} />
      </div>

      <div className='mt-2'>
        <h2 className='text-xl font-bold text-center'>
          {heading}
        </h2>
        <p className='text-center text-gray-600'>
          {description}
        </p>
      </div>

    </div>
  )
}

export default FeatureCard