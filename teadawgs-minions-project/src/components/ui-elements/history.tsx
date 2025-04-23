"use client";
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession, signIn } from 'next-auth/react';

interface Post {
  _id: string;
  title: string;
  description: string;
  content: string;
  link: string;
  userId: string;
  visibility: boolean;
  likes: number;
  dislikes: number;
  comments: number;
  createdAt: string;
  updatedAt: string;
  instructions: string[];
  ingredients: string[];
}

export default function UserHistory() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (status !== 'authenticated') {
      if (status === 'unauthenticated') signIn();
      return;
    }
    const userId = session?.user?.id;
    if (!userId) {
      console.error("No userId on session!", session);
      return;
    }
    
    (async () => {
      try {
        const res = await fetch(`/api/users/${userId}/post`);
        if (!res.ok) throw new Error(res.statusText);
        const data = await res.json();
        
        if (data.posts && Array.isArray(data.posts)) {
          setPosts(data.posts);
        } else {
          throw new Error('Invalid posts data format');
        }
      } catch (e: any) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    })();
  }, [status, session]);

  const handleDelete = async (postId: string) => {
    if (!window.confirm('Are you sure you want to delete this post?')) return;
  
    try {
      const userId = session?.user?.id;
      if (!userId) throw new Error('User not authenticated');

      const res = await fetch(`/api/users/${userId}/post/${postId}`, { 
        method: 'DELETE',
      });

      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(errorText || 'Delete failed');
      }

      setPosts(posts.filter(post => post._id !== postId));
    } catch (e: any) {
      console.error('Delete error:', e);
      setError('Delete failed: ' + e.message);
    }
  };

  const handleEdit = (postId: string) => {
    router.push(`/posts/${postId}/edit`);
  };

  if (loading) return <p>Loading posts…</p>;
  if (error) return <p className="text-red-500">Failed to load: {error}</p>;
  if (posts.length === 0) return <p className="text-center text-gray-400">No posts found</p>;

  return (
    <div className="min-h-150 bg-black text-gray-100 p-4 max-w-4xl m-4 rounded-lg">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-red-400 border-b text-center">
            Your Posts
          </h1>
          <p className="text-gray-400 mt-2 text-center">
            Manage your created posts
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 relative left-13">
          <div className="lg:col-span-3 space-y-6">
            {posts.map(post => (
              <div
                key={post._id}
                className="bg-gray-900 rounded-xl p-6 shadow-lg hover:bg-gray-800 transition-colors"
              >
                <div className="flex gap-6">
                  {post.link && (
                    <div className="w-24 h-24 relative shrink-0">
                      <Image
                        src={post.link}
                        alt={post.title || 'Post image'}
                        fill
                        className="object-cover rounded-lg"
                        sizes="(max-width: 768px) 100vw, 10vw"
                      />
                    </div>
                  )}
                  <div className="flex-1">
                    <span className="text-sm px-3 py-1 bg-red-500/20 rounded-full">
                      {post.title}
                    </span>
                    <p className="text-gray-300 mt-2 line-clamp-2">
                      {post.description}
                    </p>
                    {post.content && (
                      <p className="text-gray-400 text-sm mt-1 line-clamp-1">
                        {post.content}
                      </p>
                    )}
                    {post.ingredients && post.ingredients.length > 0 && (
                      <p className="text-gray-400 text-sm mt-1">
                        Ingredients: {post.ingredients.slice(0, 3).join(', ')}
                        {post.ingredients.length > 3 && '...'}
                      </p>
                    )}
                    <div className="flex gap-2 mt-4">
                      <button
                        onClick={() => handleEdit(post._id)}
                        className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(post._id)}
                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                      >
                        Delete
                      </button>
                    </div>
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