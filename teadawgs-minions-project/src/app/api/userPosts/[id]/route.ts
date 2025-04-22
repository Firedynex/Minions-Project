import { NextRequest, NextResponse } from "next/server";
import connectMongoDB from "../../../../../config/mongodb";
import mongoose from "mongoose";
import userPost from "@/models/userPostSchema";

interface RouteParams {
    params: {
        id: string;
    }
}
/**
 * GET api to fetch a specific user post by ID from the MongoDB database
 * @param param1 - Param object with id
 * @returns - The post data for the specific id or error message
 * @throws - If there is an error in fetching the user
 */
export async function GET(request: NextRequest, {params}:RouteParams) {
    try {
        const {id} = await params;
        await connectMongoDB();
        const post = await userPost.findOne({_id: id});
        if (!post) {
            return NextResponse.json({message: "Post not found"}, {status: 404});
        }
        return NextResponse.json(post);
    } catch (error) {
        console.error("Error fetching post: ", error);
        return NextResponse.json({message: "Error fetching post"}, {status: 500});
    }
}

/**
 * PUT api to update a specific post by ID in the MongoDB database
 * @param request - The incoming request
 * @param param1 - Param object with ID
 * @returns - Message indicating whether the post was updated successfully or not
 * @throws - If there is an error in updating the post
 */
export async function PUT(request: NextRequest, {params}:RouteParams) {
    try {
        const {id} = await params;
        const {email, firstName, lastName, username, password} = await request.json();
        await connectMongoDB();
        const post = await userPost.findByIdAndUpdate(id, {
            email,
            firstName,
            lastName,
            username,
            password
        });
        
        if (!post) {
            return NextResponse.json({message: "Post not found"}, {status: 404});
        }

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return NextResponse.json({message: "Invalid ID format"}, {status: 400});
        }
        return NextResponse.json({message: "Post updated successfully"});
    } catch (error) {
        console.error("Error updating post:", error);
        return NextResponse.json({message: "Error updating post"}, {status: 500});
    }
}

/**
 * Delete API to remove a specific post by their ID from the MongoDB database
 * @param request - Unused next request object
 * @param param1 Param with id
 * @returns Response indicating success or failure of deletion
 * @throws Error if there is an issue with the deletion process
 */
export async function DELETE(request: NextRequest, {params}: RouteParams) {
    try {
        const {id} = params;
        await connectMongoDB();
        const deletedItem = await userPost.findByIdAndDelete(id);
        if (!deletedItem) {
            return NextResponse.json({message: "Item not found"}, {status: 404});
        }
        return NextResponse.json({message: "Post was successfully deleted"});
    } catch (error) {
        console.error("Error deleting post:", error);
        return NextResponse.json({message: "Error deleting post"}, {status: 500});
    }
}