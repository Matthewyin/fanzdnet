import { 
  collection, 
  doc, 
  getDocs, 
  getDoc, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  query, 
  orderBy, 
  where,
  type DocumentData,
  type QuerySnapshot,
  type DocumentSnapshot
} from 'firebase/firestore'
import type { 
  HeroItem, 
  TimelineEvent, 
  AIsuggestion, 
  ContentPage,
  SupportedLanguage 
} from '~/types/firestore'
import { COLLECTIONS } from '~/types/firestore'

export const useFirestore = () => {
  const { $firestore } = useNuxtApp()

  // 通用 CRUD 操作
  const getCollection = async <T>(collectionName: string): Promise<T[]> => {
    try {
      const q = query(collection($firestore, collectionName), orderBy('order', 'asc'))
      const querySnapshot: QuerySnapshot<DocumentData> = await getDocs(q)
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as T[]
    } catch (error) {
      console.error(`Error fetching ${collectionName}:`, error)
      return []
    }
  }

  const getDocument = async <T>(collectionName: string, id: string): Promise<T | null> => {
    try {
      const docRef = doc($firestore, collectionName, id)
      const docSnap: DocumentSnapshot<DocumentData> = await getDoc(docRef)
      
      if (docSnap.exists()) {
        return {
          id: docSnap.id,
          ...docSnap.data()
        } as T
      }
      return null
    } catch (error) {
      console.error(`Error fetching document ${id} from ${collectionName}:`, error)
      return null
    }
  }

  const addDocument = async <T>(collectionName: string, data: Omit<T, 'id'>): Promise<string | null> => {
    try {
      const docRef = await addDoc(collection($firestore, collectionName), {
        ...data,
        createdAt: new Date(),
        updatedAt: new Date()
      })
      return docRef.id
    } catch (error) {
      console.error(`Error adding document to ${collectionName}:`, error)
      return null
    }
  }

  const updateDocument = async <T>(collectionName: string, id: string, data: Partial<T>): Promise<boolean> => {
    try {
      const docRef = doc($firestore, collectionName, id)
      await updateDoc(docRef, {
        ...data,
        updatedAt: new Date()
      })
      return true
    } catch (error) {
      console.error(`Error updating document ${id} in ${collectionName}:`, error)
      return false
    }
  }

  const deleteDocument = async (collectionName: string, id: string): Promise<boolean> => {
    try {
      const docRef = doc($firestore, collectionName, id)
      await deleteDoc(docRef)
      return true
    } catch (error) {
      console.error(`Error deleting document ${id} from ${collectionName}:`, error)
      return false
    }
  }

  // 特定数据类型的操作
  const getHeroItems = () => getCollection<HeroItem>(COLLECTIONS.HERO_ITEMS)
  const getTimelineEvents = () => getCollection<TimelineEvent>(COLLECTIONS.TIMELINE_EVENTS)
  const getAISuggestions = () => getCollection<AIsuggestion>(COLLECTIONS.AI_SUGGESTIONS)
  const getContentPages = () => getCollection<ContentPage>(COLLECTIONS.CONTENT_PAGES)

  const getHeroItem = (id: string) => getDocument<HeroItem>(COLLECTIONS.HERO_ITEMS, id)
  const getTimelineEvent = (id: string) => getDocument<TimelineEvent>(COLLECTIONS.TIMELINE_EVENTS, id)
  const getContentPage = (id: string) => getDocument<ContentPage>(COLLECTIONS.CONTENT_PAGES, id)

  // 获取随机 AI 建议
  const getRandomAISuggestion = async (language: SupportedLanguage = 'zh'): Promise<string> => {
    try {
      const suggestions = await getAISuggestions()
      const activeSuggestions = suggestions.filter(s => s.isActive)
      
      if (activeSuggestions.length === 0) {
        return '暂无灵感，请稍后再试。'
      }

      const randomSuggestion = activeSuggestions[Math.floor(Math.random() * activeSuggestions.length)]
      const randomText = randomSuggestion.suggestions[Math.floor(Math.random() * randomSuggestion.suggestions.length)]
      
      return randomText[language] || randomText.zh
    } catch (error) {
      console.error('Error getting random AI suggestion:', error)
      return '抱歉，灵感暂时枯竭了，请稍后再试。'
    }
  }

  return {
    // 通用操作
    getCollection,
    getDocument,
    addDocument,
    updateDocument,
    deleteDocument,
    
    // 特定操作
    getHeroItems,
    getTimelineEvents,
    getAISuggestions,
    getContentPages,
    getHeroItem,
    getTimelineEvent,
    getContentPage,
    getRandomAISuggestion
  }
}
