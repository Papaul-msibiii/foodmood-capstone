export interface Ingredient {
  id: string;
  name: string;
}

export interface Recipe {
  id: string;
  title: string;
  description?: string;
  ingredients: Ingredient[];
  instructions: string[];
  imageUrl?: string;
  tags?: string[];
  prepTime?: number; // in minutes
  cookTime?: number; // in minutes
  servings?: number;
}
