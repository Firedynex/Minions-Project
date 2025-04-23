import { NextRequest, NextResponse } from "next/server";
import connectMongoDB from "../../../../../../config/mongodb";
import Comment from "@/models/commentSchema";
import userPost from "@/models/userPostSchema";
import User from "@/models/userSchema";

interface RouteParams {
    params: {
        id: string // Post id
    }
}

/**
 * GET api request to get all the comments for a post.
 * @param request - Unused NextRequest object
 * @param param1 - Params object containing post id
 * @returns - Next Response indicating success of getting comments or not
 * @throws - If there was an error in getting comments
 */
export async function GET(request: NextRequest, {params}: RouteParams) {
    try {
        const {id} = params;
        await connectMongoDB();
        const userExists = await User.findById({_id: id});
        if (!userExists) {
            return NextResponse.json({message: "User does not exist!"}, {status: 404});
        }
        const comments = await Comment.find({postId: id});
        return NextResponse.json(comments, {status: 200});
    } catch(error) {
        console.error("There was an error getting comments!", error);
        return NextResponse.json({message: "There was an error getting comments!"}, {status: 500});
    }
}

/**
 * POST api request to create a comment.
 * @param request - Next Request object containing json request.
 * @returns - Next response indicating success of creating comment or not.
 * @throws - Error if the post doesn't exist.
 * @throws - Error if there is an error in creating a comment.
 */
export async function POST(request: NextRequest, {params} : RouteParams) {
    try {
        const {username, postId, content} = await request.json();
        const {id} = await params;
        await connectMongoDB();
        const postExists = await userPost.findById({_id: id});
        if (!postExists) {
            return NextResponse.json({message: "Post does not exist!"}, {status: 404});
        }
        const createdComment = await Comment.create({
            username,
            postId,
            content
        });
        return NextResponse.json({message: "Comment created successfully!", createdComment}, {status: 201});
    } catch(error) {
        console.error("Error creating comment: ", error);
        return NextResponse.json({message: "Error creating comment!"}, {status: 500});
    }
}

/**
 * API to delete comments associated with a specific post.
 * @param request - Unused next request
 * @param param1 - Param with post id variable
 * @returns Response indicating success or failure of deletion
 * @throws Error if there is an issue with the deletion process.
 */
export async function DELETE(request: NextRequest, {params}: RouteParams) {
    try {
        const {id} = await params;
        await connectMongoDB();
        const deletedItem = await Comment.deleteMany({postId: id});
        return NextResponse.json({message: "Deleted all comments for this post"}, {status: 200});
    } catch (error) {
        console.error("Error deleting comments for this post!", error);
        return NextResponse.json({message: "Error deleting comments!"}, {status: 500});
    }
}