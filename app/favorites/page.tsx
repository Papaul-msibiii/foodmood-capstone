import { getFavorites } from '@/lib/favorites'
import { Recipe } from '@/types/recipe'
import RecipeList from '@/components/recipes/RecipeList'
import EmptyState from '@/components/recipes/EmptyState'

export default async function FavoritesPage() {
  // TODO: Implement proper authentication check with NextAuth
  // For now, we'll assume the user is authenticated
  
  let favorites: Recipe[] = []
  try {
    favorites = await getFavorites()
  } catch (error) {
    console.error('Error loading favorites:', error)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Your Favorite Recipes</h1>
        
        {favorites.length === 0 ? (
          <EmptyState
            title="No favorite recipes yet"
            description="Start exploring recipes and save your favorites to see them here."
            actionText="Browse Recipes"
            actionHref="/search"
          />
        ) : (
          <RecipeList recipes={favorites} />
        )}
      </div>
    </div>
  )
}
