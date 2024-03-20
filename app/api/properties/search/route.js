import connectDB from "@/config/database"
import Property from "@/models/Property";


export const GET = async(request) => {
    try {
        await connectDB();

        const {searchParams} = new URL(request.url);
        const location = searchParams.get('location')
        const property_type = searchParams.get('propertyType')
        console.log(searchParams);

    
        console.log(location,property_type);
        console.log(property_type)

        const locationPattern = new RegExp(location, 'i');
        console.log(locationPattern);

        // location field query
        const query = {
                $or: [
                    {name: locationPattern},
                    {description: locationPattern},
                    {'location.street': locationPattern},
                    {'location.city': locationPattern},
                    {'location.state': locationPattern},
                    {'location.zipcode': locationPattern},
                ]
        }

        // only check for property if it is NOT all
        if(property_type != 'All' && property_type){
            const typePattern = new RegExp(property_type, 'i');
            query.type = typePattern;
        }

        // Get properties from search
        const properties = await Property.find(query);
        return new Response(JSON.stringify(properties), {status:200})
    } catch (error) {
        console.log(error);
        return new Response('Error on our side',{status:500})
        
    }
}