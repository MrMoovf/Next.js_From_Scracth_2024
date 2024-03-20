
import cloudinary from "@/config/cloudinary";
import connectDB from "@/config/database"
import Property from "@/models/Property";
import { getSessionUser } from "@/utils/getSessionUser";


// GET - /api/properties/user/[user_id]

export const GET = async (request, {params: {user_id}}) => {
    try {
        if(!user_id){
            return new Response('Error finding user', {status:404});
        }
        await connectDB();
    
        const properties = await Property.find({owner: user_id});
    
        return new Response(JSON.stringify(properties),{status:200});
    } catch (error) {
        return new Response('Error',{status:500})
    }
}
