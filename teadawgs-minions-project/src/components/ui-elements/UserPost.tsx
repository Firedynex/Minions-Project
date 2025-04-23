"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import {useSession} from "next-auth/react";

interface Comment {
  _id: string;
  postId: string;
  content: string;
  createdAt: string;
  username?: string;
}

interface UserPostsProps {
  userPost: {
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
    comments: Comment[],
  }
}

export default function UserPost({userPost} : UserPostsProps) {
  const [like, setLike] = useState<boolean>(false);
  const [dislike, setDislike] = useState<boolean>(false);
  const [likes, setLikes] = useState<number>(userPost.likes);
  const [dislikes, setDislikes] = useState<number>(userPost.dislikes);
  const [newComment, setNewComment] = useState<string>("");
  const [showComments, setShowComments] = useState<boolean>(false);
  const [comments, setComments] = useState<Comment[]>(userPost.comments || []);
  const {data: session} = useSession();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [showDescription, setShowDescription] = useState<boolean>(false);
  const [username, setUsername] = useState<string>("");
  const isLoggedIn = !!session?.user;

  useEffect(() => {
    const getUsername = async () => {
      const url = `/api/users/${userPost.userId}`
      const response = await fetch(url);
      if (!response) {
        setUsername("U");
      } else {
        const data = await response.json();
        setUsername(data.username);
      }
      return;
    }
    const getComments = async () => {
      const response = await fetch(`/api/userPosts/${userPost._id}/comments`);
      const commentData = await response.json();
      setComments(commentData);
    }
    const getLikesAndDislikes = async () => {
      const response = await fetch(`/api/userPosts/${userPost._id}`);
      const data = await response.json();
      setLikes(data.likes);
      setDislikes(data.dislikes);
    }
    getUsername();
    getComments();
    getLikesAndDislikes();
  },[]);

  async function handleToggle(action : "like" | "dislike" | "comment" | "description") {
    const updatedPost = {
      ...userPost,
      likes,
      dislikes,
      comments: userPost.comments
    };
    
    if (action === "like") {
      setLike(!like);
      if (!like && dislike) {
        setDislike(false);
        setDislikes(dislikes - 1);
      }
      const newLikes = like ? likes - 1 : likes + 1;
      setLikes(newLikes);

      updatedPost.likes = newLikes;
      updatedPost.dislikes = dislike ? dislikes - 1 : dislikes;
    } else if (action === "dislike") {
      setDislike(!dislike);
      let newLikes = likes;
      if (!dislike && like) {
        setLike(false);
        newLikes = likes - 1;
        setLikes(newLikes);
      }
      const newDislikes = dislike ? dislikes - 1 : dislikes + 1;
      setDislikes(newDislikes);

      updatedPost.likes = newLikes;
      updatedPost.dislikes = newDislikes;
    } else if (action === "comment") {
      setShowComments(!showComments);
      return;
    } else if (action === "description") {
      setShowDescription(!showDescription);
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

  const handleAddComment =  async () => {
    if(!newComment.trim()) return;

    if (!session?.user){
      setError("You must be loggin in to comment");
      return;
    }

    setLoading(true);
    setError(null);

    try{
      const response = await fetch(`/api/userPosts/${userPost._id}/comments`,{
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
          postId: userPost._id,
          content: newComment,
          username: session.user.name || "Anonymous",
        }),
      });
      const commentData = await response.json();
      if(!response.ok){
        throw new Error(commentData.message || "Failed to post comment");
      }

      setComments(prev => [...prev, commentData.createdComment]);
      setNewComment("");
      } catch (error) {
        if(error instanceof Error){
          setError(error.message);
        } else {
          setError("An unexpected error occurred");
        }
      console.error("Error adding comments:", error);
    } finally {
      setLoading(false);
    }
  };
  return (
    
    <div className="flex flex-col w-full items-center justify-center bg-red-400 p-4 max-w-4xl m-4 rounded-lg">
        <div className="flex flex-row w-full max-w-2xl mb-4">
          {/* Left: Username */}
          <div className="flex items-start pt-4 pl-2">
            <div className="w-12 h-12 mr-4 bg-white rounded-full flex items-center justify-center">
              <span className=" text-sm text-black font-lilita">{username}</span>
            </div>
          </div>

          {/* Middle: Post Content */}
          <div className="bg-black rounded-lg p-4 w-full max-w-5xl mx-auto">
            <h1 className="font-bold text-xl text-white">
              {userPost.title}
            </h1>
            {userPost.link && (
              <Image 
              className="w-full max-h-30 object-cover rounded mb-2 max-w-350 "
              src={userPost.link}
              width={350}
              height={200} 
              alt="Post image"
            />
            )}
            <button onClick={() => handleToggle("description")}
              className="w-full h-9 bg-gray-200 rounded p-2 resize-none text-sm text-black">
                Click Here for More
            </button>
          </div>

          {/* Right: Action Buttons */}
          {isLoggedIn && (
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
                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill={showComments ? "#FFFFFF" : "#000000"}>
                  <path d="M240-400h320v-80H240v80Zm0-120h480v-80H240v80Zm0-120h480v-80H240v80ZM80-80v-720q0-33 23.5-56.5T160-880h640q33 0 56.5 23.5T880-800v480q0 33-23.5 56.5T800-240H240L80-80Z" />
                </svg>
              </button>
              <p className="text-black text-center font-sm">{comments.length}</p>
            </div>
          )}
          
        </div>
        {showDescription && (
          <div className="bg-white p-2 rounded-xl font-roboto">
            <h1 className="font-bold text-black">Ingredients: </h1>
            <p className="text-sm text-black">{userPost.ingredients}</p>
            <h1 className="font-bold text-black">Instructions: </h1>
            <p className="text-sm text-black">{userPost.instructions}</p>
            <h1 className="font-bold text-black">Details: </h1>
            <p className="text-sm text-black">{userPost.servings}</p>
            <p className="text-sm text-black">{userPost.carbs} grams carbs</p>
            <p className="text-sm text-black">{userPost.sugar} grams sugar</p>
            <p className="text-sm text-black">{userPost.cholesterol} milligrams cholesterol</p>
            <p className="text-sm text-black">{userPost.fat} grams fat</p>
          </div>
        )
        }
        {showComments && (
          <div className="w-full max-w-2xl bg-white p-4 rounded-lg mt-2">
            <div className="mb-4">
              <textarea value={newComment} onChange={(e) => setNewComment(e.target.value)} placeholder="Write a comment..." className="w-full p-2 border rounded mb-2 text-black" rows={3}>
              </textarea>
              {error && (
                <p className="text-red-500 text-sm mb-2">{error}</p>
              )}
              <button onClick={handleAddComment} className="bg-blue-500 text-white px-4 py-1 rounded text-sm">
                  Post Comment
                </button>
            </div>
            <div className="space-y-3">
              {comments.map((comment) => (
                <div key={Math.random()} className="bg-gray-100 p-3 rounded">
                  <div className="flex items-center mb-1">
                    <div className="w-12 h-12 mr-4 bg-white rounded-full flex items-center justify-center">
                      <span className=" text-sm text-black font-lilita">{comment.username}</span>
                    </div>
                  </div>
                  <p className="text-sm text-black">{comment.content}</p>
                </div>
              ))}
            </div>
          </div>
        )}
        
    </div>
  );
}