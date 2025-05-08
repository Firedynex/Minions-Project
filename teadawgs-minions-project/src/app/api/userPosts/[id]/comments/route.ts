import { NextRequest, NextResponse } from "next/server";
import connectMongoDB from "../../../../../../config/mongodb"; // Assuming this path is correct
import Comment from "@/models/commentSchema"; // Assuming this path is correct
import userPost from "@/models/userPostSchema"; // Assuming this path is correct

interface Params {
  id: string;
}

/**
 * GET api request to get all the comments for a post.
 * @param request - Unused NextRequest object
 * @param context - Context object containing route parameters
 * @returns - Next Response indicating success of getting comments or not
 * @throws - If there was an error in getting comments
 */
export async function GET(request: NextRequest, { params }: { params: Params }) {
    try {
        // The 'id' is extracted from the params object
        const { id } = params;
        await connectMongoDB();
        const comments = await Comment.find({ postId: id });
        return NextResponse.json(comments, { status: 200 });
    } catch (error) {
        console.error("There was an error getting comments!", error);
        return NextResponse.json({ message: "There was an error getting comments!" }, { status: 500 });
    }
}

/**
 * POST api request to create a comment.
 * @param request - Next Request object containing json request.
 * @param context - Context object containing route parameters
 * @returns - Next response indicating success of creating comment or not.
 * @throws - Error if the post doesn't exist.
 * @throws - Error if there is an error in creating a comment.
 */
export async function POST(request: NextRequest, { params }: { params: Params }) {
    try {
        const { username, postId, content } = await request.json();
        // The 'id' from the URL parameters
        const { id } = params;

        // Validate that the postId from the request body matches the id from the URL if necessary
        // For example, if a comment should only be created for the post specified in the URL
        if (postId !== id) {
            // Or handle this based on your application's logic
            // console.warn("Warning: postId in request body does not match id in URL params. Using URL param id.");
        }

        await connectMongoDB();
        // Ensure the post exists using the id from the URL parameters
        const postExists = await userPost.findById(id); // Use the id from URL params
        if (!postExists) {
            return NextResponse.json({ message: "Post does not exist!" }, { status: 404 });
        }

        // Create the comment, ensuring you use the correct postId
        // If postId from body is the source of truth for the comment's association:
        const createdComment = await Comment.create({
            username,
            postId: postId, // or 'id' if the comment's postId should always be the one from the URL
            content
        });
        return NextResponse.json({ message: "Comment created successfully!", createdComment }, { status: 201 });
    } catch (error) {
        console.error("Error creating comment: ", error);
        return NextResponse.json({ message: "Error creating comment!" }, { status: 500 });
    }
}

/**
 * API to delete comments associated with a specific post.
 * @param request - Unused next request
 * @param context - Context object containing route parameters
 * @returns Response indicating success or failure of deletion
 * @throws Error if there is an issue with the deletion process.
 */
export async function DELETE(request: NextRequest, { params }: { params: Params }) {
    try {
        // The 'id' is extracted from the params object
        const { id } = params;
        await connectMongoDB();
        // Ensure the post exists before attempting to delete its comments (optional, but good practice)
        const postExists = await userPost.findById(id);
        if (!postExists) {
            return NextResponse.json({ message: "Post does not exist, cannot delete comments." }, { status: 404 });
        }
        await Comment.deleteMany({ postId: id });
        return NextResponse.json({ message: "Deleted all comments for this post" }, { status: 200 });
    } catch (error) {
        console.error("Error deleting comments for this post!", error);
        return NextResponse.json({ message: "Error deleting comments!" }, { status: 500 });
    }
}
