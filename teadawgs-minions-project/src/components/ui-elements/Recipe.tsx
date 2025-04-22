'use client'; 

import { useEffect, useState } from 'react';
import Image from 'next/image';

interface Nutrition {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
}

interface RecipeType {
  _id: string;
  recipe: string;
  instructions: string[];
  ingredients: string[];
  servings: number;
  nutrition: Nutrition;
  image: string;
  userId: string;
}

export default function Recipe({ userId }: { userId: string }) {
  const [recipes, setRecipes] = useState<RecipeType[]>([]);

  useEffect(() => {
    async function fetchRecipes() {
      try {
        const res = await fetch(`/api/recipes`);
        if (!res.ok) throw new Error('Failed to fetch');
        const data = await res.json();
        setRecipes(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch recipes');
      } finally {
        setLoading(false);
      }
    }
    fetchRecipes();
  }, [userId]);

  return (
    <div className="flex flex-col w-full items-center justify-center bg-black text-white p-4 max-w-4xl m-4 rounded-lg">
      {recipes.map((post) => (
        <div key={post._id} className="relative flex flex-row w-full max-w-2xl mb-4 gap-6 ">
          {/* Left: Image Section */}
          <div className="w-1/3 items-center justify-left relative right-10 top-25">
            <div className="relative h-64 w-full max-w-[300px] mx-auto">
              <Image 
                src={post.image}
                fill
                alt={post.recipe}
                className="object-cover rounded-lg shadow-lg"
                sizes="(max-width: 768px) 100vw, 33vw"
                priority
              />
            </div>
          </div>

          {/* Right: Content Area */}
          <div className="flex-1 flex flex-col">
            <h1 className="text-3xl font-bold mb-9 border-b border-gray-700 pb-4 text-center mb-10">
              {post.recipe}
            </h1>

            <div className="flex flex-row gap-6 flex-1">
              <div className="flex-1 flex flex-col overflow-y-auto max-h-96 pr-4">
                <div className="mb-11">
                  <h2 className="text-xl font-semibold mb-4 border-gray-700 pb-2">Ingredients</h2>
                  <ul className="list-disc pl-6 space-y-2">
                    {post.ingredients.map((ingredient, index) => (
                      <li key={index} className="text-red-300">{ingredient}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h2 className="text-xl font-semibold mb-4 pb-2">Instructions</h2>
                  <ol className="list-decimal pl-6 space-y-3">
                    {post.instructions.map((step, index) => (
                      <li key={index} className="text-red-300">{step}</li>
                    ))}
                  </ol>
                </div>
              </div>

              <div className="w-1/3 pl-6 border-gray-800">
                <div className="mb-11">
                  <h2 className="text-xl font-semibold mb-4">Servings</h2>
                  <div className="flex items-center gap-2 bg-gray-900 p-4 rounded-lg">
                    <span className="text-2xl font-bold text-red-400">{post.servings}</span>
                    <span className="text-gray-400">servings</span>
                  </div>
                </div>

                <div className="mt-6">
                  <h2 className="text-xl font-semibold mb-4">Nutrition per serving</h2>
                  <div className="space-y-3 text-gray-300 bg-gray-900 p-4 rounded-lg">
                    <div className="flex justify-between"><span>Calories</span><span>{post.nutrition.calories}</span></div>
                    <div className="flex justify-between"><span>Protein</span><span>{post.nutrition.protein}g</span></div>
                    <div className="flex justify-between"><span>Carbs</span><span>{post.nutrition.carbs}g</span></div>
                    <div className="flex justify-between"><span>Fat</span><span>{post.nutrition.fat}g</span></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
