import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig()
  
  const firebaseConfig = {
    projectId: config.public.firebaseProjectId
  }

  // Initialize Firebase
  const app = initializeApp(firebaseConfig)
  
  // Initialize Firestore
  const db = getFirestore(app)

  return {
    provide: {
      firebase: app,
      firestore: db
    }
  }
})
