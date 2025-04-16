import { NextRequest, NextResponse } from "next/server";
import connectMongoDB from "../../../../../config/mongodb";
import userPost from "@/models/userPostSchema";

interface RouteParams {
    params: {
        userId: string; // User ID
        postId: string; // Post ID
    }
}

/**
 * Method to get all the posts for a specific user from the database
 * @param param1 Route parameter object with user ID
 * @returns All posts for a specific user or error message
 * @throws Error if there is an error in fetching posts
 */
export async function GET({params}: RouteParams) {
    try {
        const {userId} = params;
        await connectMongoDB();
        const userPosts = await userPost.find({userId: userId});
        if (!userPosts || userPost.length === 0) {
            return NextResponse.json({message: "No posts found for this user"}, {status: 404});
        }
        return NextResponse.json(userPosts, {status: 200});
    } catch (error) {
        console.error("Error fetching user posts: ", error);
        return NextResponse.json({message: "Error fetching user posts"}, {status: 500});
    }
}

export async function PUT(request: NextRequest, {params}: RouteParams) {


}