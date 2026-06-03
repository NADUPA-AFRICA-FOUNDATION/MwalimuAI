import { getApps, initializeApp, cert } from 'firebase-admin/app'
import { getAuth } from 'firebase-admin/auth'

function initAdmin() {
  if (getApps().length > 0) return getApps()[0]

  if (process.env.FIREBASE_SERVICE_ACCOUNT_JSON) {
    const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_JSON)
    return initializeApp({ credential: cert(serviceAccount) })
  }

  // Fallback: project-id-only init. Sufficient for verifyIdToken (public-key verification).
  // For production, set FIREBASE_SERVICE_ACCOUNT_JSON.
  return initializeApp({ projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID })
}

export const adminAuth = getAuth(initAdmin())
