
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

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const ingredients = searchParams.get('ingredients');

  if (!ingredients) {
    return NextResponse.json({ message: 'Ingredients are required' }, { status: 400 });
  }

  try {
    // TheMealDB doesn't have a direct "search by ingredients" endpoint
    // We'll use the filter by main ingredient endpoint and then filter by ingredients
    const ingredientList = ingredients.split(',').map(ing => ing.trim());
    const mainIngredient = ingredientList[0]; // Use first ingredient as main ingredient
    
    const response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/filter.php?i=${encodeURIComponent(mainIngredient)}`
    );

    if (!response.ok) {
      throw new Error('Failed to fetch from TheMealDB');
    }

    const data: TheMealDBResponse = await response.json();
    
    if (!data.meals) {
      return NextResponse.json([]);
    }

    // Get detailed information for each meal
    const detailedMeals = await Promise.all(
      data.meals.slice(0, 12).map(async (meal) => {
        const detailResponse = await fetch(
          `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${meal.idMeal}`
        );
        const detailData = await detailResponse.json();
        return detailData.meals[0];
      })
    );

    // Transform TheMealDB data to our Recipe format
    const transformedRecipes = detailedMeals.map(meal => {
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

      return {
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
    });

    return NextResponse.json(transformedRecipes);

  } catch (error) {
    console.error('Error fetching recipes:', error);
    return NextResponse.json(
      { message: 'Failed to fetch recipes' }, 
      { status: 500 }
    );
  }
}
