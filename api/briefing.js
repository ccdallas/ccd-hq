// /api/briefing.js — Vercel Function
// Proxies the AI Morning Briefing request to the Anthropic API server-side,
// so your real API key never has to sit in browser-visible code.
//
// Requires two things set in Vercel → Project → Settings → Environment Variables:
//   1. ANTHROPIC_API_KEY  — from console.anthropic.com (pay-per-use, separate from your Claude.ai subscription)
//   2. CCD_HQ_SECRET      — same passphrase used in api/store.js

function checkAuth(request) {
  const url = new URL(request.url);
  const key = request.headers.get('x-ccd-key') || url.searchParams.get('key');
  return Boolean(key) && key === process.env.CCD_HQ_SECRET;
}

export async function POST(request) {
  if (!checkAuth(request)) {
    return new Response(JSON.stringify({ error: 'unauthorized' }), { status: 401 });
  }
  try {
    const { prompt } = await request.json();
    const anthropicRes = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-sonnet-5',
        max_tokens: 800,
        messages: [{ role: 'user', content: prompt }],
      }),
    });
    const data = await anthropicRes.json();
    return new Response(JSON.stringify(data), {
      status: anthropicRes.status,
      headers: { 'content-type': 'application/json' },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: String(err) }), { status: 500 });
  }
}
