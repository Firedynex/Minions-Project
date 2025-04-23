  "use client";
  import Image from 'next/image';
  import { useState, useEffect } from 'react';
  import { useRouter } from 'next/navigation';
  import { useSession, signIn } from 'next-auth/react';

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

  export default function UserHistory() {
    const router = useRouter();
    const { data: session, status } = useSession();
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [showDescription, setShowDescription] = useState<boolean>(false);

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
      router.push(`/edit-post/${postId}/`);
    };

    if (loading) return <p>Loading posts…</p>;
    if (error) return <p className="text-red-500">Failed to load: {error}</p>;
    
    return (
      <div className="min-h-150 bg-black text-gray-100 p-4 max-w-4xl m-4 rounded-lg overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
        <h1 className="text-4xl font-bold text-red-400 border-b text-center">
        Your Posts
        </h1>
        <p className="text-gray-400 mt-2 text-center">
        Manage your created posts
        </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 relative left-13 px-4">
        <div className="lg:col-span-3 space-y-6">
        {posts.map(post => (
          <div
          key={post._id}
          className="bg-gray-900 rounded-xl p-6 shadow-lg hover:bg-gray-800 transition-colors overflow-hidden"
          >
                  <div className="flex flex-col sm:flex-row gap-6">
                    {post.link && (
                    <div className="w-full sm:w-24 h-24 relative shrink-0">
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
                    <span className="text-sm px-3 py-1 bg-red-500/20 rounded-full block text-center sm:text-left">
                    {post.title}
                    </span>
                    <div>
                    <button 
                    onClick={(e) => setShowDescription(!showDescription)} 
                    className="w-full mt-4 h-9 bg-amber-400 rounded p-2 resize-none text-sm text-black"
                    >
                    Show Details
                    </button>
                    {showDescription && (
                    <div className="bg-white p-2 rounded-xl mt-4 font-roboto">
                      <h1 className="font-bold text-black">Ingredients: </h1>
                      <p className="text-sm text-black">{post.ingredients}</p>
                      <h1 className="font-bold text-black">Instructions: </h1>
                      <p className="text-sm text-black">{post.instructions}</p>
                      <h1 className="font-bold text-black">Details: </h1>
                      <p className="text-sm text-black">{post.servings}</p>
                      <p className="text-sm text-black">{post.carbs} grams carbs</p>
                      <p className="text-sm text-black">{post.sugar} grams sugar</p>
                      <p className="text-sm text-black">{post.cholesterol} milligrams cholesterol</p>
                      <p className="text-sm text-black">{post.fat} grams fat</p>
                    </div>
                    )}
                    </div>
                    <div className="flex flex-col sm:flex-row gap-2 mt-4">
                      <button
                      onClick={() => handleEdit(post._id)}
                      className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 w-full sm:w-auto"
                      >
                      Edit
                      </button>
                      <button
                      onClick={() => handleDelete(post._id)}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 w-full sm:w-auto"
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