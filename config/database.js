import mongoose from 'mongoose';

let  connected = false;

const connectDB = async () => {
    mongoose.set('strictQuery',true);

    // if database is already connceted don't connect again
    if(connected){
        console.log('MongoDB is already connected');
        return;
    }

    // else connect
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        connected = true;
        console.log('Mongo DB connected!');
    } catch (error) {
        console.log(error);
        
    }
}

export default connectDB;