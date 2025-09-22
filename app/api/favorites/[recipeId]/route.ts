import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { connectDB } from '@/lib/utils'
import User from '@/lib/models/User'

// GET /api/favorites/[recipeId] - Vérifier si une recette est en favori
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ recipeId: string }> }
) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.email) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
    }

    const { recipeId } = await params
    
    if (!recipeId) {
      return NextResponse.json({ message: 'Recipe ID is required' }, { status: 400 })
    }

    await connectDB()
    
    const user = await User.findOne({ email: session.user.email })
    
    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 })
    }

    const isFavorite = user.favorites.some((fav: any) => fav.id === recipeId)

    return NextResponse.json({ isFavorite })
  } catch (error) {
    console.error('Error checking favorite:', error)
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 })
  }
}
