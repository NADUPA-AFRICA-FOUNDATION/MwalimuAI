import { getApps, initializeApp, cert } from 'firebase-admin/app'
import { getAuth } from 'firebase-admin/auth'

function initAdmin() {
  if (getApps().length > 0) return getApps()[0]

  if (process.env.FIREBASE_SERVICE_ACCOUNT_JSON) {
    try {
      // trim() removes any trailing newline/whitespace that breaks JSON.parse
      const raw = process.env.FIREBASE_SERVICE_ACCOUNT_JSON.trim()
      const serviceAccount = JSON.parse(raw)
      return initializeApp({ credential: cert(serviceAccount) })
    } catch (e) {
      console.error('[firebase-admin] Could not parse FIREBASE_SERVICE_ACCOUNT_JSON — falling back to project-id init. Re-paste the service account JSON in Vercel env vars.', e)
    }
  }

  // Fallback: project-id-only init. Sufficient for verifyIdToken (public-key verification).
  return initializeApp({ projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID })
}

// Lazy singleton — evaluated on first import, not at build time
let _adminAuth: ReturnType<typeof getAuth> | null = null
export function getAdminAuth() {
  if (!_adminAuth) _adminAuth = getAuth(initAdmin())
  return _adminAuth
}
