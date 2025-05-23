import { NextRequest, NextResponse } from "next/server";
import connectMongoDB from "../../../../config/mongodb";
import User from "@/models/userSchema";
import bcrypt from "bcryptjs";

/** 
 * POST api to create a new user in the MongoDB database
 * @param {NextRequest} request - The incoming request object
 * @returns {NextResponse} - Response whether the user was created successfully or not
 * @throws {Error} - If there is an error during user creation
*/
export async function POST(request: NextRequest) {
    try {
        const {email, firstName, lastName, username, password} = await request.json();
        await connectMongoDB();
        const emailExists = await User.findOne({email: email});
        const usernameExists = await User.findOne({username: username});
        if (emailExists) {
            return NextResponse.json({message: "Email already in use!"}, {status: 403});
        } else if (usernameExists) {
            return NextResponse.json({message: "Username already exists!"}, {status: 403});
        }
        const hashedPassword = await bcrypt.hash(password, 5);
        await User.create({
            email,
            firstName,
            lastName,
            username,
            password: hashedPassword
        });
        return NextResponse.json({message: "User created successfully!"}, {status: 201});
    } catch (error) {
        console.error("Error creating user:", error);
        return NextResponse.json({message: "Error creating user"}, {status: 500});
    }
}