import cloudinary from "@/config/cloudinary";
import connectDB from "@/config/database"
import Property from "@/models/Property";
import { getSessionUser } from "@/utils/getSessionUser";



// GET - /api/properties
export const GET = async (request) =>{
    try {
        await connectDB();

        const page = await request.nextUrl.searchParams.get('page') || 1;
        const pageSize = await request.nextUrl.searchParams.get('pageSize') || 10;

        const skip = (page - 1)*pageSize;


        const total = await Property.countDocuments({});
        
        const properties = await Property.find({}).skip(skip).limit(pageSize);


        const result = {
            total,
            properties
        }

        return new Response(JSON.stringify({result}),{status:200})
    } catch (error) {
        return new Response('Error',{status:500})
        
    }
}


// POST - /api/properties
export const POST = async (request) => {
    try {
        await connectDB();
        
        const sessionUser = await getSessionUser();

        if(!sessionUser || !sessionUser.userId){
            return new Response('Unauthorized - no session',401)

        }

        const {userId} = sessionUser;


        const formData = await request.formData();

        const amenities = formData.getAll('amenities');
        const images = formData.getAll('images').filter( image => image.name !== 'undefined');

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

        // uploading images to Cloudinary
        const imageUploadPromises = [];
        
        for(const image of images){
            const imageBuffer = await image.arrayBuffer();
            const imageArray = Array.from(new Uint8Array(imageBuffer));
            const imageData = Buffer.from(imageArray);

            // convert the image data to base64
            const imageBase64 = imageData.toString('base64');

            // make request to upload this info to cloudinary
            const result = await cloudinary.uploader.upload(
                `data:image/png;base64,${imageBase64}`,{
                    folder: 'propertyPulse'
                }
            )
            imageUploadPromises.push(result.secure_url);


        }

        // wait for all images to upload
        const uploadedImages = await Promise.all(imageUploadPromises
            );
        property.images = uploadedImages;


        // Upload finished model to DB
        const newProperty = new Property(property);
        await Property.create(newProperty);

        console.log(newProperty);


        // return new Response(JSON.stringify({property}), {status: 200})
        return  Response.redirect(`${process.env.NEXTAUTH_URL}/properties/${newProperty._id}`)
    } catch (error) {
        console.log(error);
        return new Response(JSON.stringify({message:'Failed to add property', error}), {status: 500})
        
    }
}