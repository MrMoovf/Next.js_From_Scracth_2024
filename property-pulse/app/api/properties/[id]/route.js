import connectDB from "@/config/database"
import Property from "@/models/Property";

// GET /api/properties/[id]
export const GET = async (request, {params: {id}}) => {
    try {
        await connectDB;
        const property = await Property.findById(id)
        if(!property){
            return new Response('No property found', {status:404});
        }

        console.log(property);

        return new Response(JSON.stringify(property),{status:200});
        
    } catch (error) {
        return new Response('Error',{status:500})
    }
}