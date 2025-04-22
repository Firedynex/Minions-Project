"use client";
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';

interface RecipeType {
  _id: string;
  userId: string;  
  title: string;
  description: string;
  image: string;
  instructions: string;
  ingredients: string[];
  servings: number;
  nutrition: string;
}

export default function UserHistory() {
  const router = useRouter();
  const params = useParams();
  const userId = params?.id as string;
  const [recipes, setRecipes] = useState<RecipeType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchRecipes() {
      try {
        const res = await fetch(`/api/recipe_list?userId=${encodeURIComponent(userId)}`);
        if (!res.ok) throw new Error(`Error ${res.status}`);
        const data: RecipeType[] = await res.json();
        setRecipes(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchRecipes();
  }, [userId]);

  const handleDelete = async (recipeId: string) => {
    try {
      const res = await fetch(`/api/recipes/${recipeId}`, {
        method: 'DELETE',
      });
      if (!res.ok) throw new Error('Failed to delete recipe');
      setRecipes(recipes.filter(recipe => recipe._id !== recipeId));
    } catch (err) {
      setError('Failed to delete recipe');
    }
  };

  const handleEdit = (recipeId: string) => {
    router.push(`/recipes/${recipeId}/edit`);
  };

  if (loading) return <p>Loading recipes…</p>;
  if (error) return <p className="text-red-500">Failed to load: {error}</p>;

  return (
    <div className="min-h-150 bg-black text-gray-100 p-4 max-w-4xl m-4 rounded-lg">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-red-400 border-b text-center">Your Recipes</h1>
          <p className="text-gray-400 mt-2 text-center">Manage your created recipes</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 relative left-13">
          <div className="lg:col-span-3 space-y-6 ">
            {recipes.map((recipe) => (
              <div
                key={recipe._id}
                className="bg-gray-900 rounded-xl p-6 shadow-lg hover:bg-gray-800 transition-colors"
              >
                <div className="flex gap-6">
                    <div className="w-24 h-24 relative shrink-0">
                      <Image
                      src={recipe.image}
                      alt={recipe.title}
                        fill
                        className="object-cover rounded-lg"
                        sizes="(max-width: 768px) 100vw, 10vw"
                      />
                    </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                    <span className="text-sm px-3 py-1 bg-red-500/20 rounded-full">
                        {recipe.title}
                    </span>
                    </div>
                    <p className="text-gray-300 mt-2 line-clamp-2">
                      {recipe.description}
                    </p>
                    <div className="flex gap-2 mt-4">
                      <button
                        onClick={() => handleEdit(recipe._id)}
                        className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(recipe._id)}
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