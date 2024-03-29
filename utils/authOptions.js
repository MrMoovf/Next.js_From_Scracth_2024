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
        async signIn ({profile}){

            // 1. Connect to DB
            await connectDB();


            // 2. check if user that logged in exists
            const userExists = await User.findOne({email: profile.email});


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
        async session ({session}){
            // 1. Get user from DB
            await connectDB();
            const user = await User.findOne({email: session.user.email});

            // 2. Asign the user id to the session
            session.user.id = user._id.toString();
            session.user.image = user.image;


            // 3. return that session
            return session;

        }

    }
}