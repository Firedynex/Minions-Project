import { NextRequest, NextResponse } from "next/server";
import connectMongoDB from "../../../../config/mongodb";
import User from "@/models/userSchema";

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
        await User.create({
            email,
            firstName,
            lastName,
            username,
            password
        });
        return NextResponse.json({message: "User created successfully!"}, {status: 201});
    } catch (error) {
        alert("Error creating your account: " + error + "\n Please try again.");
        console.error("Error creating user:", error);
        return NextResponse.json({message: "Error creating user"}, {status: 500});
    }
}

