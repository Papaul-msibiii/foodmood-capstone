import { ChefHat } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

interface EmptyStateProps {
  title?: string
  description?: string
  actionText?: string
  actionHref?: string
}

export default function EmptyState({
  title = "No recipes found",
  description = "Try adjusting your ingredients or search criteria.",
  actionText = "Search Recipes",
  actionHref = "/search"
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-muted">
        <ChefHat className="h-6 w-6 text-muted-foreground" />
      </div>
      <h3 className="mt-4 text-lg font-semibold">{title}</h3>
      <p className="mt-2 text-sm text-muted-foreground max-w-sm">
        {description}
      </p>
      {actionText && actionHref && (
        <Button asChild className="mt-4">
          <Link href={actionHref}>{actionText}</Link>
        </Button>
      )}
    </div>
  )
}
