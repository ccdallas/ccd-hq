const LOCAL_JOB_KEY = "ccd_hq_job_entries_v1";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const ownerKey = import.meta.env.VITE_CCD_OWNER_KEY || "chaunda";

function hasSupabaseConfig() {
  return Boolean(supabaseUrl && supabaseAnonKey);
}

function headers() {
  return {
    apikey: supabaseAnonKey,
    Authorization: `Bearer ${supabaseAnonKey}`,
    "Content-Type": "application/json",
    Prefer: "return=minimal",
  };
}

export function cloudStatusLabel() {
  return hasSupabaseConfig() ? "Supabase sync ready" : "Local device storage";
}

export function loadLocalJobEntries() {
  try {
    const raw = localStorage.getItem(LOCAL_JOB_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function saveLocalJobEntries(entries) {
  try {
    localStorage.setItem(LOCAL_JOB_KEY, JSON.stringify(entries));
  } catch {}
}

export async function loadJobEntries() {
  const local = loadLocalJobEntries();
  if (!hasSupabaseConfig()) return local;

  try {
    const url = `${supabaseUrl}/rest/v1/ccd_hq_state?owner_key=eq.${encodeURIComponent(ownerKey)}&select=job_entries&limit=1`;
    const res = await fetch(url, { headers: headers() });
    if (!res.ok) throw new Error(`Supabase load failed: ${res.status}`);
    const rows = await res.json();
    const entries = rows?.[0]?.job_entries || [];
    saveLocalJobEntries(entries);
    return entries;
  } catch (error) {
    console.warn(error);
    return local;
  }
}

export async function saveJobEntries(entries) {
  saveLocalJobEntries(entries);
  if (!hasSupabaseConfig()) return;

  try {
    await fetch(`${supabaseUrl}/rest/v1/ccd_hq_state?on_conflict=owner_key`, {
      method: "POST",
      headers: headers(),
      body: JSON.stringify({
        owner_key: ownerKey,
        job_entries: entries,
        updated_at: new Date().toISOString(),
      }),
    });
  } catch (error) {
    console.warn(error);
  }
}
