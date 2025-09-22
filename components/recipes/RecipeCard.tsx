'use client'

import { useState, useEffect } from 'react'
import { Recipe } from '@/types/recipe'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Heart, Clock, Users, AlertCircle } from 'lucide-react'
import { formatTime } from '@/lib/utils'
import { toggleFavorite, isFavorite } from '@/lib/favorites'
import { useSession } from 'next-auth/react'
import Image from 'next/image'

interface RecipeCardProps {
  recipe: Recipe
}

export default function RecipeCard({ recipe }: RecipeCardProps) {
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
    <Card className="h-full flex flex-col">
      <CardHeader>
        <CardTitle className="line-clamp-2">{recipe.title}</CardTitle>
        {recipe.description && (
          <p className="text-sm text-muted-foreground line-clamp-2">
            {recipe.description}
          </p>
        )}
      </CardHeader>
      
      <CardContent className="flex-1">
        <div className="space-y-4">
          {/* Recipe Image */}
          <div className="aspect-video bg-muted rounded-md overflow-hidden relative">
            {recipe.imageUrl ? (
              <Image
                src={recipe.imageUrl}
                alt={recipe.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-muted-foreground text-sm">
                No image
              </div>
            )}
          </div>

          {/* Recipe Info */}
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            {recipe.prepTime && (
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                <span>{formatTime(recipe.prepTime)}</span>
              </div>
            )}
            {recipe.servings && (
              <div className="flex items-center gap-1">
                <Users className="h-4 w-4" />
                <span>{recipe.servings} servings</span>
              </div>
            )}
          </div>

          {/* Ingredients */}
          <div className="space-y-2">
            <h4 className="text-sm font-medium">Ingredients:</h4>
            <div className="flex flex-wrap gap-1">
              {recipe.ingredients.slice(0, 5).map((ingredient) => (
                <Badge key={ingredient.id} variant="outline" className="text-xs">
                  {ingredient.name}
                </Badge>
              ))}
              {recipe.ingredients.length > 5 && (
                <Badge variant="outline" className="text-xs">
                  +{recipe.ingredients.length - 5} more
                </Badge>
              )}
            </div>
          </div>

          {/* Tags */}
          {recipe.tags && recipe.tags.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {recipe.tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>
          )}
        </div>
      </CardContent>

      <CardFooter className="pt-0 flex-col">
        <div className="flex w-full gap-2">
          <Button variant="outline" className="flex-1" asChild>
            <a href={`/recipe/${recipe.id}`}>View Recipe</a>
          </Button>
          <Button
            variant={isRecipeFavorite ? "default" : "outline"}
            size="sm"
            onClick={handleToggleFavorite}
            disabled={isLoading || favoriteLoading}
            title={session?.user ? (isRecipeFavorite ? "Remove from favorites" : "Add to favorites") : "Login to add favorites"}
          >
            <Heart className={`h-4 w-4 ${isRecipeFavorite ? 'fill-current' : ''}`} />
          </Button>
        </div>
        {error && (
          <div className="w-full mt-2 p-2 bg-red-50 border border-red-200 rounded-md flex items-center gap-2 text-sm text-red-600">
            <AlertCircle className="h-4 w-4" />
            {error}
          </div>
        )}
      </CardFooter>
    </Card>
  )
}
