import React from 'react'
import { ZapIcon } from 'lucide-react'

const RateLimited = () => {
  return (
    <div className='mx-auto max-w-6xl px-4 mt-8'>
      <div className='w-full bg-base-300 py-6 px-12 rounded-3xl flex items-center justify-start gap-9'>
        <div className='bg-base-200 p-3 rounded-full'>
            <ZapIcon className='size-15' />
        </div>
        <div className='flex flex-col justify-start'>
            <h1 className='font-bold text-2xl font-mono'>Too Many Requests</h1>
            <h2 className='font-semibold text-lg tracking-tight'>You have reached the rate limit.</h2>
            <h3 className='font-medium text-md'>Try again later for the best experience</h3>
        </div>
      </div>
    </div>
  )
}

export default RateLimited