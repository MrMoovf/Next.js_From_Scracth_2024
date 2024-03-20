import connectDB from "@/config/database"
import Message from "@/models/Message";
import { getSessionUser } from "@/utils/getSessionUser";

export const dynamic = 'force-dynamic';

// GET /api/messages/unread-count
export const GET = async (request) => {
    try {
        await connectDB();
        const sessionUser = await getSessionUser();

        // Check for session
        if(!sessionUser || !sessionUser.user){
            return new Response('Unauthorized', {status:401});
        }


        const messages = await Message.find({read:false, recipient: sessionUser.userId});

        if(!messages){
            return new Response('Message not found', {status:404});

        }


        return new Response(JSON.stringify(messages),{status:200});


    } catch (error) {
        console.log(error);
        return new Response(JSON.stringify({message:'error'}),{status:500});
    }
}