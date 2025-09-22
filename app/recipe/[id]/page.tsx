import { getRecipeById } from '@/lib/recipes'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Clock, Users, Heart } from 'lucide-react'
import { formatTime } from '@/lib/utils'
import EmptyState from '@/components/recipes/EmptyState'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import FavoriteButton from '@/components/recipes/FavoriteButton'
import BackButton from '@/components/ui/BackButton'

interface RecipePageProps {
  params: {
    id: string
  }
}

export default async function RecipePage({ params }: RecipePageProps) {
  const { id } = await params
  const recipe = await getRecipeById(id)

  if (!recipe) {
    notFound()
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <div className="mb-6">
          <BackButton />
        </div>
        
        {/* Recipe Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">{recipe.title}</h1>
          {recipe.description && (
            <p className="text-xl text-muted-foreground mb-6">
              {recipe.description}
            </p>
          )}
          
          {/* Recipe Info */}
          <div className="flex items-center gap-6 mb-6">
            {recipe.prepTime && (
              <div className="flex items-center gap-2 text-muted-foreground">
                <Clock className="h-4 w-4" />
                <span>Prep: {formatTime(recipe.prepTime)}</span>
              </div>
            )}
            {recipe.cookTime && (
              <div className="flex items-center gap-2 text-muted-foreground">
                <Clock className="h-4 w-4" />
                <span>Cook: {formatTime(recipe.cookTime)}</span>
              </div>
            )}
            {recipe.servings && (
              <div className="flex items-center gap-2 text-muted-foreground">
                <Users className="h-4 w-4" />
                <span>{recipe.servings} servings</span>
              </div>
            )}
          </div>

          {/* Tags */}
          {recipe.tags && recipe.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-6">
              {recipe.tags.map((tag) => (
                <Badge key={tag} variant="secondary">
                  {tag}
                </Badge>
              ))}
            </div>
          )}
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Recipe Image */}
          <div className="space-y-6">
            <div className="aspect-video bg-muted rounded-lg overflow-hidden relative">
              {recipe.imageUrl ? (
                <Image
                  src={recipe.imageUrl}
                  alt={recipe.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  priority
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                  No image available
                </div>
              )}
            </div>

            {/* Save to Favorites Button */}
            <FavoriteButton recipe={recipe} />
          </div>

          {/* Recipe Content */}
          <div className="space-y-6">
            {/* Ingredients */}
            <Card>
              <CardHeader>
                <CardTitle>Ingredients</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {recipe.ingredients.map((ingredient) => (
                    <li key={ingredient.id} className="flex items-center gap-2">
                      <div className="h-2 w-2 bg-primary rounded-full flex-shrink-0" />
                      <span>{ingredient.name}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Instructions */}
            <Card>
              <CardHeader>
                <CardTitle>Instructions</CardTitle>
              </CardHeader>
              <CardContent>
                <ol className="space-y-4">
                  {recipe.instructions.map((instruction, index) => (
                    <li key={index} className="flex gap-3">
                      <div className="flex-shrink-0 h-6 w-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-medium">
                        {index + 1}
                      </div>
                      <span>{instruction}</span>
                    </li>
                  ))}
                </ol>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
