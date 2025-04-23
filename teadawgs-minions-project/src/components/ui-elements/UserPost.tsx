"use client";
import { useState } from "react";
import Image from "next/image";

interface UserPostsProps {
  userPost: {
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
}

export default function UserPost({userPost} : UserPostsProps) {
  const [like, setLike] = useState<boolean>(false);
  const [dislike, setDislike] = useState<boolean>(false);
  const [comment, setComment] = useState<boolean>(false);
  const [likes, setLikes] = useState<number>(userPost.likes);
  const [dislikes, setDislikes] = useState<number>(userPost.dislikes);

  async function handleToggle(action : "like" | "dislike" | "comment") {
    const updatedPost = {
      ...userPost,
      likes,
      dislikes,
      comments: userPost.comments
    };
    if (action === "like") {
      const newLikes = like ? likes-1 : likes+1;
      const newDislikes = 0;

      setLike(!like);
      setDislike(false);
      setLikes(newLikes);
      setDislikes(newDislikes);

      updatedPost.likes = newLikes;
      updatedPost.dislikes = newDislikes;
    } else if (action === "dislike") {
      const newDislikes = dislike ? dislikes-1 : dislikes+1;
      const newLikes = 0;

      setDislike(!dislike);
      setLike(false);
      setLikes(newLikes);
      setDislikes(newDislikes);

      updatedPost.likes = newLikes;
      updatedPost.dislikes = newDislikes;
    } else if (action === "comment") {
      setComment(!comment);
      return;
    }

    try {
      const response = await fetch(`/api/userPosts/${userPost._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedPost),
      });

      if (!response.ok) {
        throw new Error('Network response failed');
      }
    } catch (error) {
      console.error("Error updating post:", error);
    }
  }

  
  return (
    <div className="flex flex-col w-full items-center justify-center bg-red-400 p-4 max-w-4xl m-4 rounded-lg">
        <div className="flex flex-row w-full max-w-2xl mb-4">
          {/* Left: Username */}
          <div className="flex items-start pt-4 pl-2">
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
              <span className=" text-sm text-black">{userPost.userId}</span>
            </div>
          </div>

          {/* Middle: Post Content */}
          <div className="bg-black rounded-lg p-4 w-full max-w-5xl mx-auto">
            <h1 className="font-bold text-xl">
              {userPost.title}
            </h1>
            <Image 
              className="w-full max-h-30 object-cover rounded mb-2 max-w-350 "
              src={userPost.link}
              width={350}
              height={200} 
              alt="Post image"
            />
            <p
              className="w-full h-9 bg-gray-200 rounded p-2 resize-none text-sm text-black">
              {userPost.description}
            </p>
          </div>

          {/* Right: Action Buttons */}
          <div className="flex flex-col justify-start pt-4 pr-2 space-y-3 m-2">
            <button onClick={() => handleToggle("like")}>
              <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill={like ? "#FFFFFF" : "#000000"}>
                <path d="M720-120H280v-520l280-280 50 50q7 7 11.5 19t4.5 23v14l-44 174h258q32 0 56 24t24 56v80q0 7-2 15t-4 15L794-168q-9 20-30 34t-44 14Zm-360-80h360l120-280v-80H480l54-220-174 174v406Z" />
              </svg>
            </button>
            <p className="text-black text-center font-sm">{likes}</p>
            <button onClick={() => handleToggle("dislike")}>
              <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill={dislike ? "#FFFFFF" : "#000000"}>
                <path d="M240-840h440v520L400-40l-50-50q-7-7-11.5-19t-4.5-23v-14l44-174H120q-32 0-56-24t-24-56v-80q0-7 2-15t4-15l120-282q9-20 30-34t44-14Zm360 80H240L120-480v80h360l-54 220 174-174v-406Z" />
              </svg>
            </button>
            <p className="text-black text-center font-sm">{dislikes}</p>
            <button onClick={() => handleToggle("comment")}>
              <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000">
                <path d="M240-400h320v-80H240v80Zm0-120h480v-80H240v80Zm0-120h480v-80H240v80ZM80-80v-720q0-33 23.5-56.5T160-880h640q33 0 56.5 23.5T880-800v480q0 33-23.5 56.5T800-240H240L80-80Z" />
              </svg>
            </button>
          </div>
        </div>
    </div>
  );
}
