import Image from 'next/image'
import React from 'react'
import {Gallery, Item} from 'react-photoswipe-gallery'

const PropertyImages = ({images}) => {
  return (
    <Gallery>

      <section className='bg-blue-50 p-4 mx-auto'>
          {images.length === 1 ? 
            <Item 
              original={images[0]}
              thumbnail={images[0]}
              width={1000}
              height={600}
            >
              {({ref, open}) => (
                <Image 
                ref={ref}
                onClick={open}
                className='object-cover h-[400px] mx-auto rounded-xl'
                src={images[0]}
                width={2400}
                height={400}
                />
              )}
            </Item>
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

                    <Item 
                    original={image}
                    thumbnail={image}
                    width={1000}
                    height={600}
                  >
                    {({ref, open}) => (
                      <Image
                      ref={ref}
                      onClick={open}
                      className='object-cover h-[400px] w-full rounded-xl'
                      src={image}
                      width={2400}
                      height={400}
                      alt='property pic'
                      sizes='100vw'

                      />
                    )}
                  </Item>
                      
                  </div>
              ) )}

          </div> }
      </section>
    </Gallery>
  )
}

export default PropertyImages
