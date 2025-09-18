import { Recipe, Ingredient } from '@/types/recipe'

// Mock data for development
const mockRecipes: Recipe[] = [
  {
    id: '1',
    title: 'Classic Margherita Pizza',
    description: 'A simple yet delicious pizza with fresh tomatoes, mozzarella, and basil',
    ingredients: [
      { id: '1', name: 'tomato' },
      { id: '2', name: 'mozzarella' },
      { id: '3', name: 'basil' },
      { id: '4', name: 'pizza dough' },
      { id: '5', name: 'olive oil' }
    ],
    instructions: [
      'Preheat oven to 450°F',
      'Roll out pizza dough',
      'Add tomato sauce, mozzarella, and basil',
      'Bake for 12-15 minutes'
    ],
    imageUrl: '/placeholder-pizza.svg',
    tags: ['italian', 'vegetarian'],
    prepTime: 20,
    cookTime: 15,
    servings: 4
  },
  {
    id: '2',
    title: 'Chicken Stir Fry',
    description: 'Quick and healthy chicken stir fry with vegetables',
    ingredients: [
      { id: '6', name: 'chicken breast' },
      { id: '7', name: 'onion' },
      { id: '8', name: 'bell pepper' },
      { id: '9', name: 'soy sauce' },
      { id: '10', name: 'garlic' }
    ],
    instructions: [
      'Cut chicken into strips',
      'Heat oil in wok',
      'Cook chicken until golden',
      'Add vegetables and stir fry',
      'Add soy sauce and season'
    ],
    imageUrl: '/placeholder-stirfry.svg',
    tags: ['asian', 'healthy'],
    prepTime: 15,
    cookTime: 10,
    servings: 2
  }
]

export async function searchRecipes(ingredients: string[]): Promise<Recipe[]> {
  // TODO: Replace with real API call
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000))
  
  // Filter recipes that contain at least one of the provided ingredients
  const matchingRecipes = mockRecipes.filter(recipe =>
    recipe.ingredients.some(ingredient =>
      ingredients.some(searchIngredient =>
        ingredient.name.toLowerCase().includes(searchIngredient.toLowerCase())
      )
    )
  )
  
  return matchingRecipes
}

export async function getRecipeById(id: string): Promise<Recipe | null> {
  // TODO: Replace with real API call
  await new Promise(resolve => setTimeout(resolve, 500))
  
  return mockRecipes.find(recipe => recipe.id === id) || null
}
