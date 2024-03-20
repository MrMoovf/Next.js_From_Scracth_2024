import connectDB from "@/config/database"
import Property from "@/models/Property";


// GET /api/properties/featured
export const GET = async ( request )=> {
    try {
        await connectDB();
        
        const featuredProperty = await Property.find({is_featured: true});

        return new Response(JSON.stringify(featuredProperty),{status:200})
    } catch (error) {
        console.log(error)
        return new Response('Error',{status:500})
    }
}