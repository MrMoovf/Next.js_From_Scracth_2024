import connectDB from "@/config/database"
import User from "@/models/User";
import { getSessionUser } from "@/utils/getSessionUser";


export const POST = async (request) => {
    try {
        // connect to db
        await connectDB();

        // get property id
        const {property_id} = await request.json();


        // get the session user
        const sessionUser = await getSessionUser();
        if(!sessionUser || !sessionUser.userId){
            return new Response('Error user not found',{status:402});
        }

        // get user id
        const {userId} = sessionUser;

        // get user from DB
        const user = await User.findById(userId);

        // check if property is already bookmarked
        let isBookmarked = user.bookmark.includes(property_id);


        return new Response(JSON.stringify({isBookmarked}),{status:200});

        
    } catch (error) {
        console.log(error);
        return new Response('Error',{status:501});
        
    }
}