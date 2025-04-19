import { NextRequest, NextResponse } from "next/server";
import connectMongoDB from "../../../../config/mongodb";
import userPost from "@/models/userPostSchema";
import User from "@/models/userSchema";

/**
 * Method to get all posts from the database
 * @returns - All posts from the database or error message
 * @throws - If there is an error in fetching posts
 */
export async function GET() {
    try {
        await connectMongoDB();
        const allPosts = await userPost.find();
        return NextResponse.json(allPosts, { status: 200});
    } catch (error) {
        console.error("Error fetching posts: ", error);
        return NextResponse.json({message: "Error fetching posts"}, {status: 500});
    }
}

/**
 * Method to create a user post in the MongoDB database
 * @param request - Incoming request to create the user post
 * @returns - Response with the message and created post if successful or error response
 * @throws - If there is an error with creating a post
 */
export async function POST(request: NextRequest) {
    try {
        const {userId, title, description, content, link, visibility, likes, dislikes, comments} = await request.json();
        await connectMongoDB();
        const userExists = await User.findOne<{ _id: string }>({ _id: userId });
        if (!userExists) {
            return NextResponse.json({message: "User does not exist!"}, {status: 404});
        }
        const createdPost = await userPost.create({
            userId,
            title,
            description,
            content,
            link,
            visibility,
            likes,
            dislikes,
            comments
        });
        return NextResponse.json({message: "Post created successfully!", createdPost}, {status: 201});
    } catch (error) {
        console.error("Error creating post: ", error);
        return NextResponse.json({message: "Error creating post"}, {status: 500});
    }
};
