'use client';
import { FormEvent, useState, useEffect, useCallback } from 'react';

interface Nutrition {
  cholesterol: number;
  sugar: number;
  carbs: number;
  fat: number;
}

interface RecipeFormData {
  recipe: string;
  ingredients: string[];
  instructions: string[];
  servings: number;
  nutrition: Nutrition;
  image: string;
  visibility: 'public' | 'private';
  status: 'draft' | 'published';
}

export default function AddRecipe({ userId }: { userId: string }) {
  const [data, setData] = useState<RecipeFormData>({
    recipe: '',
    ingredients: [],
    instructions: [],
    servings: 4,
    nutrition: { cholesterol: 0, sugar: 0, carbs: 0, fat: 0 },
    image: '',
    visibility: 'public',
    status: 'draft'
  });
  const [loading, setLoading] = useState(false);
  const [nutritionLoading, setNutritionLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchNutritionData = useCallback(async () => {
    if (!data.recipe.trim()) return;
    
    setNutritionLoading(true);
    try {
      const response = await fetch(`/api/nutrition?query=${encodeURIComponent(data.recipe)}`);
      if (!response.ok) throw new Error('Nutrition data not found');
      
      const nutrition = await response.json();
      setData(prev => ({
        ...prev,
        nutrition: {
          cholesterol: nutrition.cholesterol || 0,
          sugar: nutrition.sugar || 0,
          carbs: nutrition.carbs || 0,
          fat: nutrition.fat || 0,
        }
      }));
    } catch (err) {
      setError('Failed to fetch nutrition data - please enter manually');
    } finally {
      setNutritionLoading(false);
    }
  }, [data.recipe]);

  useEffect(() => {
    const timer = setTimeout(fetchNutritionData, 1000);
    return () => clearTimeout(timer);
  }, [data.recipe, fetchNutritionData]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/recipes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, ...data })
      });
      
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || 'Failed to save');
      }
      
      setData({
        recipe: '', ingredients: [], instructions: [], servings: 4,
        nutrition: { cholesterol: 0, sugar: 0, carbs: 0, fat: 0 },
        image: '', visibility: 'public', status: 'draft'
      });
      alert('Saved successfully');
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-gray-100">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-red-400">Add New Recipe</h1>
          <p className="text-gray-400 mt-2">Create and share your culinary masterpiece</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Form */}
          <div className="lg:col-span-3">
            <form onSubmit={handleSubmit} className="bg-gray-900 rounded-xl p-6 shadow-lg space-y-6">
              {/* Title Input with Loading Indicator */}
              <div className="relative">
                <input
                  type="text"
                  placeholder="Recipe Title"
                  value={data.recipe}
                  onChange={(e) => setData({ ...data, recipe: e.target.value })}
                  required
                  className="w-full p-4 bg-gray-800 rounded-lg text-gray-100 focus:outline-none focus:ring-2 focus:ring-red-500"
                />
                {nutritionLoading && (
                  <div className="absolute right-4 top-4 text-gray-400 text-sm">
                    Loading nutrition...
                  </div>
                )}
              </div>

              {/* Ingredients */}
              <div>
                <label className="block text-gray-300 mb-2">Ingredients</label>
                <textarea
                  placeholder="Enter ingredients, one per line"
                  value={data.ingredients.join('\n')}
                  onChange={(e) => setData({ ...data, ingredients: e.target.value.split('\n') })}
                  className="w-full p-4 bg-gray-800 rounded-lg h-32 text-gray-100 focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>

              {/* Instructions */}
              <div>
                <label className="block text-gray-300 mb-2">Instructions</label>
                <textarea
                  placeholder="Enter instructions, one step per line"
                  value={data.instructions.join('\n')}
                  onChange={(e) => setData({ ...data, instructions: e.target.value.split('\n') })}
                  className="w-full p-4 bg-gray-800 rounded-lg h-32 text-gray-100 focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>

              {/* Servings & Image */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-300 mb-2">Servings</label>
                  <input
                    type="number"
                    placeholder="Servings"
                    value={data.servings}
                    onChange={(e) => setData({ ...data, servings: +e.target.value })}
                    className="w-full p-4 bg-gray-800 rounded-lg text-gray-100 focus:outline-none focus:ring-2 focus:ring-red-500"
                    min="1"
                  />
                </div>
                <div>
                  <label className="block text-gray-300 mb-2">Image URL</label>
                  <input
                    type="url"
                    placeholder="Paste image URL"
                    value={data.image}
                    onChange={(e) => setData({ ...data, image: e.target.value })}
                    className="w-full p-4 bg-gray-800 rounded-lg text-gray-100 focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>
              </div>

              {/* Nutrition Inputs */}
              <div>
                <h3 className="text-xl font-semibold text-red-300 mb-4">Nutrition Information</h3>
                <div className="grid grid-cols-2 gap-6">
                  {(['cholesterol', 'sugar', 'carbs', 'fat'] as const).map((key) => (
                    <div key={key}>
                      <label className="block text-gray-300 mb-2 capitalize">{key}</label>
                      <input
                        type="number"
                        placeholder={`${key} (g)`}
                        value={data.nutrition[key]}
                        onChange={(e) =>
                          setData({
                            ...data,
                            nutrition: { ...data.nutrition, [key]: Math.max(0, +e.target.value) }
                          })
                        }
                        className="w-full p-4 bg-gray-800 rounded-lg text-gray-100 focus:outline-none focus:ring-2 focus:ring-red-500"
                        min="0"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 bg-red-600 hover:bg-red-700 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Saving Recipe...' : 'Save Recipe'}
              </button>
              
              {error && <p className="text-red-500 text-center py-2">{error}</p>}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}