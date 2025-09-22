import { NextResponse } from 'next/server';

// TheMealDB API response interfaces
interface TheMealDBMeal {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
  strInstructions: string;
  strCategory: string;
  strArea: string;
  [key: string]: string | undefined; // For dynamic ingredient/measure fields
}

interface TheMealDBResponse {
  meals: TheMealDBMeal[] | null;
}

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  if (!id) {
    return NextResponse.json({ message: 'Recipe ID is required' }, { status: 400 });
  }

  try {
    const response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${encodeURIComponent(id)}`
    );

    if (!response.ok) {
      throw new Error('Failed to fetch from TheMealDB');
    }

    const data: TheMealDBResponse = await response.json();
    
    if (!data.meals || data.meals.length === 0) {
      return NextResponse.json({ message: 'Recipe not found' }, { status: 404 });
    }

    const meal = data.meals[0];

    // Transform TheMealDB data to our Recipe format
    const ingredients: Array<{id: string, name: string}> = [];
    const instructions = meal.strInstructions 
      ? meal.strInstructions.split('\r\n').filter(step => step.trim())
      : [];

    // Extract ingredients and measures
    for (let i = 1; i <= 20; i++) {
      const ingredient = meal[`strIngredient${i}`];
      const measure = meal[`strMeasure${i}`];
      
      if (ingredient && ingredient.trim()) {
        ingredients.push({
          id: `${meal.idMeal}_${i}`,
          name: `${measure ? measure.trim() + ' ' : ''}${ingredient.trim()}`
        });
      }
    }

    const recipe = {
      id: meal.idMeal,
      title: meal.strMeal,
      description: `${meal.strCategory} - ${meal.strArea}`,
      ingredients,
      instructions,
      imageUrl: meal.strMealThumb,
      tags: [meal.strCategory, meal.strArea].filter(Boolean),
      prepTime: undefined, // TheMealDB doesn't provide timing info
      cookTime: undefined,
      servings: undefined
    };

    return NextResponse.json(recipe);

  } catch (error) {
    console.error('Error fetching recipe:', error);
    return NextResponse.json(
      { message: 'Failed to fetch recipe' }, 
      { status: 500 }
    );
  }
}
