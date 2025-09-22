import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { connectDB } from '@/lib/utils'
import User from '@/lib/models/User'

// GET /api/favorites - Récupérer les favoris de l'utilisateur
export async function GET() {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.email) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
    }

    await connectDB()
    
    const user = await User.findOne({ email: session.user.email })
    
    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 })
    }

    return NextResponse.json(user.favorites || [])
  } catch (error) {
    console.error('Error fetching favorites:', error)
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 })
  }
}

// POST /api/favorites - Ajouter une recette aux favoris
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.email) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
    }

    const { recipeId, recipe } = await request.json()
    
    if (!recipeId || !recipe) {
      return NextResponse.json({ message: 'Recipe ID and recipe data are required' }, { status: 400 })
    }

    await connectDB()
    
    const user = await User.findOne({ email: session.user.email })
    
    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 })
    }

    // Vérifier si la recette est déjà en favori
    const existingFavorite = user.favorites.find((fav: any) => fav.id === recipeId)
    
    if (existingFavorite) {
      return NextResponse.json({ message: 'Recipe already in favorites' }, { status: 409 })
    }

    // Ajouter la recette aux favoris
    user.favorites.push({
      id: recipeId,
      title: recipe.title,
      imageUrl: recipe.imageUrl,
      description: recipe.description,
      addedAt: new Date()
    })

    await user.save()

    return NextResponse.json({ message: 'Recipe added to favorites', favorites: user.favorites })
  } catch (error) {
    console.error('Error adding favorite:', error)
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 })
  }
}

// DELETE /api/favorites - Supprimer une recette des favoris
export async function DELETE(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.email) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
    }

    const { recipeId } = await request.json()
    
    if (!recipeId) {
      return NextResponse.json({ message: 'Recipe ID is required' }, { status: 400 })
    }

    await connectDB()
    
    const user = await User.findOne({ email: session.user.email })
    
    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 })
    }

    // Supprimer la recette des favoris
    user.favorites = user.favorites.filter((fav: any) => fav.id !== recipeId)
    
    await user.save()

    return NextResponse.json({ message: 'Recipe removed from favorites', favorites: user.favorites })
  } catch (error) {
    console.error('Error removing favorite:', error)
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 })
  }
}
