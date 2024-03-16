import Image from 'next/image'
import React from 'react'

const PropertyImages = ({images}) => {
  return (
    <section className='bg-blue-50 p-4 mx-auto'>
        {images.length === 1 ? 
         <Image 
         className='object-cover h-[400px] mx-auto rounded-xl'
         src={images[0]}
         width={2400}
         height={400}
         />
         : 
         <div className='grid grid-cols-2 gap-2'>
            {images.map( (image, index) => (
                <div 
                key={index} 
                className={`
                    ${images.length == 3 && index == 2 
                    ? 'col-span-2'
                    : 'col-span-1'
                    }
                `} >
                    <Image
                    className='object-cover h-[400px] w-full rounded-xl'
                    src={image}
                    width={2400}
                    height={400}
                    alt='property pic'
                    sizes='100vw'

                    />
                </div>
            ) )}

         </div> }
    </section>
  )
}

export default PropertyImages
