# CCD HQ - Digital First Responder Dashboard

Personal productivity dashboard for Chaunda C. Dallas.

## Apple ecosystem path

This is a Vite PWA. Deploy it to Vercel, open it in Safari on iPhone or iPad, then use Share -> Add to Home Screen.

## Supabase sync

The app works with local device storage by default. To sync the Jobs module across devices:

1. Apply `supabase/migrations/001_ccd_hq_state.sql` to your Supabase project.
2. Copy `.env.example` to `.env.local`.
3. Fill in `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`, and `VITE_CCD_OWNER_KEY`.
4. Add the same variables to the Vercel project settings.
