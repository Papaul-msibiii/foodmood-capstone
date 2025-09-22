'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { getFavorites } from '@/lib/favorites'
import RecipeList from '@/components/recipes/RecipeList'
import EmptyState from '@/components/recipes/EmptyState'
import { Button } from '@/components/ui/button'
import { Heart, LogIn } from 'lucide-react'
import Link from 'next/link'
import BackButton from '@/components/ui/BackButton'

interface Favorite {
  id: string
  title: string
  imageUrl?: string
  description?: string
  addedAt: string
}

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState<Favorite[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { data: session, status } = useSession()

  useEffect(() => {
    const loadFavorites = async () => {
      if (status === 'loading') return
      
      if (!session?.user) {
        setIsLoading(false)
        return
      }

      try {
        setIsLoading(true)
        setError(null)
        const favoritesData = await getFavorites()
        setFavorites(favoritesData)
      } catch (error: any) {
        setError(error.message || 'Failed to load favorites')
      } finally {
        setIsLoading(false)
      }
    }

    loadFavorites()
  }, [session, status])

  if (status === 'loading' || isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-6">
            <BackButton />
          </div>
          <h1 className="text-3xl font-bold mb-8">Your Favorite Recipes</h1>
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        </div>
      </div>
    )
  }

  if (!session?.user) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-6">
            <BackButton />
          </div>
          <h1 className="text-3xl font-bold mb-8">Your Favorite Recipes</h1>
          <EmptyState
            title="Please log in to view your favorites"
            description="Sign in to your account to save and view your favorite recipes."
            actionText="Sign In"
            actionHref="/auth/sign-in"
            icon={<LogIn className="h-12 w-12 text-muted-foreground" />}
          />
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-6">
            <BackButton />
          </div>
          <h1 className="text-3xl font-bold mb-8">Your Favorite Recipes</h1>
          <div className="text-center py-12">
            <p className="text-red-500 mb-4">{error}</p>
            <Button onClick={() => window.location.reload()}>
              Try Again
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <BackButton />
        </div>
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">Your Favorite Recipes</h1>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Heart className="h-4 w-4" />
            {favorites.length} recipe{favorites.length !== 1 ? 's' : ''}
          </div>
        </div>
        
        {favorites.length === 0 ? (
          <EmptyState
            title="No favorite recipes yet"
            description="Start exploring recipes and save your favorites to see them here."
            actionText="Browse Recipes"
            actionHref="/search"
            icon={<Heart className="h-12 w-12 text-muted-foreground" />}
          />
        ) : (
          <div className="space-y-6">
            <div className="text-sm text-muted-foreground">
              Showing {favorites.length} favorite recipe{favorites.length !== 1 ? 's' : ''}
            </div>
            <RecipeList recipes={favorites.map(fav => ({
              id: fav.id,
              title: fav.title,
              description: fav.description,
              ingredients: [], // Favorites don't store full recipe data
              instructions: [],
              imageUrl: fav.imageUrl,
              tags: [],
              prepTime: undefined,
              cookTime: undefined,
              servings: undefined
            }))} />
          </div>
        )}
      </div>
    </div>
  )
}
