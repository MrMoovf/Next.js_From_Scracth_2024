'use client'
import React, { useEffect, useState } from 'react'
import Spinner from './Spinner';
import PropertyCard from './PropertyCard';

const PropertyFeatured = () => {

    const [featured, setFeatured] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect( ()=>{
        const getFeaturedProperty = async()=>{
            try {
                const res = await fetch('/api/properties/featured');
                if(res.ok){
                    const data = await res.json();
                    setFeatured(data);
                }
            } catch (error) {
                console.log(error)
                
            } finally {
                setLoading(false);
            }
        }
        getFeaturedProperty();
    },[])

    useEffect( ()=>{
        console.log(featured);
    },[featured])

    
    if(featured.length == 0) return;

    return (
        <div className='text-center p-8  m-4 rounded-lg shadow-lg'>
            <h3 className='text-3xl text-gray-800 mb-4 font-semibold'>Featured properties</h3>
            {loading
            ?
                <> 
                    <Spinner loading={loading}/>
                </>
            :
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 '>
                    {featured.map( property => (
                        <PropertyCard property={property}/>
                    ))}

                </div>
            }
        </div>
    )
}

export default PropertyFeatured
