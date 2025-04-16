import { NextRequest, NextResponse } from "next/server";
import connectMongoDB from "../../../../../config/mongodb";
import User from "@/models/userSchema";
import mongoose from "mongoose";

interface RouteParams {
    params: {
        id: string;
    }
}
/**
 * GET api to fetch a specific user by ID from the MongoDB database
 * @param param1 - Param object with id
 * @returns - The user data for the specific id or error message
 * @throws - If there is an error in fetching the user
 */
export async function GET({params}:RouteParams) {
    try {
        const {id} = params;
        await connectMongoDB();
        const user = await User.findOne({_id: id});
        if (!user) {
            return NextResponse.json({message: "User not found"}, {status: 404});
        }
        return NextResponse.json(user);
    } catch (error) {
        alert("Error fetching user: " + error + "\n Please try again.");
        console.error("Error fetching user: ", error);
        return NextResponse.json({message: "Error fetching user"}, {status: 500});
    }
}

/**
 * PUT api to update a specific user by ID in the MongoDB database
 * @param request - The incoming request
 * @param param1 - Param object with ID
 * @returns - Message indicating whether the user was updated successfully or not
 * @throws - If there is an error in updating the user
 */
export async function PUT(request: NextRequest, {params}:RouteParams) {
    try {
        const {id} = params;
        const {email: email, firstName: firstName, lastName: lastName, username: username, password: password} = await request.json();
        await connectMongoDB();
        const user = await User.findByIdAndUpdate(id, {
            email,
            firstName,
            lastName,
            username,
            password
        });
        
        if (!user) {
            return NextResponse.json({message: "User not found"}, {status: 404});
        }

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return NextResponse.json({message: "Invalid ID format"}, {status: 400});
        }
        return NextResponse.json({message: "User updated successfully"});
    } catch (error) {
        alert("Error updating user: " + error +"\n Please try again.");
        console.error("Error updating user:", error);
        return NextResponse.json({message: "Error updating user"}, {status: 500});
    }
}

/**
 * Delete API to remove a specific user by their ID from the MongoDB database
 * @param param1 Param with id
 * @returns Response indicating success or failure of deletion
 * @throws Error if there is an issue with the deletion process
 */
export async function DELETE({params}: RouteParams) {
    try {
        const {id} = params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return NextResponse.json({message: "Invalid ID format"}, {status: 400});
        }
        await connectMongoDB();
        const deletedItem = await User.findByIdAndDelete(id);
        if (!deletedItem) {
            return NextResponse.json({message: "Item not found"}, {status: 404});
        }
        return NextResponse.json({message: "User was successfully deleted"});
    } catch (error) {
        alert("Error deleting user: " + error + "\n Please try again.");
        console.error("Error deleting user:", error);
        return NextResponse.json({message: "Error deleting user"}, {status: 500});
    }
}