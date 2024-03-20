'use client'
import React, { useEffect, useState } from 'react'
import PropertyCard from './PropertyCard'
import Pagination from './Pagination';

const Properties =  () => {
    const [properties, setProperties] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(3);
    const [totalItems, setTotalItems] = useState(0);
    
    // Getting properties
	// const data = await fetchProperties();
    // const properties = data.properties;

    useEffect( ()=>{
        const getProperties = async()=>{
            try {
                const res = await fetch(`/api/properties?page=${page}&pageSize=${pageSize}`);
                if(res.ok){
                    const data = await res.json();
                    setProperties(data.result.properties);
                    setTotalItems(data.result.total);
                }
            } catch (error) {
                console.log(error);
            }finally{
                setLoading(false);
            }
            
        }
        getProperties();
    },[page])


  return (
    <section className="px-4 py-6">
        <div className="container-xl lg:container m-auto px-4 py-6">
            {properties.length === 0 ? (<p>No properties found</p>) : (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {properties.map( property => {
                        return <PropertyCard key={property._id} property={property} />
                    })}
                </div>

            )}
            
        <Pagination 
        page={page} 
        setPage={setPage} 
        totalItems={totalItems}
        pageSize={pageSize}
        />

        </div>
    </section>
  )
}

export default Properties
