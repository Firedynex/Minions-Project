import { NextRequest, NextResponse } from "next/server";
import connectMongoDB from "../../../../../../../config/mongodb";
import userPost from "@/models/userPostSchema";

interface RouteParams{
    params: {
        id: string,
        postId: string
    }
}

/**
 * GET api to get a specific post from a specific user
 * @param param0 - Route params object with userId and postId
 * @returns - Next Response indicating whether the request was successful or not with a message
 * @throws - Post does not exist
 * @throws - Error getting a post
 */
export async function GET(_request: NextRequest, {params}: RouteParams) {
    try {
        const {id, postId} = params;
        await connectMongoDB();
        const postExists = await userPost.findOne({_id: postId});
        if (!postExists) {
            return NextResponse.json({message: "Post does not exist!"}, {status: 404});
        }
        const post = await userPost.find({_id: postId, userId : id});
        return NextResponse.json({message: "Successfully retrieved post!", post}, {status: 200});
    } catch(error) {
        console.error("There was an error getting user post!", error);
        return NextResponse.json({message: "Error getting user post"}, {status: 500});
    }
}

/**
 * PUT method to update a user post in the MongoDB database.
 * @param request - Request object containing the data for the user post.
 * @param param1 - route parameters with UserId and postID.
 * @returns - Next response with a message indicating successful user update or not.
 * @throws - Post does not exist.
 * @throws - Error updating post.
 */
export async function PUT(request: NextRequest, {params}: RouteParams) {
    try {
        const {id, postId} = params;
        const {title, description, content, link, visibility} = await request.json();
        await connectMongoDB();
        const post = await userPost.findByIdAndUpdate({_id: postId, userId: id}, {
            title,
            description,
            content,
            link,
            visibility,
            updatedAt: new Date()
        }, {new: true});
        if (!post) {
            return NextResponse.json({message: "Post does not exist!"}, {status: 404});
        }
        return NextResponse.json({message: "Post updated successfully!", post}, {status: 201});
    } catch (error) {
        console.error("Error updating post!");
        return NextResponse.json({message: "Error updating post!", error}, {status: 500});
    }
}

/**
 * Delete method to delete a post in the database.
 * @param request - Unused Next request object.
 * @param param1 - Route Params object containing user id and post id.
 * @returns - Next response indicating success of user post deletion.
 * @throws - 404 Post does not exist.
 * @throws - Error deleting post.
 */
export async function DELETE(request: NextRequest, {params}: RouteParams) {
    try {
        const {id, postId} = params;
        await connectMongoDB();
        const deletedPost = await userPost.findByIdAndDelete({_id: postId, userId: id});
        if (!deletedPost) {
            return NextResponse.json({message: "Post does not exist!"}, {status: 404});
        }
        return NextResponse.json({message: "Post deleted successfully!", deletedPost});
    } catch (error) {
        console.error("Error deleting post");
        return NextResponse.json({message: "Error deleting post", error}, {status: 500});
    }
    
}