import connectDB from '@/config/database';
import User from '@/models/User';
import GoogleProvider from 'next-auth/providers/google';

export const authOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            authorization: {
                params: {
                prompt: "consent",
                access_type: "offline",
                response_type: "code"
                }
            }
    })
    ],
    callbacks: {
        // Invoked on successful sign in
        async signin ({profile}){
            console.log('This is the signin function');
            console.log('This is the signin function');
            console.log('This is the signin function');
            console.log('This is the signin function');
            console.log('This is the signin function');
            console.log('This is the signin function');
            console.log('This is the signin function');
            console.log('This is the signin function');

            // 1. Connect to DB
            await connectDB();


            // 2. check if user that logged in exists
            const userExists = await User.findOne({email: profile.email});
            console.log('This is user exists:');
            console.log(userExists);


            // 3. If not, add user to db
            if(!userExists){
                // Truncate username becuase it can be too long sometimes
                const username = profile.name.slice(0,20);

                await User.create({
                    email: profile.email,
                    username,
                    image: profile.picture
                });
            }
            // 4. Return true to allow the sign in
            return true;

        },
        // Modifies the session object
        async sessionss ({session}){
            // 1. Get user from DB
            await connectDB();
            console.log('this is session user email');
            console.log(session.user.email);
            const user = await User.findOne({email: session.user.email});

            // 2. Asign the user id to the session
            session.user.id = user._id.toString();


            // 3. return that session
            return session;

        }

    }
}