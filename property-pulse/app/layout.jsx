import React from 'react'
import '@/assets/styles/globals.css'
import Navbar from '@/components/Navbar'
import AuthProvider from '@/components/AuthProvider'
import  {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Footer from '@/components/Footer';


export const metadata = {
    title: 'Property Pulse | Find The Perfect Rental',
    description: 'Find your dream rental property!',
    keywords: 'rentals, find rentals, find properties'
}

const MainLayout = ({children}) => {
    return (
        <AuthProvider>
            <html lang='en'>
                <body>
                    <Navbar/>
                    <main>  
                        {children}
                    </main>
                    <ToastContainer/>
                    <Footer/>
                </body>

            </html>
        </AuthProvider>
    )
}

export default MainLayout
