import Link from 'next/link'
import React from 'react'

const page = () => {
  return (
    <div>
      <h1 className='text-3xl'>Go home</h1>
      <Link href={'/'}>Go back:)</Link>
    </div>
  )
}

export default page
