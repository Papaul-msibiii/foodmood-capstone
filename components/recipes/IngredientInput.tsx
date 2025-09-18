'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { X } from 'lucide-react'

interface IngredientInputProps {
  initialIngredients?: string[]
}

export default function IngredientInput({ initialIngredients = [] }: IngredientInputProps) {
  const [ingredients, setIngredients] = useState<string[]>(initialIngredients)
  const [inputValue, setInputValue] = useState('')
  const router = useRouter()

  const addIngredient = () => {
    const trimmed = inputValue.trim().toLowerCase()
    if (trimmed && !ingredients.includes(trimmed)) {
      setIngredients([...ingredients, trimmed])
      setInputValue('')
    }
  }

  const removeIngredient = (ingredient: string) => {
    setIngredients(ingredients.filter(i => i !== ingredient))
  }

  const handleSubmit = () => {
    if (ingredients.length > 0) {
      const query = ingredients.join(',')
      router.push(`/search?ingredients=${encodeURIComponent(query)}`)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      addIngredient()
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <Input
          placeholder="Add an ingredient..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={handleKeyPress}
          className="flex-1"
        />
        <Button onClick={addIngredient} disabled={!inputValue.trim()}>
          Add
        </Button>
      </div>
      
      {ingredients.length > 0 && (
        <div className="space-y-2">
          <div className="flex flex-wrap gap-2">
            {ingredients.map((ingredient) => (
              <Badge key={ingredient} variant="secondary" className="flex items-center gap-1">
                {ingredient}
                <button
                  onClick={() => removeIngredient(ingredient)}
                  className="ml-1 hover:bg-destructive hover:text-destructive-foreground rounded-full p-0.5"
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            ))}
          </div>
          
          <Button onClick={handleSubmit} className="w-full">
            Find Recipes
          </Button>
        </div>
      )}
    </div>
  )
}
