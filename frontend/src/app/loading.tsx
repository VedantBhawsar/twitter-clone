'use client'
import React from 'react'
import { InfinitySpin } from 'react-loader-spinner'

const LoadingPage = () => {
  return (
    <div className='w-full h-screen z-10 bg-black absolute flex flex-col justify-center items-center'>
        <InfinitySpin
        color='#fff'
        width='200'
        />
        <p className='text-white font-bold'>Loading...</p>
    </div>
  )
}

export default LoadingPage