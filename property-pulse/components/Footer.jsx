import Image from 'next/image'
import React from 'react'
import logo from '@/assets/images/logo.png'

const Footer = () => {
    const currentYear = new Date().getFullYear();
  return (
    <footer class="bg-gray-200 py-4 mt-24">
      <div
        class="container mx-auto flex flex-col md:flex-row items-center justify-between px-4"
      >
        <div class="mb-4 md:mb-0">
          <Image src={logo} alt="Logo" class="h-8 w-auto" />
        </div>
        
        <div>
          <p class="text-sm text-gray-500 mt-2 md:mt-0">
            &copy; {currentYear} PropertyPulse. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
