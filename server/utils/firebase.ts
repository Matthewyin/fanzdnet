import { initializeApp, getApps, cert } from 'firebase-admin/app'
import { getFirestore } from 'firebase-admin/firestore'

let app: any
let db: any

export function getFirebaseAdmin() {
  if (!app) {
    // 在生产环境中，Firebase Admin SDK 会自动使用服务账户
    if (getApps().length === 0) {
      app = initializeApp({
        projectId: process.env.NUXT_PUBLIC_FIREBASE_PROJECT_ID || 'n8n-project-460516'
      })
    } else {
      app = getApps()[0]
    }
    
    db = getFirestore(app)
  }
  
  return { app, db }
}

export function getFirestoreAdmin() {
  const { db } = getFirebaseAdmin()
  return db
}
