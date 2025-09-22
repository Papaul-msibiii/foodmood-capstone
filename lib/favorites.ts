import { Recipe } from '@/types/recipe'

interface Favorite {
  id: string
  title: string
  imageUrl?: string
  description?: string
  addedAt: string
}

export async function getFavorites(): Promise<Favorite[]> {
  try {
    const response = await fetch('/api/favorites')
    
    if (!response.ok) {
      if (response.status === 401) {
        throw new Error('You must be logged in to view favorites')
      }
      throw new Error('Failed to fetch favorites')
    }
    
    return await response.json()
  } catch (error) {
    console.error('Error fetching favorites:', error)
    throw error
  }
}

export async function addToFavorites(recipe: Recipe): Promise<void> {
  try {
    const response = await fetch('/api/favorites', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        recipeId: recipe.id,
        recipe: {
          title: recipe.title,
          imageUrl: recipe.imageUrl,
          description: recipe.description,
        },
      }),
    })
    
    if (!response.ok) {
      if (response.status === 401) {
        throw new Error('You must be logged in to add favorites')
      }
      if (response.status === 409) {
        throw new Error('Recipe already in favorites')
      }
      throw new Error('Failed to add to favorites')
    }
  } catch (error) {
    console.error('Error adding to favorites:', error)
    throw error
  }
}

export async function removeFromFavorites(recipeId: string): Promise<void> {
  try {
    const response = await fetch('/api/favorites', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ recipeId }),
    })
    
    if (!response.ok) {
      if (response.status === 401) {
        throw new Error('You must be logged in to remove favorites')
      }
      throw new Error('Failed to remove from favorites')
    }
  } catch (error) {
    console.error('Error removing from favorites:', error)
    throw error
  }
}

export async function toggleFavorite(recipe: Recipe): Promise<boolean> {
  try {
    const isCurrentlyFavorite = await isFavorite(recipe.id)
    
    if (isCurrentlyFavorite) {
      await removeFromFavorites(recipe.id)
      return false
    } else {
      await addToFavorites(recipe)
      return true
    }
  } catch (error) {
    console.error('Error toggling favorite:', error)
    throw error
  }
}

export async function isFavorite(recipeId: string): Promise<boolean> {
  try {
    const response = await fetch(`/api/favorites/${recipeId}`)
    
    if (!response.ok) {
      if (response.status === 401) {
        return false // Not logged in, so not a favorite
      }
      throw new Error('Failed to check favorite status')
    }
    
    const data = await response.json()
    return data.isFavorite
  } catch (error) {
    console.error('Error checking favorite status:', error)
    return false
  }
}
