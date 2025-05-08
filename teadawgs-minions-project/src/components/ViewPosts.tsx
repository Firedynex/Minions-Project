import UserPost from "@/components/ui-elements/UserPost";
import Card from "@/components/Card";
import { useEffect, useState } from "react";

interface UserPost {
    _id: string,
    title: string,
    instructions: string,
    ingredients: string,
    servings: string,
    carbs: number,
    sugar: number,
    cholesterol: number,
    fat: number,
    link: string,
    userId: string,
    likes: number,
    dislikes: number,
}

export default function Posts() {
    const [posts, setPosts] = useState<UserPost[]>([]);
    useEffect(() => {
        const url = "/api/userPosts";
        const fetchData = async () => {
            try {
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error("Error getting user posts! " + response.status);
                }
                const data = await response.json();
                data.reverse();
                setPosts(data);
            } catch (error) {
                console.error("Error getting user posts!", error);
            }
        }
        fetchData();
    }, []);
    return (
        <div className="flex flex-col ml-4 space-y-4 max-w-screen-md w-full">
            {posts.map((post) => (
                <Card key={post._id} className="p-4">
                    <UserPost userPost={post} />
                </Card>
            ))}
        </div>
    );
}