import GoogleProvider from 'next-auth/providers/google';

export const authOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            // Authorization basically allows that we always get to switch google users in the login screen
            authorization: {
                params: {
                  prompt: "consent",
                  access_type: "offline",
                  response_type: "code"
                }
              }
        }),
    ],
    callbacks: {
        // Invoked on successful sign in
        async signin ({profile}){
            // 1. Connect to DB
            // 2. check if user that logged in exists
            // 3. If not, add user to db
            // 4. Return true to allow the sign in
        },
        // Modifies the session object
        async session ({session}){
            // 1. Get user from DB
            // 2. Asign the user id to the session
            // 3. return that session
        }

    }
}