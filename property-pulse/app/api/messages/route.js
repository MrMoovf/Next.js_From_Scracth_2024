import connectDB from "@/config/database"
import Message from "@/models/Message";
import { getSessionUser } from "@/utils/getSessionUser";

// /api/messages
export const POST = async (request) => {
    try {
        await connectDB();
        const { name, email, phone, message, property, recipient } = await request.json();
        // console.log(request.json());
        // {
        //     name: 'Anders',
        //     email: 'anders@kozuch.dk',
        //     phone: '12341234',
        //     message: 'Hej den ser fed ud',
        //     recipient: '123',
        //     property: '345',
        //     sender: 'asdsad'
        // };

        // console.log(request);

        // return new Response(JSON.stringify({message:'its me'}), {status:500});


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