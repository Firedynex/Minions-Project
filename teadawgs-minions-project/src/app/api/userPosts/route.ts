import { NextResponse } from "next/server";
import connectMongoDB from "../../../../config/mongodb";
import userPost from "@/models/userPostSchema";

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
