"use client"
import ModifyPost from "@/components/ModifyPost";
import { useEffect, useState } from "react";

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

export default function EditPost({ params } : { params: Promise<{ id: string }> }) {
    const [post, setPost] = useState<Post>();
    const getPost = async () => {
        try {
            const response = await fetch(`/api/userPosts/${(await params).id}`);
            if (!response.ok) {
                throw new Error("Error getting the user post!");
            }
            const data = await response.json();
            setPost(data);
        } catch (error) {
            alert(error);
        }
    }
    //Gets the post to edit
    useEffect(() => {
        getPost();
    }, []);

    return (
        post ? <ModifyPost editPost={true} post={post}/> : <p>Loading...</p>
    );
}