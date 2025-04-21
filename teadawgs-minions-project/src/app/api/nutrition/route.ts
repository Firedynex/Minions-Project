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
      `https://api.api-ninjas.com/v1/nutrition?query=${encodeURIComponent(query)}`,
      { headers: { 'X-Api-Key': apiKey } }
    );

    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }

    const apiData = await response.json();
    const firstItem = apiData[0] || {};

    console.log('API Response:', firstItem);

    return NextResponse.json({
      cholesterol: typeof firstItem.cholesterol_mg === 'number' ? firstItem.cholesterol_mg : 0,
      sugar: typeof firstItem.sugar_g === 'number' ? firstItem.sugar_g : 0,
      carbs: typeof firstItem.carbohydrates_total_g === 'number' ? firstItem.carbohydrates_total_g : 0,
      fat: typeof firstItem.fat_total_g === 'number' ? firstItem.fat_total_g : 0
    });
  } catch (error) {
    console.error('Nutrition API error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch nutrition data' },
      { status: 500 }
    );
  }
}
