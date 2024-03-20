import React from 'react'
import PropertyCard from '@/components/PropertyCard';
import { fetchProperties } from '@/utils/requests';
import Properties from '@/components/Properties';


const PropertiesPage = async () => {

	return (
		<div>
			<Properties/>

		</div>
	)
}

export default PropertiesPage
