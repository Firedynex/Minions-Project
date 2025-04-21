'use client';
import { FormEvent, useState } from 'react';

interface Nutrition {
    calories: number;
    protein: number;
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
    nutrition: { calories: 0, protein: 0, carbs: 0, fat: 0 },
    image: '',
    visibility: 'public',
    status: 'draft'
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

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
      {/* Title */}
      <input
        type="text"
        placeholder="Recipe Title"
        value={data.recipe}
        onChange={(e) => setData({ ...data, recipe: e.target.value })}
        required
        className="w-full p-3 bg-gray-800 rounded"
      />

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
        />
        <input
          type="url"
          placeholder="Image URL"
          value={data.image}
          onChange={(e) => setData({ ...data, image: e.target.value })}
          className="p-3 bg-gray-800 rounded"
        />
      </div>

      {/* Nutrition */}
      <div className="grid grid-cols-2 gap-4">
        {(['calories','protein','carbs','fat'] as const).map((key) => (
          <input
            key={key}
            type="number"
            placeholder={key}
            value={data.nutrition[key]}
            onChange={(e) =>
              setData({
                ...data,
                nutrition: { ...data.nutrition, [key]: +e.target.value }
              })
            }
            className="p-3 bg-gray-800 rounded"
          />
        ))}
      </div>

      {/* Visibility & Status */}
      <div className="flex gap-4">
        <select
          value={data.visibility}
          onChange={(e) => setData({ ...data, visibility: e.target.value as any })}
          className="p-3 bg-gray-800 rounded"
        >
          <option value="public">Public</option>
          <option value="private">Private</option>
        </select>
        <select
          value={data.status}
          onChange={(e) => setData({ ...data, status: e.target.value as any })}
          className="p-3 bg-gray-800 rounded"
        >
          <option value="draft">Draft</option>
          <option value="published">Published</option>
        </select>
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={loading}
        className="w-full py-3 bg-red-600 rounded"
      >
        {loading ? 'Saving...' : 'Save Recipe'}
      </button>
      {error && <p className="text-red-500">{error}</p>}
    </form>
  );
}
