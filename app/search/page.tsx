'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { searchRecipes } from '@/lib/recipes'
import { Recipe } from '@/types/recipe'
import IngredientInput from '@/components/recipes/IngredientInput'
import RecipeList from '@/components/recipes/RecipeList'
import LoadingCardSkeleton from '@/components/recipes/LoadingCardSkeleton'

export default function SearchPage() {
  const searchParams = useSearchParams()
  const [recipes, setRecipes] = useState<Recipe[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [ingredients, setIngredients] = useState<string[]>([])

  useEffect(() => {
    const ingredientsParam = searchParams.get('ingredients')
    if (ingredientsParam) {
      const ingredientsList = ingredientsParam.split(',').map(i => i.trim())
      setIngredients(ingredientsList)
      searchForRecipes(ingredientsList)
    }
  }, [searchParams])

  const searchForRecipes = async (ingredientsList: string[]) => {
    if (ingredientsList.length === 0) return
    
    setIsLoading(true)
    try {
      const results = await searchRecipes(ingredientsList)
      setRecipes(results)
    } catch (error) {
      console.error('Error searching recipes:', error)
      setRecipes([])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Search Recipes</h1>
        
        <div className="mb-8">
          <IngredientInput initialIngredients={ingredients} />
        </div>

        {ingredients.length > 0 && (
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-4">
              Recipes with: {ingredients.join(', ')}
            </h2>
            
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
        )}
      </div>
    </div>
  )
}
