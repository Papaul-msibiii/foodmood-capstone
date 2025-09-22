'use client'
import { Button } from "@/components/ui/button"
import { ChefHat, Search } from "lucide-react"
import Link from "next/link"
import IngredientInput from "@/components/recipes/IngredientInput"
import SearchResults from "@/components/recipes/SearchResults"
import { useRecipes } from "@/app/context/RecipeContext"

export default function Home() {
  const { searchRecipes, searchIngredients, clearResults, recipes, isLoading } = useRecipes()

  const handleSearch = (ingredients: string[]) => {
    searchRecipes(ingredients)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <div className="text-center py-12 md:py-20">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 mb-6">
          <ChefHat className="h-8 w-8 text-primary" />
        </div>
        
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
          Discover Your Next
          <span className="text-primary block">Favorite Recipe</span>
        </h1>
        
        <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
          Tell us what ingredients you have, and we'll recommend delicious recipes 
          you can make right now.
        </p>
        
        <div className="max-w-md mx-auto mb-8">
          <IngredientInput onSearch={handleSearch} />
          {searchIngredients.length > 0 && (
            <Button 
              variant="outline" 
              size="sm" 
              onClick={clearResults}
              className="mt-2"
            >
              Clear Results
            </Button>
          )}
        </div>

        {/* Search Results Section - moved up */}
        {(searchIngredients.length > 0 || isLoading || recipes.length > 0) && (
          <div className="max-w-6xl mx-auto mb-8">
            {searchIngredients.length > 0 && (
              <h2 className="text-2xl font-bold mb-6 text-center">
                Recipes for: {searchIngredients.join(', ')}
              </h2>
            )}
            <SearchResults />
          </div>
        )}
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild size="lg">
            <Link href="/search">
              <Search className="mr-2 h-4 w-4" />
              Browse Recipes
            </Link>
          </Button>
          <Button variant="outline" size="lg" asChild>
            <Link href="/favorites">
              View Favorites
            </Link>
          </Button>
        </div>
      </div>

      {/* Features Section */}
      <div className="grid md:grid-cols-3 gap-8 py-12">
        <div className="text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 mb-4">
            <Search className="h-6 w-6 text-primary" />
          </div>
          <h3 className="text-lg font-semibold mb-2">Smart Search</h3>
          <p className="text-muted-foreground">
            Enter your available ingredients and get personalized recipe recommendations.
          </p>
        </div>
        
        <div className="text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 mb-4">
            <ChefHat className="h-6 w-6 text-primary" />
          </div>
          <h3 className="text-lg font-semibold mb-2">Curated Recipes</h3>
          <p className="text-muted-foreground">
            Discover delicious recipes from our carefully curated collection.
          </p>
        </div>
        
        <div className="text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 mb-4">
            <Search className="h-6 w-6 text-primary" />
          </div>
          <h3 className="text-lg font-semibold mb-2">Save Favorites</h3>
          <p className="text-muted-foreground">
            Keep track of your favorite recipes for easy access later.
          </p>
        </div>
      </div>

    </div>
  )
}