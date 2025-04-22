"use client";
import { useState, useEffect } from "react";
import Image from "next/image";

interface RecipeType {
  _id: string;
  recipe: string;
  instructions: string[];
  ingredients: string[];
  servings: number;
  nutrition: {
    cholesterol: number;
    sugar: number;
    calories: number;
    fat: number;
  };
  image: string;
}

interface Post {
  userid: string;
  recipe: string;
  instructions: string[];
  ingredients: string[];
  servings: number;
  nutrition: {
    cholesterol: number;
    sugar: number;
    calories: number;
    fat: number;
  };
  link?: string;
  liked: boolean;
  disliked: boolean;
  showComments?: boolean;
}

export default function UserPost() {
  const [posts, setPosts]     = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState<string | null>(null);

  useEffect(() => {
    async function fetchPosts() {
      try {
        const res = await fetch("/api/recipe_list");
        if (!res.ok) throw new Error(`Error ${res.status}`);
        const data: RecipeType[] = await res.json();

        const mapped: Post[] = data.map((r) => ({
          userid:       r._id,
          recipe:       r.recipe,
          link:         r.image,
          instructions: r.instructions,
          ingredients:  r.ingredients,
          servings:     r.servings,
          nutrition:    r.nutrition,
          liked:        false,
          disliked:     false,
          showComments: false,
        }));
        setPosts(mapped);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchPosts();
  }, []);

  if (loading) return <p>Loading posts…</p>;
  if (error)   return <p className="text-red-500">Failed to load: {error}</p>;

  const handleToggle = (userid: string, action: "like" | "dislike" | "comment") => {
    setPosts((prev) =>
      prev.map((post) => {
        if (post.userid !== userid) return post;
        if (action === "like") {
          return { ...post, liked: !post.liked, disliked: false };
        }
        if (action === "dislike") {
          return { ...post, disliked: !post.disliked, liked: false };
        }
        if (action === "comment") {
          return { ...post, showComments: !post.showComments };
        }
        return post;
      })
    );
  };

  return (
    <div className="flex flex-col w-full items-center justify-center bg-red-400 p-4 max-w-4xl m-4 rounded-lg">
      {posts.map((post) => (
        <div key={post.userid} className="flex flex-col w-full max-w-2xl mb-4">
          
          {/* Recipe Title */}
          <div className="text-black text-xl font-bold mb-2 text-center relative right-10">
            {post.recipe}
          </div>

          <div className="flex flex-row w-full">
            {/* Middle: Post Content */}
            <div className="flex-1 mx-2">
              <div className="bg-black rounded-lg p-4 w-full max-w-5xl mx-auto">

                {post.link && (
                  <Image
                    className="w-full max-h-52 object-cover rounded mb-2"
                    src={post.link}
                    width={350}
                    height={200}
                    alt="Post image"
                  />
                )}

                {/* Instructions */}
                <textarea
                  className="w-full h-24 bg-gray-200 rounded p-2 resize-none text-sm text-black mb-2"
                  readOnly
                  value={post.ingredients.join("\n")}
                />

                {/* Ingredients */}
                <textarea
                  className="w-full h-24 bg-gray-200 rounded p-2 resize-none text-sm text-black"
                  readOnly
                  value={post.instructions.join("\n")}
                />

                {/* Nutrition + Servings Bar */}
                <div className="mt-3 flex justify-between text-white text-sm">
                  <span>Servings: {post.servings}</span>
                  <span>Calories: {post.nutrition.calories}</span>
                  <span>Fat: {post.nutrition.fat}</span>
                  <span>Cholesterol: {post.nutrition.cholesterol}</span>
                  <span>Sugar: {post.nutrition.sugar}</span>
                </div>
              </div>
            </div>

            {/* Right: Action Buttons */}
            <div className="flex flex-col justify-start pt-4 pr-2 space-y-3 m-2">
              <button onClick={() => handleToggle(post.userid, "like")}>
                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill={post.liked ? "#FFFFFF" : "#000000"}>
                  <path d="M720-120H280v-520l280-280 50 50q7 7 11.5 19t4.5 23v14l-44 174h258q32 0 56 24t24 56v80q0 7-2 15t-4 15L794-168q-9 20-30 34t-44 14Zm-360-80h360l120-280v-80H480l54-220-174 174v406Z" />
                </svg>
              </button>
              <button onClick={() => handleToggle(post.userid, "dislike")}>
                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill={post.disliked ? "#FFFFFF" : "#000000"}>
                  <path d="M240-840h440v520L400-40l-50-50q-7 7-11.5-19t-4.5-23v-14l44-174H120q-32 0-56-24t-24-56v-80q0-7 2-15t4-15l120-282q9-20 30-34t44-14Zm360 80H240L120-480v80h360l-54 220 174-174v-406Z" />
                </svg>
              </button>
              <button onClick={() => handleToggle(post.userid, "comment")}>
                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000">
                  <path d="M240-400h320v-80H240v80Zm0-120h480v-80H240v80Zm0-120h480v-80H240v80ZM80-80v-720q0-33 23.5-56.5T160-880h640q33 0 56.5 23.5T880-800v480q0 33-23.5 56.5T800-240H240L80-80Z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
