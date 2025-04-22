import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('query');

  if (!query) {
    return NextResponse.json({ error: 'Missing query parameter' }, { status: 400 });
  }

  const apiKey = process.env.API_NINJAS_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: 'API key not configured' }, { status: 500 });
  }

  try {
    const response = await fetch(
      `https://api.api-ninjas.com/v1/recipe?query=${encodeURIComponent(query)}`,
      { headers: { 'X-Api-Key': apiKey } }
    );

    if (!response.ok) throw new Error('Recipe details not found');

    const recipes = await response.json();
    if (!recipes || recipes.length === 0) {
      return NextResponse.json({ error: 'No recipes found' }, { status: 404 });
    }

    const recipe = recipes[0];
    
    const instructions = recipe.instructions
      .replace(/(\d+\))/g, '\n$1')
      .split('\n')
      .filter(step => step.trim() !== '')
      .map(step => step.trim());

    const ingredients = recipe.ingredients
      .split('|')
      .filter(ingredient => ingredient.trim() !== '')
      .map(ingredient => ingredient.trim());

    const servings = recipe.servings ? parseInt(recipe.servings) : 4;

    return NextResponse.json({
      ingredients,
      instructions,
      servings
    });
  } catch (err) {
    console.error('Recipe API error:', err);
    return NextResponse.json(
      { error: 'Failed to fetch recipe details' },
      { status: 500 }
    );
  }
}