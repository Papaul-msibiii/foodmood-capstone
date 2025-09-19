
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const ingredients = searchParams.get('ingredients');

  if (!ingredients) {
    return NextResponse.json({ message: 'Ingredients are required' }, { status: 400 });
  }

  const SPOONACULAR_API_KEY = process.env.SPOONACULAR_API_KEY;

  if (!SPOONACULAR_API_KEY) {
    return NextResponse.json({ message: 'Spoonacular API key is not configured' }, { status: 500 });
  }

  const response = await fetch(
    `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${ingredients}&number=12&apiKey=${SPOONACULAR_API_KEY}`
  );

  const data = await response.json();

  return NextResponse.json(data);
}
