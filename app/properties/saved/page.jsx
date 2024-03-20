'use client'
import PropertyCard from '@/components/PropertyCard';
import Spinner from '@/components/Spinner';
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';

const SavedPropertiesPage = () => {
    const [bookmarkedProperties, setBookmarkedProperties] = useState([]);
    const [loading, setLoading] = useState([]);

    useEffect( ()=>{
        const getSavedProperties = async () => {
            try {
                const res = await fetch('/api/bookmarks');

                if(res.ok){
                    const data = await res.json();
                    setBookmarkedProperties(data);
                }else{
                    console.log(res.statusText);
                    toast.error('Error getting saved properties')
                }
                
            } catch (error) {
                console.log(error);
                toast.error('Error getting saved properties')
                
            }finally{
                setLoading(false);
            }
        }
        getSavedProperties();
    },[])
    console.log(bookmarkedProperties);
    
    return loading 
    ? ( <Spinner loading={loading} /> )
    : (
        <section className="px-4 py-6">
                <h2 className='mx-auto text-3xl text-center'>Saved properties</h2>
				<div className="container-xl lg:container m-auto px-4 py-6">
					{bookmarkedProperties.length === 0 ? (<p>No properties found</p>) : (
						<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
							{bookmarkedProperties.map( property => {
								return <PropertyCard key={property._id} property={property} />
							})}
						</div>

					)}
					
				</div>
			</section>
    )
}

export default SavedPropertiesPage
