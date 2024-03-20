import connectDB from "@/config/database"
import Property from "@/models/Property";
import User from "@/models/User";
import { getSessionUser } from "@/utils/getSessionUser";

// Bookmark property to the User
export const POST = async (request, {params: {user_id, property_id}}) => {
    try {
        await connectDB();
        const sessionUser = await getSessionUser();
        const session_user_id =  sessionUser.userId;

        if(session_user_id != user_id){

            return new Response('Unauthorized',{status:401});
        }

        const user = await User.findById(user_id);
        
        const fieldsToUpdate = {
            bookmark: user.bookmark
        };

        const propertyIdToAdd = await Property.findById(property_id);

        if(fieldsToUpdate.bookmark.includes(propertyIdToAdd._id)){
            console.log('I AM ALREADY HEREREE');
            fieldsToUpdate.bookmark = fieldsToUpdate.bookmark.filter( item => item.toString() != propertyIdToAdd._id.toString());
            console.log(fieldsToUpdate.bookmark);

        }
        else{
            fieldsToUpdate.bookmark.push(propertyIdToAdd._id);

        }


        const updatedUser = await User.findByIdAndUpdate(user_id,fieldsToUpdate);

        return new Response(updatedUser,{status:200});

        
    } catch (error) {
        console.log(error);
        return new Response(error,{status:500});
    }
}