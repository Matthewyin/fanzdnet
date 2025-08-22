import { getFirestoreAdmin } from '~/server/utils/firebase'
import { COLLECTIONS } from '~/types/firestore'
import type { HeroItem } from '~/types/firestore'

export default defineEventHandler(async (event) => {
  try {
    const db = getFirestoreAdmin()
    
    const heroSnapshot = await db
      .collection(COLLECTIONS.HERO_ITEMS)
      .orderBy('order', 'asc')
      .get()
    
    const heroItems: HeroItem[] = []
    
    heroSnapshot.docs.forEach(doc => {
      heroItems.push({
        id: doc.id,
        ...doc.data()
      } as HeroItem)
    })
    
    return {
      success: true,
      data: heroItems
    }
    
  } catch (error) {
    console.error('Error fetching hero items:', error)
    return {
      success: false,
      error: 'Failed to fetch hero items'
    }
  }
})
