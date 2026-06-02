import { initializeApp, getApps } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey:            process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain:        process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId:         process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket:     process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId:             process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
}

type AuthInstance = ReturnType<typeof getAuth>
type DbInstance   = ReturnType<typeof getFirestore>

// getAuth() throws auth/invalid-api-key at module load if the key is missing.
// This happens during: Next.js SSR, Vercel static build, and client-side when
// env vars haven't been set. Guard on the config so we return null gracefully
// instead of crashing — all real usage is inside useEffect (client-only).
const isConfigured = !!(firebaseConfig.apiKey && firebaseConfig.projectId)

const app = isConfigured
  ? (getApps().length === 0
      ? initializeApp(firebaseConfig as { [k: string]: string })
      : getApps()[0])
  : null

export const auth: AuthInstance = (isConfigured && app)
  ? getAuth(app)
  : (null as unknown as AuthInstance)

export const db: DbInstance = (isConfigured && app)
  ? getFirestore(app)
  : (null as unknown as DbInstance)
