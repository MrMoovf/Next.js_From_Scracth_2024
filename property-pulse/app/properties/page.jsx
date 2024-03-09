import Link from 'next/link'
import React from 'react'
import properties from '@/data/properties';

const PropertiesPage = () => {
	return (
		<div>
			<section class="px-4 py-6">
				<div class="container-xl lg:container m-auto px-4 py-6">
					<div class="grid grid-cols-1 md:grid-cols-3 gap-6">
						{properties.map( property => {
							return <div>
								{property.name}
							</div>
						})}
					</div>
				</div>
			</section>

		</div>
	)
}

export default PropertiesPage
