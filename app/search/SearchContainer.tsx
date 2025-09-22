'use client'

import { useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import IngredientInput from '@/components/recipes/IngredientInput'
import SearchResults from '@/components/recipes/SearchResults'
import { useRecipes } from '@/app/context/RecipeContext'
import BackButton from '@/components/ui/BackButton'

export default function SearchContainer() {
  const { searchRecipes, searchIngredients, clearResults } = useRecipes()
  const searchParams = useSearchParams()

  useEffect(() => {
    const ingredientsParam = searchParams.get('ingredients')
    if (ingredientsParam) {
      const ingredients = ingredientsParam.split(',').map(ing => ing.trim())
      searchRecipes(ingredients)
    }
  }, [searchParams, searchRecipes])

  const handleSearch = (ingredients: string[]) => {
    searchRecipes(ingredients)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <BackButton />
        </div>
        <h1 className="text-3xl font-bold mb-8">Search Recipes by Ingredients</h1>
        
        <div className="mb-8">
          <IngredientInput onSearch={handleSearch} />
          {searchIngredients.length > 0 && (
            <div className="mt-4 text-center">
              <p className="text-muted-foreground mb-2">
                Showing results for: <span className="font-medium">{searchIngredients.join(', ')}</span>
              </p>
            </div>
          )}
        </div>

        <SearchResults />
      </div>
    </div>
  )
}
