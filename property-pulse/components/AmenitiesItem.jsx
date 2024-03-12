import React from 'react'

const AmenitiesItem = ({amenity}) => {
    return (
        <li>
            <i className="fas fa-check text-green-600 mr-2 mt-3"></i> {amenity}
        </li>
    )
}

export default AmenitiesItem
