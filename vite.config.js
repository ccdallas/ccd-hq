import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// VITE_CCD_HQ_KEY is baked into the client bundle at build time; CCD_HQ_SECRET
// is read by the Vercel Functions at request time. They must be identical or
// every authenticated request (briefing, sync) silently 401s. Fail the build
// loudly here instead of letting the two drift apart unnoticed.
if (process.env.VERCEL && process.env.CCD_HQ_SECRET !== process.env.VITE_CCD_HQ_KEY) {
  throw new Error(
    'VITE_CCD_HQ_KEY and CCD_HQ_SECRET do not match. Update both in Vercel → Project → Settings → Environment Variables to the same value, then redeploy.'
  )
}

export default defineConfig({
  plugins: [react()],
})
