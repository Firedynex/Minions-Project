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
        nutrition: { calories: 0, protein: 0, carbs: 0, fat: 0 },
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
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Title Input with Loading Indicator */}
      <div className="relative">
        <input
          type="text"
          placeholder="Recipe Title"
          value={data.recipe}
          onChange={(e) => setData({ ...data, recipe: e.target.value })}
          required
          className="w-full p-3 bg-gray-800 rounded pr-24"
        />
        {nutritionLoading && (
          <div className="absolute right-3 top-3 text-gray-400 text-sm">
            Loading nutrition...
          </div>
        )}
      </div>

      {/* Ingredients */}
      <textarea
        placeholder="Ingredients (one per line)"
        value={data.ingredients.join('\n')}
        onChange={(e) => setData({ ...data, ingredients: e.target.value.split('\n') })}
        className="w-full p-3 bg-gray-800 rounded h-32"
      />

      {/* Instructions */}
      <textarea
        placeholder="Instructions (one per line)"
        value={data.instructions.join('\n')}
        onChange={(e) => setData({ ...data, instructions: e.target.value.split('\n') })}
        className="w-full p-3 bg-gray-800 rounded h-32"
      />

      {/* Servings & Image */}
      <div className="grid grid-cols-2 gap-4">
        <input
          type="number"
          placeholder="Servings"
          value={data.servings}
          onChange={(e) => setData({ ...data, servings: +e.target.value })}
          className="p-3 bg-gray-800 rounded"
          min="1"
        />
        <input
          type="url"
          placeholder="Image URL"
          value={data.image}
          onChange={(e) => setData({ ...data, image: e.target.value })}
          className="p-3 bg-gray-800 rounded"
        />
      </div>

      {/* Nutrition Inputs */}
      <div className="grid grid-cols-2 gap-4">
        {(['cholesterol', 'sugar', 'carbs', 'fat'] as const).map((key) => (
          <input
            key={key}
            type="number"
            placeholder={key}
            value={data.nutrition[key]}
            onChange={(e) =>
              setData({
                ...data,
                nutrition: { ...data.nutrition, [key]: Math.max(0, +e.target.value) }
              })
            }
            className="p-3 bg-gray-800 rounded"
            min="0"
          />
        ))}
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={loading}
        className="w-full py-3 bg-red-600 rounded disabled:opacity-50"
      >
        {loading ? 'Saving...' : 'Save Recipe'}
      </button>
      
      {error && <p className="text-red-500">{error}</p>}
    </form>
  );
}