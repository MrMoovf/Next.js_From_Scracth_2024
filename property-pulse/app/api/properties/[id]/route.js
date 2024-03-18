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

// PUT /api/properties/[id]
export const PUT = async (request, {params: {id}}) => {
    try {
        await connectDB();
        
        const sessionUser = await getSessionUser();

        if(!sessionUser || !sessionUser.userId){
            return new Response('Unauthorized - no session',401)

        }

        const {userId} = sessionUser;

        const formData = await request.formData();

       

        // acces all values from amenities
        const amenities = formData.getAll('amenities');

        // get property to update
        const existingProperty = await Property.findById(id);

        // Check if property is found
        if(!existingProperty){
            return new Response('Not found',{status:404});
        }

         // check if user owns property;
         if(userId != existingProperty.owner.toString()){
            return new Response('Unauthorized',{status:401});
        }

        const property = {
            type: formData.get('type'),
            name: formData.get('name'),
            description: formData.get('description'),
            location: {
                street: formData.get('location.street'),
                city: formData.get('location.city'),
                state: formData.get('location.state'),
                zipcode: formData.get('location.zipcode'),
            },
            beds: formData.get('beds'),
            baths: formData.get('baths'),
            square_feet: formData.get('square_feet'),
            amenities,
            rates:{
                nightly: formData.get('rates.nightly'),
                weekly: formData.get('rates.weekly'),
                monthly: formData.get('rates.monthly'),
            },
            seller_info:{
                name: formData.get('seller_info.name'),
                email: formData.get('seller_info.email'),
                phone: formData.get('seller_info.phone'),

            },
            owner: userId,
        }

        // update property in DB 
        const updatedProperty = await Property.findByIdAndUpdate(id,property);

        console.log(updatedProperty);
        

        return new Response(JSON.stringify({updatedProperty}), {status: 200})
    } catch (error) {
        console.log(error);
        return new Response(JSON.stringify({message:'Failed to add property', error}), {status: 500})
        
    }

}