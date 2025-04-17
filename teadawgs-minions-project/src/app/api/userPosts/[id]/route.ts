import { NextRequest, NextResponse } from "next/server";
import connectMongoDB from "../../../../../config/mongodb";
import userPost from "@/models/userPostSchema";
import mongoose from "mongoose";

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
 * @throws Error if the user does not exist
 * @throws Error if no posts are found for the user
 */
export async function GET({params}: RouteParams) {
    try {
        const {userId} = params;
        await connectMongoDB();
        const userExists = await userPost.exists({userId: userId});
        if (!userExists) {
            return NextResponse.json({message: "User not found"}, {status: 404});
        }
        const userPosts = await userPost.find({userId: userId});
        if (!userPosts || userPost.length === 0) {
            return NextResponse.json({message: "No posts found for this user"}, {status: 404});
        }
        return NextResponse.json(userPosts, {status: 200});
    } catch (error) {
        alert("Error fetching your posts: " + error + "\n Please try again.");
        console.error("Error fetching your posts: ", error);
        return NextResponse.json({message: "Error fetching user posts"}, {status: 500});
    }
}

/**
 * Put request to update a specific user post in the database
 * @param request - Incoming request to uuse to update the user post
 * @param param1 - Route parameter object with user ID and post ID
 * @returns - Message indicating whether the user post was updated successfully or not
 * @throws - If there is an error in updating the user post
 * @throws - If the user post is not found
 * @throws - If the ID format is invalid
 */
export async function PUT(request: NextRequest, {params}: RouteParams) {
    try {
        const {userId, postId} = await params;
        const {title, description, content, link, visibility, likes, dislikes, comments} = await request.json();
        await connectMongoDB();
        const userPostExists = await userPost.exists({userId: userId, _id: postId});
        if (!userPostExists) {
            return NextResponse.json({message: "User post not found"}, {status: 404});
        }
        const updatedPost = await userPost.findByIdAndUpdate(postId, {
            title,
            description,
            content,
            link,
            visibility,
            updatedAt: new Date(),
            likes,
            dislikes,
            comments
        }, {new: true, runValidators: true});
        if (!mongoose.Types.ObjectId.isValid(postId)) {
            return NextResponse.json({message: "Invalid ID format"}, {status: 400});
        }
        return NextResponse.json({message: "User post updated successfully", updatedPost}, {status: 200});
    } catch (error) {
        alert("Error updating your post: " + error + "\n Please try again.");
        console.error("Error updating user post: ", error);
        return NextResponse.json({message: "Error updating user post"}, {status: 500});
    }
}

/**
 * Method to delete a specific user post from the database
 * @param param1 - Route parameter object with user ID and post ID
 * @returns - Message indicating whether the user post was deleted successfully or not
 * @throws - If there is an error in deleting the user post
 * @throws - If the user post is not found
 * @throws - If the ID format is invalid
 */
export async function DELETE({params}: RouteParams) {
    try {
        const {userId, postId} = await params;
        await connectMongoDB();
        const userPostExists = await userPost.exists({userId: userId, _id: postId});
        if (!userPostExists) {
            return NextResponse.json({message: "User post not found"}, {status: 404});
        }
        if (!mongoose.Types.ObjectId.isValid(postId)) {
            return NextResponse.json({message: "Invalid ID format"}, {status: 400});
        }
        const deletedPost = await userPost.findByIdAndDelete(postId);
        if (!deletedPost) {
            return NextResponse.json({message: "Error deleting user post"}, {status: 500});
        }
        return NextResponse.json({message: "User post deleted successfully"}, {status: 200});
    } catch (error) {
        alert("Error deleting your post: " + error + "\n Please try again.");
        console.error("Error deleting user post: ", error);
        return NextResponse.json({message: "Error deleting user post"}, {status: 500});
    }
}