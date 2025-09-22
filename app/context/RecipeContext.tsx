'use client'

import { createContext, useContext, useState, ReactNode } from 'react'
import { Recipe } from '@/types/recipe'

interface RecipeContextType {
  recipes: Recipe[]
  setRecipes: (recipes: Recipe[]) => void
  isLoading: boolean
  setIsLoading: (loading: boolean) => void
  error: string | null
  setError: (error: string | null) => void
  searchIngredients: string[]
  setSearchIngredients: (ingredients: string[]) => void
  searchRecipes: (ingredients: string[]) => Promise<void>
  clearResults: () => void
}

const RecipeContext = createContext<RecipeContextType | undefined>(undefined)

export function RecipeProvider({ children }: { children: ReactNode }) {
  const [recipes, setRecipes] = useState<Recipe[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [searchIngredients, setSearchIngredients] = useState<string[]>([])

  const searchRecipes = async (ingredients: string[]) => {
    if (ingredients.length === 0) {
      setRecipes([])
      setSearchIngredients([])
      return
    }

    setIsLoading(true)
    setError(null)
    setSearchIngredients(ingredients)

    try {
      const response = await fetch(`/api/recipes/search?ingredients=${ingredients.join(',')}`)
      if (!response.ok) {
        throw new Error('Failed to fetch recipes')
      }
      const data = await response.json()
      setRecipes(data)
    } catch (err: any) {
      console.error('Error fetching recipes:', err)
      setError(err.message)
      setRecipes([])
    } finally {
      setIsLoading(false)
    }
  }

  const clearResults = () => {
    setRecipes([])
    setSearchIngredients([])
    setError(null)
  }

  return (
    <RecipeContext.Provider
      value={{
        recipes,
        setRecipes,
        isLoading,
        setIsLoading,
        error,
        setError,
        searchIngredients,
        setSearchIngredients,
        searchRecipes,
        clearResults,
      }}
    >
      {children}
    </RecipeContext.Provider>
  )
}

export function useRecipes() {
  const context = useContext(RecipeContext)
  if (context === undefined) {
    throw new Error('useRecipes must be used within a RecipeProvider')
  }
  return context
}
