'use client'
import React from 'react'
import ClipLoader from 'react-spinners/ClipLoader'

const Spinner = ({loading, size = 150, mx = '100px', color = '#3b82f6'}) => {

    const override = {
        display:'block',
        margin:`${mx} auto`
    }
  return (
    <>
        <ClipLoader
        className='mx-auto'
        color={color}
        loading={loading}
        cssOverride={override}
        size={size}
        aria-label='Loading Spinner'
        >

        </ClipLoader>
    </>
  )
}

export default Spinner
