"use client"
import UserPost from "@/components/ui-elements/UserPost";
import Sidebar from "@/components/ui-elements/Sidebar";
import Card from "@/components/Card";
import { useEffect, useState } from "react";

interface UserPost {
    _id: string,
    title: string,
    link: string,
    userId: string,
    likes: number,
    dislikes: number,
    numComments: number,
    instructions: string,
    ingredients: string,
    servings: string,
    calories: number,
    sugar: number,
    cholesterol: number,
    carbs: number,
    fat: number,
}

export default function AuthenticatedHomePage() {
    const [posts, setPosts] = useState<UserPost[]>([]);

    //Initial loadup of user posts
    useEffect(() => {
        const url = "/api/userPosts";
        const fetchData = async () => {
            try {
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error("Error getting user posts! " + response.status);
                }
                const data = await response.json();
                console.log(data);
                setPosts(data);
            } catch (error) {
                console.error("Error getting user posts!", error);
            }
        }
        fetchData();
    }, []);
    
    return(
        <>
            <div className="flex justify-center items-start m-10">
                <div className="sticky top-20">
                    <Sidebar />
                </div>
                <div className="flex flex-col ml-4 space-y-4 max-w-screen-md w-full">
                {posts.map((post) => (
                    <Card key={post._id} className="p-4">
                        <UserPost userPost={post} />
                    </Card>
                ))}
                </div>
            </div>

            {/* bubbles */}
            {/* bottom-left */}
            <div className = "fixed bottom-0 left-0 -translate-x-3/8 translate-y-3/8 h-90 w-90 rounded-full bg-black z-[-1]"></div>
            <div className = "fixed bottom-30 left-0 -translate-x-5/8 h-50 w-50 rounded-full bg-black z-[-1]"></div>
            <div className = "fixed bottom-0 left-40 translate-y-3/4 h-50 w-50 rounded-full bg-black z-[-1]"></div>
            
            {/* top-right */}
            <div className = "fixed top-0 right-0 translate-x-1/4 h-80 w-80 rounded-full bg-black z-[-1]"></div>
            <div className = "fixed top-45 right-0 translate-x-5/8 h-50 w-50 rounded-full bg-black z-[-1]"></div>
            <div className = "fixed top-0 right-40 -translate-y-1/4 h-50 w-50 rounded-full bg-black z-[-1]"></div>
            <div className = "fixed top-0 right-70 -translate-y-3/4 h-50 w-50 rounded-full bg-black z-[-1]"></div>
            <div className = "fixed top-0 right-0 -translate-y-1/4 h-50 w-50 bg-black z-[-1]"></div>
        </>
    );
}