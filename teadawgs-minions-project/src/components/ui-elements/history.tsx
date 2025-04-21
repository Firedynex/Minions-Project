"use client";
import Image from 'next/image';
import { useState, useEffect } from 'react';

interface Post {
  userid: number; 
  description: string;
  link: string;
  liked: boolean;
  disliked: boolean;
  showComments?: boolean;
}

export default function UserHistory() {
  const [posts, setPosts]     = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState<string | null>(null);
  useEffect(() => {
      async function fetchPosts() {
        try {
          const res = await fetch("/api/userPosts");
          if (!res.ok) throw new Error(`Error ${res.status}`);
          const data: Post[] = await res.json();
          setPosts(data);
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

  return (
    <div className="min-h-150 bg-black text-gray-100 p-4 max-w-4xl m-4 rounded-lg">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-red-400 border-b text-center">Viewing History</h1>
          <p className="text-gray-400 mt-2 text-center">Recently viewed recipes and posts</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 relative left-13">
          {/* Main History List */}
          <div className="lg:col-span-3 space-y-6 ">
            {posts.map((item) => (
              <div 
                key={item.userid}
                className="bg-gray-900 rounded-xl p-6 shadow-lg hover:bg-gray-800 transition-colors"
              >
                <div className="flex gap-6">
                  {/* Thumbnail */}
                  <div className="w-24 h-24 relative shrink-0">
                    <Image
                      src={item.link}
                      alt={"alt"}
                      fill
                      className="object-cover rounded-lg"
                      sizes="(max-width: 768px) 100vw, 10vw"
                    />
                  </div>
                  {/* Content */}
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-sm px-3 py-1 bg-red-500/20 rounded-full">
                        {item.userid}
                      </span>

                    </div>
                    
                    <p className="text-gray-300 mt-2 line-clamp-2">
                      {item.userid}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}