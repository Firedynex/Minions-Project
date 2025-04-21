import { NextResponse } from 'next/server';
import Recipe from '@/models/recipeSchema'; 
import connectMongoDB from '../../../../config/mongodb';


export async function GET() {
  try {
    await connectMongoDB(); 
    const recipes = await Recipe.find({}); 
    return NextResponse.json(recipes);
  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch recipes' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    await connectMongoDB();
    const body = await request.json();
    console.log("Incoming body:", body);

    const { recipe, instructions, ingredients, servings, nutrition, image, visibility, status, apiId } = body;

    if (!recipe) {
      return NextResponse.json({ error: 'Missing required recipe field' }, { status: 400 });
    }
    //test id until can get userid
    const newRecipe = new Recipe({
      recipe,
      instructions,
      ingredients,
      servings,
      nutrition,
      image,
      visibility,
      status,
      apiId,
      userId: 'guest-user' 
    });

    const saved = await newRecipe.save();
    return NextResponse.json(saved, { status: 201 });

  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json({ error: 'Failed to create recipe' }, { status: 500 });
  }
}