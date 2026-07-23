## Executive Summary
CCD-HQ™ is a domain-driven Personal Operating System built specifically for Healthcare Cybersecurity Leadership, Clinical AI Risk Management, and Executive Strategy.

## Architectural Layers
1. **Presentation Layer:** React + Vite SPA, styled with tokenized CSS (`/src/styles/tokens.css`).
2. **Domain Layer:** Explicit domain bounded contexts (`/src/domain/`) isolating business logic.
3. **Connector Framework:** Extensible integration manager (`/src/services/connectors/`) decoupling UI from third-party APIs (Notion, GitHub, Calendar, Email).
4. **Data & Auth Layer:** Supabase PostgreSQL with real-time subscription channels and Row Level Security (RLS).
5. **Intelligence Graph:** Universal Mission Model with Patient Impact evaluation.
