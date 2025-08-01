import connectDB from "@/lib/connectDB";
import UserModel from "@/models/User";
import bcrypt from "bcryptjs";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions : NextAuthOptions = {
    providers: [
        // I can choose many providers, like credentials, google, github, facebook, etc. etc.
        CredentialsProvider({
            // id is like a unique name that we give to each provider, like for google -> 'GoogleProvider', now when the frontend will send a request to sign in, the url or name it is being sent should be same as 'id' here
            id : "credentials",

            // the name field is just the name shown on the UI (if we're using the default NextAuth sign-in page).
            name : "Email",
            credentials: {
                email : {label : "Email", type : "text" },
                password : {label : "Password", type : "password" }
            },
            // create an async authorize functio is where i will write the actual loginIn logic
            async authorize(credentials : any) : Promise<any> {

                // first connect to the database and find the user
                await connectDB();

                try {
                    // if the user does not exist, ask them to sign up
                    const user = await UserModel.findOne({ email : credentials.email })

                    if(!user){
                        throw new Error("User does not exist")
                    }

                    // if the user is found, compare its password from the password in the database
                    const isPasswordCorrect = await bcrypt.compare(credentials.password, user.password);

                    if(!isPasswordCorrect){
                        throw new Error("Incorrect password");
                    }

                    if(isPasswordCorrect){
                        return {
                            _id : user._id,
                            name : user.name,
                            email : user.email
                        }
                    }

                } catch (error : any) {
                    throw new Error(error);
                }

            }
        })
    ],
    callbacks: {
        // the token here is the jwt token that is going to get retuned at the end
        async jwt({ token, user }) {

            if(user){
                token._id = user._id
                token.name = user.name;
                token.email = user.email;
            }

            return token;

        },
        async session({ token, session }) {

            if(token){
                session.user._id = token._id,
                session.user.name = token.name;
                session.user.email = token.email;
            }

            return session;

        },

    },
    pages: {
        signIn: "login"
    },
    session: {
        strategy: "jwt"
    },
    secret : process.env.NEXTAUTH_SECRET
}