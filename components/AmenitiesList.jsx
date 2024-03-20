import React from 'react'
import AmenitiesItem from './AmenitiesItem'

const AmenitiesList = ({amenities}) => {
  return (

    <div className="bg-white p-6 rounded-lg shadow-md mt-6">
        <h3 className="text-lg font-bold mb-6">Amenities</h3>
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 list-none">
            {amenities.map( (amenity => {
                return <AmenitiesItem key={amenity} amenity={amenity} />
            }) )}      
                    
        </ul>
                

    </div>
  )
}

export default AmenitiesList
