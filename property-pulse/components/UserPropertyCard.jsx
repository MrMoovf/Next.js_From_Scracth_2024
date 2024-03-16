import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const UserPropertyCard = ({property}) => {

    const handlePropertyDelete = ()=>{
        console.log(property._id);
    }

    return (
        <div className="mb-10">
            <Link href={`/properties/${property._id}`}>
            <Image
                className="h-32 w-full rounded-md object-cover"
                src={property.images[0]}
                width={2000}
                height={2000}
                alt={`Property ${property._id}`}                
                />
            </Link>
            <div className="mt-2">
                <p className="text-lg font-semibold">{property.name}</p>
                <p className="text-gray-600">{property.location.street}</p>
            </div>
            <div className="mt-2">
                <Link href={`/properties/${property._id}/edit`}
                    className="bg-blue-500 text-white px-3 py-3 rounded-md mr-2 hover:bg-blue-600"
                >
                    Edit
                </Link>
                <button
                    onClick={()=>{handlePropertyDelete()}}
                    className="bg-red-500 text-white px-3 py-2 rounded-md hover:bg-red-600"
                    type="button"
                >
                    Delete
                </button>
            </div>
        </div>
    )
}

export default UserPropertyCard
