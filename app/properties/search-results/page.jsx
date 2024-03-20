'use client'
import PropertyCard from '@/components/PropertyCard';
import PropertySearchForm from '@/components/PropertySearchForm';
import Spinner from '@/components/Spinner';
import { useParams, useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';

const SearchResultPage = () => {
    const searchParams = useSearchParams();

    const [resultProperties, setResultProperties] = useState([]);
    const [loading, setLoading] = useState(true);

    const location = searchParams.get('location');
    const property_type = searchParams.get('propertyType');

    useEffect(()=>{
        // enter the params into the search api
        const getSearchResults = async ()=>{
            setLoading(true);
            try {
                const res = await fetch(`/api/properties/search?location=${location}&propertyType=${property_type}`);
                if(res.ok){
                    const data = await res.json();
                    setResultProperties(data);
                }else{
                    setResultProperties([]);
                }
                
            } catch (error) {
                console.log(error);
                toast.error('Something went wrong!')
            }
            finally{
                
                setLoading(false);

            }


        }

        getSearchResults();

        

        // get response and .json() and return data
        
    },[location, property_type])
    return (
        <section className="px-4 py-6">
                <section className='bg-blue-100 py-6 m-2 rounded-md shadow-xl'>
                    <PropertySearchForm/>
                </section>
                
				{loading ? (

                    <Spinner loading={loading}/>

                )
                :
                <>
                    <div className="container-xl lg:container m-auto px-4 py-6">
					{resultProperties.length === 0 ? (<p>No properties found</p>) : (
						<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
							{resultProperties.map( property => {
								return <PropertyCard key={property._id} property={property} />
							})}
						</div>

					)}
				</div>
                </>
            
                }
        </section>
    )
}

export default SearchResultPage
