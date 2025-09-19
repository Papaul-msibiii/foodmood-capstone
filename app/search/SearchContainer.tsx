'use client'

import { useState } from 'react'
import { Recipe } from '@/types/recipe'
import IngredientInput from '@/components/recipes/IngredientInput'
import RecipeList from '@/components/recipes/RecipeList'
import LoadingCardSkeleton from '@/components/recipes/LoadingCardSkeleton'

export default function SearchContainer() {
  const [recipes, setRecipes] = useState<Recipe[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSearch = async (ingredients: string[]) => {
    if (ingredients.length === 0) {
      setRecipes([])
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch(`/api/recipes/search?ingredients=${ingredients.join(',')}`)
      if (!response.ok) {
        throw new Error('Failed to fetch recipes')
      }
      const data = await response.json()
      setRecipes(data)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Search Recipes by Ingredients</h1>
        
        <div className="mb-8">
          <IngredientInput onSearch={handleSearch} />
        </div>

        {error && <p className="text-red-500 text-center">{error}</p>}

        {isLoading ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <LoadingCardSkeleton key={i} />
            ))}
          </div>
        ) : (
          <RecipeList recipes={recipes} />
        )}
      </div>
    </div>
  )
}
