import { getFirestoreAdmin } from '~/server/utils/firebase'
import { COLLECTIONS } from '~/types/firestore'
import type { TimelineEvent } from '~/types/firestore'

export default defineEventHandler(async (event) => {
  try {
    const db = getFirestoreAdmin()
    
    const timelineSnapshot = await db
      .collection(COLLECTIONS.TIMELINE_EVENTS)
      .orderBy('order', 'asc')
      .get()
    
    const timelineEvents: TimelineEvent[] = []
    
    timelineSnapshot.docs.forEach(doc => {
      timelineEvents.push({
        id: doc.id,
        ...doc.data()
      } as TimelineEvent)
    })
    
    return {
      success: true,
      data: timelineEvents
    }
    
  } catch (error) {
    console.error('Error fetching timeline events:', error)
    return {
      success: false,
      error: 'Failed to fetch timeline events'
    }
  }
})
