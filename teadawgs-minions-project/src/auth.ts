/* eslint-disable @typescript-eslint/no-explicit-any */
import { authConfig } from "../config/auth.config";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import User from "./models/userSchema";
import connectMongoDB from "../config/mongodb";

export const {
    handlers: {GET, POST},
    auth,
    signIn,
    signOut,
} = NextAuth({
    ...authConfig,
    providers: [
        CredentialsProvider({
            credentials: {
                email: {},
                password: {},
            },
            async authorize(credentials) {
                if (!credentials) return null;

                try {
                    await connectMongoDB();
                    const user = await User.findOne({email: credentials.email}).lean();

                    if (user) {
                        const isMatch = await bcrypt.compare(
                            credentials.password as string,
                            user.password
                        );
                        
                        if (isMatch) {
                            return {
                                id: user._id.toString(),
                                email: user.email,
                                name: user.username
                            };
                        } else {
                            console.log("Incorrect credentials!");
                            return null;
                        }
                    } else {
                        console.log("User not found");
                        return null;
                    }
                } catch (error) {
                    console.log("An error occured: ", error);
                    return null;
                }
            }
        })
    ],
    callbacks: {
        async session({session, token}: {session: any, token: any}) {
            session.user.id = token.id as string;
            return session;
        },
        async jwt({token, user}) {
            if (user) {
                token.id = user.id;
            }
            return token;
        }
    }
})