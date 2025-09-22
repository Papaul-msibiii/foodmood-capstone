'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { Button } from '@/components/ui/button'
import { Heart, AlertCircle } from 'lucide-react'
import { toggleFavorite, isFavorite } from '@/lib/favorites'
import { Recipe } from '@/types/recipe'

interface FavoriteButtonProps {
  recipe: Recipe
}

export default function FavoriteButton({ recipe }: FavoriteButtonProps) {
  const [isRecipeFavorite, setIsRecipeFavorite] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [favoriteLoading, setFavoriteLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { data: session } = useSession()

  // Vérifier le statut favori au chargement
  useEffect(() => {
    const checkFavoriteStatus = async () => {
      if (session?.user) {
        try {
          setFavoriteLoading(true)
          const favoriteStatus = await isFavorite(recipe.id)
          setIsRecipeFavorite(favoriteStatus)
        } catch (error) {
          console.error('Error checking favorite status:', error)
        } finally {
          setFavoriteLoading(false)
        }
      } else {
        setFavoriteLoading(false)
      }
    }

    checkFavoriteStatus()
  }, [recipe.id, session])

  const handleToggleFavorite = async () => {
    if (!session?.user) {
      setError('You must be logged in to add favorites')
      return
    }

    setIsLoading(true)
    setError(null)
    try {
      const newFavoriteState = await toggleFavorite(recipe)
      setIsRecipeFavorite(newFavoriteState)
    } catch (error: any) {
      setError(error.message || 'Error toggling favorite')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="w-full space-y-2">
      <Button 
        className="w-full" 
        size="lg"
        variant={isRecipeFavorite ? "default" : "outline"}
        onClick={handleToggleFavorite}
        disabled={isLoading || favoriteLoading}
      >
        <Heart className={`mr-2 h-4 w-4 ${isRecipeFavorite ? 'fill-current' : ''}`} />
        {session?.user ? (
          isLoading ? 'Saving...' : favoriteLoading ? 'Loading...' : (
            isRecipeFavorite ? 'Remove from Favorites' : 'Add to Favorites'
          )
        ) : (
          'Login to Add Favorites'
        )}
      </Button>
      {error && (
        <div className="p-2 bg-red-50 border border-red-200 rounded-md flex items-center gap-2 text-sm text-red-600">
          <AlertCircle className="h-4 w-4" />
          {error}
        </div>
      )}
    </div>
  )
}
