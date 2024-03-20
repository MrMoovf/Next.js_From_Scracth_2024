import connectDB from "@/config/database"
import Message from "@/models/Message";
import { getSessionUser } from "@/utils/getSessionUser";

export const dynamic = 'force-dynamic';

// /api/messages
export const POST = async (request) => {
    try {
        await connectDB();
        const { name, email, phone, message, property, recipient } = await request.json();
    

        const sessionUser = await getSessionUser();

        if(!sessionUser || !sessionUser.user){
            return new Response(JSON.stringify({message:'Unauthorized'}), {status:401});
        }

        // Cannot send message to self
        if(sessionUser.userId == recipient){
            return new Response(JSON.stringify({message: 'Cannot send message to self'}), {status:400});
        }

        // make message
        const newMessage = new Message({
            sender: sessionUser.userId,
            recipient,
            property,
            name,
            email,
            phone,
            body: message
        })

        await newMessage.save();

        return new Response(JSON.stringify({message:'all good'}),{status:200});

    } catch (error) {
        console.log(error);
        return new Response(JSON.stringify({message:'error'}),{status:500});

        
    }
}


// /api/messages
export const GET = async (request) => {
    try {
        await connectDB();
        const sessionUser = await getSessionUser();

        if(!sessionUser || !sessionUser.user){
            return new Response(JSON.stringify({message:'Unauthorized'}), {status:401});
        }

        const messages = await Message.find({recipient: sessionUser.userId})
        .sort({createdAt: -1}) // sort  read messages in asc order
        .populate('sender','username')
        .populate('property','name');
        ;

        return new Response(JSON.stringify(messages),{status:200});


    } catch (error) {
        console.log(error)
        return new Response(JSON.stringify({message: 'Error in the catch'}),{status:500});

        
    }

}