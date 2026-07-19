create table if not exists public.ccd_hq_state (
  owner_key text primary key,
  job_entries jsonb not null default '[]'::jsonb,
  updated_at timestamptz not null default now()
);

alter table public.ccd_hq_state enable row level security;

drop policy if exists "ccd_hq_state_read" on public.ccd_hq_state;
create policy "ccd_hq_state_read"
on public.ccd_hq_state
for select
to anon
using (true);

drop policy if exists "ccd_hq_state_write" on public.ccd_hq_state;
create policy "ccd_hq_state_write"
on public.ccd_hq_state
for insert
to anon
with check (true);

drop policy if exists "ccd_hq_state_update" on public.ccd_hq_state;
create policy "ccd_hq_state_update"
on public.ccd_hq_state
for update
to anon
using (true)
with check (true);
