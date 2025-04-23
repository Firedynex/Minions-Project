import UserPost from "@/components/ui-elements/UserPost";
import { useEffect, useState } from "react";

interface UserPost {
    _id: string,
    title: string,
    description: string,
    content: string,
    link: string,
    userId: string,
    likes: number,
    dislikes: number,
    comments: number
}

export default function Posts() {
    const [posts, setPosts] = useState<UserPost[]>([]);
    useEffect(() => {
        const url = "http://localhost:3000/api/userPosts";
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
    return (
        <div className="flex flex-col ml-4 space-y-4 max-w-screen-md w-full">
                        {posts.map((post) => (
                            <div key={post._id} className="">
                                <UserPost userPost = {post}/>
                            </div>
                        ))}
                        </div>
    );
}