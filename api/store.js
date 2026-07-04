// /api/store.js — Vercel Function
// Cross-device sync for CCD HQ. Stores one JSON blob (the whole dashboard
// state) in Vercel Blob storage, gated by a shared-secret key so only you
// can read or write it.
//
// Requires two things set in Vercel → Project → Settings → Environment Variables:
//   1. BLOB_READ_WRITE_TOKEN  — auto-added when you enable Blob storage (Storage tab → Create Database → Blob)
//   2. CCD_HQ_SECRET          — a passphrase you choose yourself, e.g. a long random string

import { put, list } from '@vercel/blob';

const PATH = 'ccd-hq/state.json';

function checkAuth(request) {
  const url = new URL(request.url);
  const key = request.headers.get('x-ccd-key') || url.searchParams.get('key');
  return Boolean(key) && key === process.env.CCD_HQ_SECRET;
}

function json(body, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'content-type': 'application/json' },
  });
}

export async function GET(request) {
  if (!checkAuth(request)) return json({ error: 'unauthorized' }, 401);
  try {
    const { blobs } = await list({ prefix: PATH });
    const match = blobs.find((b) => b.pathname === PATH);
    if (!match) return json({ data: null });
    const res = await fetch(match.url);
    const data = await res.json();
    return json({ data });
  } catch (err) {
    return json({ error: String(err) }, 500);
  }
}

export async function POST(request) {
  if (!checkAuth(request)) return json({ error: 'unauthorized' }, 401);
  try {
    const body = await request.json();
    await put(PATH, JSON.stringify(body), {
      access: 'public',
      addRandomSuffix: false,
      allowOverwrite: true,
      contentType: 'application/json',
    });
    return json({ ok: true });
  } catch (err) {
    return json({ error: String(err) }, 500);
  }
}
