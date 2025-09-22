'use client'

import { useRecipes } from '@/app/context/RecipeContext'
import RecipeList from './RecipeList'
import LoadingCardSkeleton from './LoadingCardSkeleton'

export default function SearchResults() {
  const { recipes, isLoading, error, searchIngredients } = useRecipes()

  // Debug logs
  console.log('SearchResults render:', { recipes: recipes.length, isLoading, error, searchIngredients })

  if (error) {
    return <p className="text-red-500 text-center">{error}</p>
  }

  if (isLoading) {
    return (
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <LoadingCardSkeleton key={i} />
        ))}
      </div>
    )
  }

  if (recipes.length === 0 && searchIngredients.length === 0) {
    return null
  }

  if (recipes.length === 0 && searchIngredients.length > 0) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">
          No recipes found for: {searchIngredients.join(', ')}
        </p>
      </div>
    )
  }

  return <RecipeList recipes={recipes} />
}
