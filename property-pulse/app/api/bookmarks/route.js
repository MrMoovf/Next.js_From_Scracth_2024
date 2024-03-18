import connectDB from "@/config/database"
import Property from "@/models/Property";
import User from "@/models/User";
import { getSessionUser } from "@/utils/getSessionUser";


export const GET = async (request) => {
    try {
        await connectDB();

        // get the session user
        const sessionUser = await getSessionUser();
        if(!sessionUser || !sessionUser.userId){
            return new Response('Error user not found',{status:402});
        }

        // get user id
        const {userId} = sessionUser;

        // get user from DB
        const user = await User.findById(userId);

        const bookmarkedProperties = await Property.find({_id: {$in: user.bookmark}});

        console.log(bookmarkedProperties)


        return new Response(JSON.stringify(bookmarkedProperties),{status:200});


    } catch (error) {
        console.log(error);
        return new Response('Error',{status:501});
        
    }
}

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

        // instantiating message
        let message;

        // check if property is already bookmarked
        let isBookmarked = user.bookmark.includes(property_id);

        if(isBookmarked){
            user.bookmark.pull(property_id);
            message = 'Bookmark removed successfully'
            isBookmarked = false;
        }
        else{
            user.bookmark.push(property_id);
            message = 'Bookmark added successfully'
            isBookmarked = true;
        }

        // update user
        await user.save();

        return new Response(JSON.stringify({message, isBookmarked}),{status:200});

        
    } catch (error) {
        console.log(error);
        return new Response('Error',{status:501});
        
    }
}

