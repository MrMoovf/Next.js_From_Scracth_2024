import connectDB from "@/config/database"
import Property from "@/models/Property";
import { getSessionUser } from "@/utils/getSessionUser";

// GET /api/properties/[id]
export const GET = async (request, {params: {id}}) => {

    try {
        connectDB();

        const property = await Property.findById(id)
        if(!property){
            return new Response('No property found', {status:404});
        }

        return new Response(JSON.stringify(property),{status:200});
        
    } catch (error) {
        return new Response('Error',{status:500})
    }
}

// DELETE /api/properties/[id]
export const DELETE = async (request, {params: {id}}) => {
    try {
        const sessionUser = await getSessionUser();

        // Check for session
        if(!sessionUser || !sessionUser.userId){
            return new Response('User ID missing', {status:401});
        }

        const {userId} = sessionUser;

        // Connect to db
        await connectDB();
        const property = await Property.findById(id)

        // Check if session user owns property
        if(property.owner.toString() !== userId){
            console.log(property.owner);
            console.log(userId);
            return new Response('Unauthorized', {status:401});
        }

        await property.deleteOne();


        return new Response(JSON.stringify({message:'Property Deleted'}),{status:200});
        
    } catch (error) {
        return new Response(error,{status:500})
    }
    

}