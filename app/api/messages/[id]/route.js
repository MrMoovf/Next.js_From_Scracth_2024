import connectDB from "@/config/database"
import Message from "@/models/Message";
import { getSessionUser } from "@/utils/getSessionUser";

export const dynamic = 'force-dynamic';

// PUT /api/messages/[id]

export const PUT = async (request, {params: {id}}) => {
    try {
        await connectDB();
        const sessionUser = await getSessionUser();



        // Check for session
        if(!sessionUser || !sessionUser.user){
            return new Response('Unauthorized', {status:401});
        }




        const message = await Message.findById(id);

        if(!message){
            return new Response('Message not found', {status:404});

        }

        if(message.recipient.toString() !== sessionUser.userId){
            return new Response('Unauthorized much', {status:401});

        }


        // acutally update
        message.read = !message.read

        // send update
        await message.save();

        return new Response(JSON.stringify(message),{status:200});

       


    } catch (error) {
        console.log(error);
        return new Response(JSON.stringify({message:'error'}),{status:500});
    }
}

// DELETE /api/messages/[id]
export const DELETE = async (request, {params: {id}}) => {
    try {
        await connectDB();
        const sessionUser = await getSessionUser();



        // Check for session
        if(!sessionUser || !sessionUser.user){
            return new Response('Unauthorized', {status:401});
        }

        const message = await Message.findById(id);

        if(!message){
            return new Response('Message not found', {status:404});

        }


        if(message.recipient.toString() !== sessionUser.userId){
            return new Response('Unauthorized much', {status:401});

        }


        // send update
        await message.deleteOne();
        

        return new Response('Message deleted',{status:200});

       


    } catch (error) {
        console.log(error);
        return new Response(JSON.stringify({message:'error'}),{status:500});
    }
}