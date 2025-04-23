"use client"
import ModifyPost from "@/components/ModifyPost";
import { useEffect, useState } from "react";
interface RouteParams {
    params: {
        id: string;
    }
}

type Post = {
    _id: string,
    userId: string,
    title: string,
    link: string,
    sugar: number,
    cholesterol: number,
    fat: number,
    carbs: number
    instructions: string,
    ingredients: string,
    servings: string
  }

export default function EditPost({params} : RouteParams) {
    const [post, setPost] = useState<Post>();
    const getPost = async () => {
        try {
            const response = await fetch(`/api/userPosts/${params.id}`);
            if (!response.ok) {
                throw new Error("Error getting the user post!");
            }
            const data = await response.json();
            setPost(data);
        } catch (error) {
            alert(error);
        }
    }

    useEffect(() => {
        getPost();
    }, []);

    return (
        post ? <ModifyPost editPost={true} post={post}/> : <p>Loading...</p>
    );
}