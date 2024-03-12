const apiDomain = process.env.NEXT_PUBLIC_API_DOMAIN || null;

const fetchProperties = async () => {
	try {
        // handle the case where the domain is not available yet
        if(!apiDomain){
            return [];
        }
		const res = await fetch(`${apiDomain}/properties`)
		if(!res.ok){
			throw new Error('Failed to fetch data');
		}
		let data = await res.json();
		data = data.properties;

		return data;
	} catch (error) {
        return [];
		
	}
}

const fetchProperty = async (id) => {
    try {
        if(!apiDomain){
            return null;
        }

        const res = await fetch(`${apiDomain}/properties/${id}`);
        if(!res.ok){
            throw new Error('Failed to fetch data');
        }

        let data = await res.json();

        return data;
    } catch (error) {
        return null
        
    }
}

export {fetchProperties, fetchProperty};