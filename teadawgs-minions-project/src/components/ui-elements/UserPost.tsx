"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

interface UserPostsProps {
  userPost: {
    id: string,
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

  function handleToggle(action : "like" | "dislike" | "comment") {
    if (action === "like") {
      setLike(!like);
      setDislike(false);
    } else if (action === "dislike") {
      setDislike(!dislike);
      setLike(false);
    } else if (action === "comment") {
      setComment(!comment);
    }
  }

  return (
    <div className="flex flex-col w-full items-center justify-center bg-red-400 p-4 max-w-4xl m-4 rounded-lg">
        <div className="flex flex-row w-full max-w-2xl mb-4">
          {/* Left: User Avatar */}
          <div className="flex items-start pt-4 pl-2">
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000">
                <path d="M480-480q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47ZM160-160v-112q0-34 17.5-62.5T224-378q62-31 126-46.5T480-440q66 0 130 15.5T736-378q29 15 46.5 43.5T800-272v112H160Z" />
              </svg>
            </div>
          </div>

          {/* Middle: Post Content */}
          <Link href={userPost.link} className="flex-1 mx-2">
            <div className="bg-black rounded-lg p-4 w-full max-w-5xl mx-auto">
              <Image 
                className="w-full max-h-30 object-cover rounded mb-2 max-w-350 "
                src="/placeholder.svg"
                width={350}
                height={200} 
                alt="Post image"
              />
              <textarea
                className="w-full h-9 bg-gray-200 rounded p-2 resize-none text-sm text-black"
                readOnly
                value={`Description of post by User`}
              />
            </div>
          </Link>

          {/* Right: Action Buttons */}
          <div className="flex flex-col justify-start pt-4 pr-2 space-y-3 m-2">
            <button onClick={() => handleToggle("like")}>
              <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill={like ? "#FFFFFF" : "#000000"}>
                <path d="M720-120H280v-520l280-280 50 50q7 7 11.5 19t4.5 23v14l-44 174h258q32 0 56 24t24 56v80q0 7-2 15t-4 15L794-168q-9 20-30 34t-44 14Zm-360-80h360l120-280v-80H480l54-220-174 174v406Z" />
              </svg>
            </button>
            <button onClick={() => handleToggle("dislike")}>
              <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill={dislike ? "#FFFFFF" : "#000000"}>
                <path d="M240-840h440v520L400-40l-50-50q-7-7-11.5-19t-4.5-23v-14l44-174H120q-32 0-56-24t-24-56v-80q0-7 2-15t4-15l120-282q9-20 30-34t44-14Zm360 80H240L120-480v80h360l-54 220 174-174v-406Z" />
              </svg>
            </button>
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