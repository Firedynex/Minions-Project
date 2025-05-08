import { NextRequest, NextResponse } from "next/server";
import connectMongoDB from "../../../../../../config/mongodb";
import userPost from "@/models/userPostSchema";

interface RouteParams{
    params: {
        id: string
    }
}


/**
 * GET method to get all the posts for a specific user.
 * @param request - Next Request object.
 * @param param1 - Route params object that containts user id to query.
 * @returns - Next response indicating success or failure of post retrieval.
 * @throws - Error getting all user posts
 */
export async function GET(request: NextRequest, {params} : RouteParams) {
    try {
        const {id} = await params;
        await connectMongoDB();
        const posts = await userPost.find({userId : id});
        return NextResponse.json({message: "Posts successfully retrieved!", posts}, {status: 200});
    } catch (error) {
        console.error("Error getting all user posts!", error);
        return NextResponse.json({message: "Error getting all user posts!", error}, {status: 500});
    }
}