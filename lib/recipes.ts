import { Recipe } from '@/types/recipe';

export async function getRecipeById(id: string): Promise<Recipe | null> {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/recipes/${id}`, {
      cache: 'no-store' // Ensure we get fresh data
    });

    if (!response.ok) {
      if (response.status === 404) {
        return null;
      }
      throw new Error('Failed to fetch recipe');
    }

    const recipe = await response.json();
    return recipe;
  } catch (error) {
    console.error('Error fetching recipe:', error);
    return null;
  }
}
